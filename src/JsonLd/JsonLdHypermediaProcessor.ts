import * as jsonld from "jsonld";
import * as parseLinkHeader from "parse-link-header";
import LinksCollection from "../DataModel/Collections/LinksCollection";
import OperationsCollection from "../DataModel/Collections/OperationsCollection";
import TypesCollection from "../DataModel/Collections/TypesCollection";
import HypermediaContainer from "../DataModel/HypermediaContainer";
import { ICollection } from "../DataModel/ICollection";
import { IHydraResource } from "../DataModel/IHydraResource";
import { IWebResource } from "../DataModel/IWebResource";
import { IHydraClient } from "../IHydraClient";
import { IHypermediaProcessingOptions } from "../IHypermediaProcessingOptions";
import { IHypermediaProcessor } from "../IHypermediaProcessor";
import { Level } from "../Level";
import { LinksPolicy } from "../LinksPolicy";
import { hydra } from "../namespaces";
import IndirectTypingProvider from "./IndirectTypingProvider";
import { mappings } from "./mappings";
import ProcessingState from "./ProcessingState";

const jsonLdContext = "http://www.w3.org/ns/json-ld#context";
type HeaderMatcher = (headers: Headers) => boolean;

const literals = ["string", "number", "boolean"];

const dependentTypes = [hydra.IriTemplateMapping, hydra.PartialCollectionView];

function isBlank(resource: object): boolean {
  return !resource["@id"] || resource["@id"].match(/^_:/);
}

function isHydraIndependent(resource: object): boolean {
  return (
    !!resource["@type"] &&
    !!resource["@type"].find(_ => _.indexOf(hydra.namespace) === 0 && dependentTypes.indexOf(_) === -1)
  );
}

/**
 * Provides a JSON-LD based implementation of the {@link IHypermediaProcessor} interface.
 * @class
 */
export default class JsonLdHypermediaProcessor implements IHypermediaProcessor {
  private static json = "application/json";
  private static jsonLd = "application/ld+json";
  private static mediaTypes = [JsonLdHypermediaProcessor.jsonLd, JsonLdHypermediaProcessor.json];

  private static exactMatchCases: HeaderMatcher[][] = [
    [(headers: Headers) => headers.get("Content-Type").indexOf(JsonLdHypermediaProcessor.jsonLd) !== -1],
    [
      (headers: Headers) => headers.get("Content-Type").indexOf(JsonLdHypermediaProcessor.json) !== -1,
      (headers: Headers) => {
        const links = parseLinkHeader(headers.get("Link"));
        return !!links[jsonLdContext] && links[jsonLdContext].type === JsonLdHypermediaProcessor.jsonLd;
      }
    ]
  ];

  private readonly indirectTypingProvider: IndirectTypingProvider;

  /**
   * Initializes a new instance of the {@link JsonLdHypermediaProcessor} class.
   * @param {IndirectTypingProvider} indirectTypingProvider Facility providing information whether given resources are
   *                                                        of given type.
   */
  public constructor(indirectTypingProvider: IndirectTypingProvider) {
    this.indirectTypingProvider = indirectTypingProvider;
  }

  public get supportedMediaTypes(): Iterable<string> {
    return JsonLdHypermediaProcessor.mediaTypes;
  }

  public supports(response: Response): Level {
    let result = Level.None;
    for (const approach of JsonLdHypermediaProcessor.exactMatchCases) {
      const currentMatch = approach.reduce(
        (previous: boolean, current: HeaderMatcher) => previous && current(response.headers),
        true
      );
      if (currentMatch) {
        result = Level.FullSupport;
        break;
      }
    }

    return result;
  }

  public async process(
    response: Response,
    client: IHydraClient,
    options: IHypermediaProcessingOptions
  ): Promise<IWebResource> {
    options = { ...{ linksPolicy: LinksPolicy.Strict, originalUrl: response.url }, ...options };
    const result = await JsonLdHypermediaProcessor.ensureJsonLd(response);
    let flattenPayload = await jsonld.promises.flatten(result, null, { base: response.url, embed: "@link" });
    flattenPayload = JsonLdHypermediaProcessor.flattenGraphs(flattenPayload);
    const context = await this.processHypermedia(
      new ProcessingState(flattenPayload, response.url, client, options.linksPolicy)
    );
    const hypermedia = context.hypermedia;
    for (let index = hypermedia.length - 1; index >= 0; index--) {
      JsonLdHypermediaProcessor.tryRemoveReferenceFrom(hypermedia, index);
    }

    let rootResource = context.getVisitedResource(options.originalUrl);
    if (!rootResource) {
      hypermedia.push(
        (rootResource = {
          iri: options.originalUrl,
          links: new LinksCollection([]),
          operations: new OperationsCollection([]),
          type: new TypesCollection([])
        } as IHydraResource)
      );
    }

    const hypermediaContainer = new HypermediaContainer(
      response.headers,
      rootResource.iri,
      hypermedia,
      (rootResource as IHydraResource).operations,
      (rootResource as IHydraResource).links,
      (rootResource as ICollection).members ? (rootResource as ICollection) : null
    );
    Object.defineProperty(result, "hypermedia", {
      enumerable: false,
      value: hypermediaContainer
    });
    return result;
  }

  private static async ensureJsonLd(response: Response): Promise<any> {
    const result = await response.json();
    if (response.headers.get("Content-Type") === JsonLdHypermediaProcessor.json) {
      const links = parseLinkHeader(response.headers.get("Link"));
      const link = jsonld.prependBase(response.url, links[jsonLdContext].url);
      const contextResponse = await fetch(link, { headers: { Accept: links[jsonLdContext].type } });
      result["@context"] = contextResponse["@context"];
    }

    return result;
  }

  private static tryRemoveReferenceFrom(graph: object[], index: number): boolean {
    const keys = Object.keys(graph[index]);
    if (keys.length === 2 && keys.indexOf("iri") !== -1 && keys.indexOf("type") !== -1) {
      graph.splice(index, 1);
      return true;
    }

    return false;
  }

  private static flattenGraphs(payload: object[]): object[] {
    if (!payload.find(_ => _["@graph"])) {
      return payload;
    }

    return [].concat.apply(
      [],
      payload[0]["@graph"].map(item => (item["@id"] && item["@graph"] ? item["@graph"] : [item]))
    );
  }

  private async processHypermedia(processingState: ProcessingState): Promise<ProcessingState> {
    if (processingState.processedObject instanceof Array) {
      return await this.processArray(processingState);
    }

    await this.processResource(processingState);
    return processingState;
  }

  private async processArray(processingState: ProcessingState): Promise<ProcessingState> {
    for (const resource of processingState.processedObject as Iterable<object>) {
      if (!processingState.getVisitedResource(resource["@id"])) {
        await this.processHypermedia(processingState.copyFor(resource));
      }
    }

    return processingState;
  }

  private async isValidPredicate(processingState: ProcessingState, predicate: string): Promise<boolean> {
    let result = true;
    if (mappings[predicate].type) {
      result = false;
      for (const type of mappings[predicate].type) {
        if (await this.indirectTypingProvider.isOfType(type, processingState)) {
          result = true;
          break;
        }
      }
    }

    return result;
  }

  private async processResource(processingState: ProcessingState, isOwnedHypermedia = false): Promise<object> {
    const addToHypermedia =
      !isOwnedHypermedia &&
      (!isBlank(processingState.processedObject) || isHydraIndependent(processingState.processedObject));
    const result = processingState.provideResource(addToHypermedia);
    for (const predicate of Object.keys(mappings)) {
      if (await this.isValidPredicate(processingState, predicate)) {
        await this.setupProperty(result, processingState, predicate);
      }
    }

    return result;
  }

  private async gatherPropertyValues(processingState: ProcessingState, predicate: string): Promise<any[]> {
    if (!processingState.processedObject[predicate]) {
      return null;
    }

    const values = new Array<any>();
    for (const originalValue of processingState.processedObject[predicate]) {
      let value: any = null;
      if (literals.indexOf(typeof originalValue["@value"]) !== -1) {
        value = originalValue["@value"];
      } else {
        const isHydraPredicate = predicate.indexOf(hydra.namespace) !== -1;
        value = processingState.getVisitedResource(originalValue["@id"]);
        if (!value) {
          value = await this.processResource(processingState.copyFor(originalValue), isHydraPredicate);
        } else if (isHydraPredicate) {
          processingState.markAsOwned(value.iri);
        }
      }

      if (!!value) {
        values.push(value);
      }
    }

    return values;
  }

  private async setupProperty(resource: object, processingState: ProcessingState, predicate: string): Promise<void> {
    const propertyDefinition = mappings[predicate];
    let value = await this.gatherPropertyValues(processingState, predicate);
    if (value === null) {
      if (propertyDefinition.required) {
        value = new Array<any>();
      } else {
        return;
      }
    }

    if (literals.indexOf(typeof propertyDefinition.default) !== -1) {
      resource[propertyDefinition.propertyName] = value[0] || propertyDefinition.default;
    } else if (typeof propertyDefinition.default === "function") {
      resource[propertyDefinition.propertyName] = propertyDefinition.default(value, processingState);
    }
  }
}
