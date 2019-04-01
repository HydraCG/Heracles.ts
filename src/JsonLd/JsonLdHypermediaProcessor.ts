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
import { IHypermediaProcessor, Level } from "../IHypermediaProcessor";
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
    !!resource["@type"].find(type => type.indexOf(hydra.namespace) === 0 && dependentTypes.indexOf(type) === -1)
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

  public async process(response: Response, client: IHydraClient, linksPolicy: LinksPolicy): Promise<IWebResource> {
    const payload = await JsonLdHypermediaProcessor.ensureJsonLd(response);
    const result: any = payload;
    let flattenPayload = await jsonld.promises.flatten(payload, null, { base: response.url, embed: "@link" });
    flattenPayload = JsonLdHypermediaProcessor.flattenGraphs(flattenPayload);
    const context = await this.processHypermedia(
      new ProcessingState(flattenPayload, response.url, client, linksPolicy));
    const hypermedia = context.hypermedia;
    for (let index = hypermedia.length - 1; index >= 0; index--) {
      JsonLdHypermediaProcessor.tryRemoveReferenceFrom(hypermedia, index);
    }

    let rootResource = context.resourceMap[response.url];
    if (!rootResource) {
      hypermedia.push(
        (rootResource = {
          iri: response.url,
          links: new LinksCollection([]),
          operations: new OperationsCollection([]),
          type: new TypesCollection([])
        } as IHydraResource)
      );
    }

    const hypermediaContainer = new HypermediaContainer(
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
    const resource = graph[index];
    let keys = ["iri", "is"].concat(Object.keys(resource));
    keys = keys.filter((key, idx) => keys.indexOf(key) === idx);
    if (keys.length === 2) {
      graph.splice(index, 1);
      return true;
    }

    return false;
  }

  private static flattenGraphs(payload: object[]): object[] {
    if (!payload.find(item => item["@graph"])) {
      return payload;
    }

    return [].concat.apply(
      [],
      payload[0]["@graph"].map(item => (item["@id"] && item["@graph"] ? item["@graph"] : [item]))
    );
  }

  private async processHypermedia(context: ProcessingState): Promise<ProcessingState> {
    if (context.processedObject instanceof Array) {
      return await this.processArray(context);
    }

    await this.processResource(context);
    return context;
  }

  private async processArray(context: ProcessingState): Promise<ProcessingState> {
    for (const resource of context.processedObject as Iterable<object>) {
      await this.processHypermedia(context.copyFor(resource));
    }

    return context;
  }

  private async processResource(context: ProcessingState, isOwnedHypermedia = false): Promise<object> {
    const addToHypermedia =
      !isOwnedHypermedia && (!isBlank(context.processedObject) || isHydraIndependent(context.processedObject));
    const targetResource = context.createResource(addToHypermedia);
    for (const predicate of Object.keys(mappings)) {
      if (mappings[predicate].type) {
        let isValidPredicate = false;
        for (const type of mappings[predicate].type) {
          if (await this.indirectTypingProvider.isOfType(type, context)) {
            isValidPredicate = true;
            break;
          }
        }

        if (!isValidPredicate) {
          continue;
        }
      }

      await this.setupProperty(targetResource, context, predicate);
    }

    return targetResource;
  }

  private async gatherPropertyValues(context: ProcessingState, predicate: string): Promise<any[]> {
    if (!context.processedObject[predicate]) {
      return null;
    }

    const values = new Array<any>();
    for (const originalValue of context.processedObject[predicate]) {
      const value =
        literals.indexOf(typeof originalValue["@value"]) !== -1
          ? originalValue["@value"]
          : await this.processResource(context.copyFor(originalValue), predicate.indexOf(hydra.namespace) !== -1);
      if (value) {
        values.push(value);
      }
    }

    return values;
  }

  private async setupProperty(targetResource: object, context: ProcessingState, predicate: string): Promise<void> {
    const propertyDefinition = mappings[predicate];
    let value = await this.gatherPropertyValues(context, predicate);
    if (value === null) {
      if (propertyDefinition.required) {
        value = new Array<any>();
      } else {
        return;
      }
    }

    if (literals.indexOf(typeof propertyDefinition.default) !== -1) {
      targetResource[propertyDefinition.propertyName] = value[0] || propertyDefinition.default;
    } else if (typeof propertyDefinition.default === "function") {
      targetResource[propertyDefinition.propertyName] = propertyDefinition.default(value, context);
    }
  }
}
