import * as jsonld from "jsonld";
import * as parseLinkHeader from "parse-link-header";
import { ApiDocumentationPolicy } from "../ApiDocumentationPolicy";
import LinksCollection from "../DataModel/Collections/LinksCollection";
import OperationsCollection from "../DataModel/Collections/OperationsCollection";
import TypesCollection from "../DataModel/Collections/TypesCollection";
import HypermediaContainer from "../DataModel/HypermediaContainer";
import { IHydraResource } from "../DataModel/IHydraResource";
import { IHypermediaContainer } from "../DataModel/IHypermediaContainer";
import { HttpCallFacility } from "../HydraClientFactory";
import { IHydraClient } from "../IHydraClient";
import { IHypermediaProcessingOptions } from "../IHypermediaProcessingOptions";
import { IHypermediaProcessor } from "../IHypermediaProcessor";
import { Level } from "../Level";
import { LinksPolicy } from "../LinksPolicy";
import { hydra } from "../namespaces";
import { IGraphTransformer } from "./GraphTransformations/IGraphTransformer";
import { IIndirectTypingProvider } from "./IIndirectTypingProvider";
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

  private readonly indirectTypingProvider: IIndirectTypingProvider;
  private readonly httpCall: HttpCallFacility;
  private readonly graphTransformer: IGraphTransformer;

  /**
   * Initializes a new instance of the {@link JsonLdHypermediaProcessor} class.
   * @param {IndirectTypingProvider} indirectTypingProvider Facility providing information whether given resources are
   *                                                        of given type.
   * @param {HttpCallFacility} httpCall HTTP facility used to call remote server.
   * @param {IGraphTransformer} graphTransformer Graph transformation facility.
   */
  public constructor(
    indirectTypingProvider: IIndirectTypingProvider,
    httpCall: HttpCallFacility,
    graphTransformer: IGraphTransformer
  ) {
    this.indirectTypingProvider = indirectTypingProvider;
    this.httpCall = httpCall;
    this.graphTransformer = graphTransformer;
  }

  /** @inheritDoc */
  public get supportedMediaTypes(): Iterable<string> {
    return JsonLdHypermediaProcessor.mediaTypes;
  }

  /** @inheritDoc */
  public supports(response: Response): Level {
    let result = Level.None;
    if (!!response) {
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
    }

    return result;
  }

  /** @inheritDoc */
  public async process(
    response: Response,
    client: IHydraClient,
    options?: IHypermediaProcessingOptions
  ): Promise<IHypermediaContainer> {
    options = {
      ...{
        apiDocumentationPolicy: ApiDocumentationPolicy.None,
        apiDocumentations: [],
        linksPolicy: LinksPolicy.Strict,
        originalUrl: response.url
      },
      ...(options || {})
    };
    const result = await this.ensureJsonLd(response);
    let flattenPayload = await jsonld.promises.flatten(result, null, { base: response.url, embed: "@link" });
    flattenPayload = this.graphTransformer.transform(flattenPayload, this, options);
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
          links: LinksCollection.empty,
          operations: OperationsCollection.empty,
          type: TypesCollection.empty
        } as IHydraResource)
      );
    }

    const hypermediaContainer = new HypermediaContainer(response, rootResource, hypermedia);
    (hypermediaContainer as any).json = () => result;
    return hypermediaContainer;
  }

  private static tryRemoveReferenceFrom(graph: object[], index: number): boolean {
    const keys = Object.keys(graph[index]);
    if (keys.length === 2 && keys.indexOf("iri") !== -1 && keys.indexOf("type") !== -1) {
      graph.splice(index, 1);
      return true;
    }

    return false;
  }

  private async ensureJsonLd(response: Response): Promise<any> {
    const result = await response.json();
    if (response.headers.get("Content-Type") === JsonLdHypermediaProcessor.json) {
      const links = parseLinkHeader(response.headers.get("Link"));
      const link = jsonld.url.prependBase(response.url, links[jsonLdContext].url);
      const contextResponse = await this.httpCall(link, { headers: { Accept: links[jsonLdContext].type } });
      result["@context"] = contextResponse["@context"];
    }

    return result;
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

    processingState.onMaterialized(result);
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
