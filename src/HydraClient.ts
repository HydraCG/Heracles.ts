import "isomorphic-fetch";
import * as jsonld from "jsonld";
import * as parseLinkHeader from "parse-link-header";
import FilterableCollection from "./DataModel/Collections/FilterableCollection";
import { IApiDocumentation } from "./DataModel/IApiDocumentation";
import { ILink } from "./DataModel/ILink";
import { IOperation } from "./DataModel/IOperation";
import { IResource } from "./DataModel/IResource";
import { IWebResource } from "./DataModel/IWebResource";
import { HttpCallFacility } from "./HydraClientFactory";
import { IHydraClient } from "./IHydraClient";
import { IHypermediaProcessor } from "./IHypermediaProcessor";
import { IIriTemplateExpansionStrategy } from "./IIriTemplateExpansionStrategy";
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

  private readonly hypermediaProcessors: IHypermediaProcessor[];
  private readonly iriTemplateExpansionStrategy: IIriTemplateExpansionStrategy;
  private readonly linksPolicy: LinksPolicy;
  private readonly httpCall: (url: string, options?: RequestInit) => Promise<Response>;

  /**
   * Initializes a new instance of the {@link HydraClient} class.
   * @param {Iterable<IHypermediaProcessor>} hypermediaProcessors Hypermedia processors used for response hypermedia
   *                                                              controls extraction.
   * @param {IIriTemplateExpansionStrategy} iriTemplateExpansionStrategy IRI template variable expansion strategy.
   * @param {LinksPolicy} linksPolicy Policy defining what is a considered a link.
   * @param {HttpCallFacility} httpCall HTTP facility used to call remote server.
   */
  public constructor(
    hypermediaProcessors: Iterable<IHypermediaProcessor>,
    iriTemplateExpansionStrategy: IIriTemplateExpansionStrategy,
    linksPolicy: LinksPolicy = LinksPolicy.Strict,
    httpCall: HttpCallFacility
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

    this.hypermediaProcessors = Array.from(hypermediaProcessors);
    this.iriTemplateExpansionStrategy = iriTemplateExpansionStrategy;
    this.linksPolicy = linksPolicy;
    this.httpCall = httpCall;
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
    const apiDocumentation = await this.getApiDocumentationUrl(url);
    const options = { auxiliaryResponse: apiDocumentation.response, auxiliaryOriginalUrl: url };
    const resource = await this.getResourceFrom(apiDocumentation.url, options);
    const result = resource.hypermedia.ofType(hydra.ApiDocumentation).first() as IApiDocumentation;
    if (!result) {
      throw new Error(HydraClient.noEntryPointDefined);
    }

    return result;
  }

  /** @inheritDoc */
  public async getResource(urlOrResource: string | IResource | ILink): Promise<IWebResource> {
    return await this.getResourceFrom(HydraClient.getUrl(urlOrResource), {});
  }

  /** @inheritDoc */
  public async invoke(operation: IOperation, body?: IWebResource, parameters?: object): Promise<Response> {
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

  private async getResourceFrom(url: string, options: any): Promise<IWebResource> {
    const response = await this.makeRequestTo(url);
    if (response.status !== 200) {
      throw new Error(HydraClient.invalidResponse + response.status);
    }

    const hypermediaProcessor = this.getHypermediaProcessor(response);
    if (!hypermediaProcessor) {
      throw new Error(HydraClient.responseFormatNotSupported);
    }

    options = { ...{ linksPolicy: this.linksPolicy, originalUrl: url }, ...options };
    return await hypermediaProcessor.process(response, this, options);
  }

  private async getApiDocumentationUrl(url: string): Promise<{ url: string; response: any }> {
    const response = await this.makeRequestTo(url);
    if (response.status !== 200) {
      throw new Error(HydraClient.invalidResponse + response.status);
    }

    const links = parseLinkHeader(response.headers.get("Link"));
    const result = !!links ? links[hydra.apiDocumentation] : null;
    if (!result) {
      throw new Error(HydraClient.apiDocumentationNotProvided);
    }

    return {
      response,
      url: jsonld.url.prependBase(url.match(/^[a-z][a-z0-9+\-.]*:\/\/[^/]+/)[0], result.url)
    };
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
}
