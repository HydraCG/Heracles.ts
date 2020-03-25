import "isomorphic-fetch";
import * as jsonld from "jsonld";
import * as parseLinkHeader from "parse-link-header";
import { ApiDocumentationPolicy } from "./ApiDocumentationPolicy";
import FilterableCollection from "./DataModel/Collections/FilterableCollection";
import { IApiDocumentation } from "./DataModel/IApiDocumentation";
import { IHypermediaContainer } from "./DataModel/IHypermediaContainer";
import { ILink } from "./DataModel/ILink";
import { IOperation } from "./DataModel/IOperation";
import { IResource } from "./DataModel/IResource";
import { HttpCallFacility } from "./HydraClientFactory";
import { IHydraClient } from "./IHydraClient";
import { IHypermediaProcessor } from "./IHypermediaProcessor";
import { IIriTemplateExpansionStrategy } from "./IIriTemplateExpansionStrategy";
import { IResourceCache } from "./IResourceCache";
import { LinksPolicy } from "./LinksPolicy";
import { hydra } from "./namespaces";

/**
 * HydraClient, also known as Heracles.ts, is a generic client for Hydra-powered Web APIs.
 *
 * To learn more about Hydra please refer to {@link https://www.hydra-cg.com/spec/latest/core/}
 */
export default class HydraClient implements IHydraClient {
  public static noOperationProvided = "There was no operation provided.";
  public static noUrlProvided = "There was no Url provided.";
  public static apiDocumentationNotProvided = "API documentation not provided.";
  public static noEntryPointDefined = "API documentation has no entry point defined.";
  public static noHypermediaProcessors = "No valid hypermedia processor instances were provided.";
  public static invalidResponse = "Remote server responded with a status of ";
  public static responseFormatNotSupported = "Response format is not supported.";
  public static noIriTemplateExpansionStrategy = "No IRI template expansion strategy was provided.";
  public static noHttpFacility = "No HTTP facility provided.";
  public static noResourceCache = "No resource cache provided.";

  private readonly hypermediaProcessors: IHypermediaProcessor[];
  private readonly iriTemplateExpansionStrategy: IIriTemplateExpansionStrategy;
  private readonly linksPolicy: LinksPolicy;
  private readonly apiDocumentationPolicy: ApiDocumentationPolicy;
  private readonly httpCall: (url: string, options?: RequestInit) => Promise<Response>;
  private readonly resourceCache: IResourceCache;

  /**
   * Initializes a new instance of the {@link HydraClient} class.
   * @param {Iterable<IHypermediaProcessor>} hypermediaProcessors Hypermedia processors used for response hypermedia
   *                                                              controls extraction.
   * @param {IIriTemplateExpansionStrategy} iriTemplateExpansionStrategy IRI template variable expansion strategy.
   * @param {LinksPolicy} linksPolicy Policy defining what is a considered a link.
   * @param {ApiDocumentationPolicy} apiDocumentationPolicy Policy defining on how to treat API documentation.
   * @param {HttpCallFacility} httpCall HTTP facility used to call remote server.
   * @param {IResourceCache} resourceCache Cache used for storing API documentation fetched.
   */
  public constructor(
    hypermediaProcessors: Iterable<IHypermediaProcessor>,
    iriTemplateExpansionStrategy: IIriTemplateExpansionStrategy,
    linksPolicy: LinksPolicy = LinksPolicy.Strict,
    apiDocumentationPolicy: ApiDocumentationPolicy = ApiDocumentationPolicy.None,
    httpCall: HttpCallFacility,
    resourceCache: IResourceCache
  ) {
    if (!FilterableCollection.prototype.any.call(hypermediaProcessors)) {
      throw new Error(HydraClient.noHypermediaProcessors);
    }

    if (!iriTemplateExpansionStrategy) {
      throw new Error(HydraClient.noIriTemplateExpansionStrategy);
    }

    if (!httpCall) {
      throw new Error(HydraClient.noHttpFacility);
    }

    if (!resourceCache) {
      throw new Error(HydraClient.noResourceCache);
    }

    this.hypermediaProcessors = Array.from(hypermediaProcessors);
    this.iriTemplateExpansionStrategy = iriTemplateExpansionStrategy;
    this.linksPolicy = linksPolicy;
    this.apiDocumentationPolicy = apiDocumentationPolicy;
    this.httpCall = httpCall;
    this.resourceCache = resourceCache;
  }

  /** @inheritDoc */
  public getHypermediaProcessor(response: Response): IHypermediaProcessor {
    return (
      this.hypermediaProcessors
        .map(item => ({
          hypermediaProcessor: item,
          supportLevel: item.supports(response) as number
        }))
        .filter(item => item.supportLevel > 0)
        .sort((left, right) => right.supportLevel - left.supportLevel)
        .map(item => item.hypermediaProcessor)[0] || null
    );
  }

  /** @inheritDoc */
  public async getApiDocumentation(urlOrResource: string | IResource): Promise<IApiDocumentation> {
    const url = HydraClient.getUrl(urlOrResource);
    const response = await this.makeRequestTo(url);
    if (response.status !== 200) {
      throw new Error(HydraClient.invalidResponse + response.status);
    }

    return this.getApiDocumentationResource(response, url, true);
  }

  /** @inheritDoc */
  public async getResource(urlOrResource: string | IResource | ILink): Promise<IHypermediaContainer> {
    return await this.getResourceFrom(HydraClient.getUrl(urlOrResource), {});
  }

  /** @inheritDoc */
  public async invoke(operation: IOperation, body?: IResource, parameters?: object): Promise<Response> {
    if (!operation) {
      throw new Error(HydraClient.noOperationProvided);
    }

    const targetOperation = this.iriTemplateExpansionStrategy.createRequest(operation, body, parameters);
    // TODO: move Content-Type header to some specialized component.
    // TODO: move body serialization to some specialized component.
    return await this.makeRequestTo(targetOperation.target.iri, {
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/ld+json" },
      method: targetOperation.method
    });
  }

  private async getResourceFrom(url: string, options: any): Promise<IHypermediaContainer> {
    const response = await this.makeRequestTo(url);
    if (response.status !== 200) {
      throw new Error(HydraClient.invalidResponse + response.status);
    }

    if (this.apiDocumentationPolicy !== ApiDocumentationPolicy.None) {
      await this.getApiDocumentationResource(response, url, false);
    }

    const hypermediaProcessor = this.getHypermediaProcessor(response);
    if (!hypermediaProcessor) {
      throw new Error(HydraClient.responseFormatNotSupported);
    }

    options = {
      ...{
        apiDocumentationPolicy: ApiDocumentationPolicy.None,
        apiDocumentations: this.resourceCache.all(_ => !!(_ as IApiDocumentation).getEntryPoint),
        linksPolicy: this.linksPolicy,
        originalUrl: url
      },
      ...options
    };
    return await hypermediaProcessor.process(response, this, options);
  }

  private async getApiDocumentationResource(
    response: Response,
    baseUrl: string,
    throwIfUnavailable: boolean
  ): Promise<IApiDocumentation> {
    const apiDocumentationUrl = this.getApiDocumentationUrl(response, baseUrl);
    if (apiDocumentationUrl == null) {
      return this.assert<IApiDocumentation>(null, throwIfUnavailable ? HydraClient.apiDocumentationNotProvided : null);
    }

    let result = this.resourceCache.getItem(apiDocumentationUrl) as IApiDocumentation;
    if (!result) {
      const options = { auxiliaryResponse: response, auxiliaryOriginalUrl: baseUrl };
      const resource = await this.getResourceFrom(apiDocumentationUrl, options);
      result = resource.ofType(hydra.ApiDocumentation).first() as IApiDocumentation;
      if (!result) {
        return this.assert<IApiDocumentation>(null, throwIfUnavailable ? HydraClient.noEntryPointDefined : null);
      }

      this.resourceCache.setItem(apiDocumentationUrl, result);
    }

    return result;
  }

  private getApiDocumentationUrl(response: Response, baseUrl: string): string {
    const links = parseLinkHeader(response.headers.get("Link"));
    const link = !!links ? links[hydra.apiDocumentation] : null;
    let result: string = null;
    if (!!link) {
      result = jsonld.url.prependBase(baseUrl.match(/^[a-z][a-z0-9+\-.]*:\/\/[^/]+/)[0], link.url);
    }

    return result;
  }

  private static getUrl(urlOrResource: string | IResource | ILink): string {
    let url: any = urlOrResource;
    if (typeof url === "object") {
      url = !!url.target ? url.target.iri : url.iri;
    }

    if (!!!url) {
      throw new Error(HydraClient.noUrlProvided);
    }

    return url;
  }

  private async makeRequestTo(url: string, options?: RequestInit): Promise<Response> {
    return await this.httpCall(url, options);
  }

  private assert<TResource>(resource: TResource, errorMessage: string): TResource {
    if (resource === null && !!errorMessage) {
      throw new Error(errorMessage);
    }

    return resource;
  }
}
