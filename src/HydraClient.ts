import "isomorphic-fetch";
import * as jsonld from "jsonld";
import * as parseLinkHeader from "parse-link-header";
import FilterableCollection from "./DataModel/Collections/FilterableCollection";
import { IApiDocumentation } from "./DataModel/IApiDocumentation";
import { ILink } from "./DataModel/ILink";
import { IOperation } from "./DataModel/IOperation";
import { IResource } from "./DataModel/IResource";
import { IWebResource } from "./DataModel/IWebResource";
import { IHydraClient } from "./IHydraClient";
import { IHypermediaProcessor } from "./IHypermediaProcessor";
import { IIriTemplateExpansionStrategy } from "./IIiriTemplateExpansionStrategy";
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

  private readonly hypermediaProcessors: IHypermediaProcessor[];
  private readonly iriTemplateExpansionStrategy: IIriTemplateExpansionStrategy;
  private readonly linksPolicy: LinksPolicy;

  /**
   * Initializes a new instance of the {@link HydraClient} class.
   * @param {Iterable<IHypermediaProcessor>} hypermediaProcessors Hypermedia processors used for response hypermedia
   *                                                              controls extraction.
   * @param {IIriTemplateExpansionStrategy} iriTemplateExpansionStrategy IRI template variable expansion strategy.
   * @param {LinksPolicy} linksPolicy Policy defining what is a considered a link.
   */
  public constructor(
    hypermediaProcessors: Iterable<IHypermediaProcessor>,
    iriTemplateExpansionStrategy: IIriTemplateExpansionStrategy,
    linksPolicy: LinksPolicy = LinksPolicy.Strict
  ) {
    if (!FilterableCollection.prototype.any.call(hypermediaProcessors)) {
      throw new Error(HydraClient.noHypermediaProcessors);
    }

    if (!iriTemplateExpansionStrategy) {
      throw new Error(HydraClient.noIriTemplateExpansionStrategy);
    }

    this.hypermediaProcessors = Array.from(hypermediaProcessors);
    this.iriTemplateExpansionStrategy = iriTemplateExpansionStrategy;
    this.linksPolicy = linksPolicy;
  }

  /**
   * Gets a hypermedia provider suitable for a given response.
   *
   * @param response Raw response to find hypermedia processor for.
   */
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

  /**
   * Obtains an API documentation.
   *
   * @param urlOrResource URL or object with an iri property from which to obtain an API
   *                      documentation.
   * @returns {ApiDocumentation}
   */
  public async getApiDocumentation(urlOrResource: string | IResource): Promise<IApiDocumentation> {
    const url = HydraClient.getUrl(urlOrResource);
    const apiDocumentationUrl = await this.getApiDocumentationUrl(url);
    const resource = await this.getResource(apiDocumentationUrl);
    const apiDocumentation = resource.hypermedia.ofType(hydra.ApiDocumentation).first() as IApiDocumentation;
    if (!apiDocumentation) {
      throw new Error(HydraClient.noEntryPointDefined);
    }

    return apiDocumentation;
  }

  /**
   * Obtains a representation of a resource.
   *
   * @param urlOrResource {string | IResource | ILink } Either URL, {@link IResource} pr {@link ILink}
   *                                            carrying an IRI of the resource to be obtained.
   */
  public async getResource(urlOrResource: string | IResource | ILink): Promise<IWebResource> {
    const url = HydraClient.getUrl(urlOrResource);
    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error(HydraClient.invalidResponse + response.status);
    }

    const hypermediaProcessor = this.getHypermediaProcessor(response);
    if (!hypermediaProcessor) {
      throw new Error(HydraClient.responseFormatNotSupported);
    }

    const result = await hypermediaProcessor.process(response, this, this.linksPolicy);
    Object.defineProperty(result, "iri", {
      value: response.url
    });
    return result;
  }

  /**
   * Invokes a given operation.
   *
   * @param operation Operation descriptor to be invoked.
   * @param body Optional resource to be used as a body of the operation.
   * @param parameters Optional auxiliary parameters.
   * @returns Response of the operation.
   */
  public async invoke(operation: IOperation, body?: IWebResource, parameters?: object): Promise<Response> {
    if (!operation) {
      throw new Error(HydraClient.noOperationProvided);
    }

    const targetOperation = this.iriTemplateExpansionStrategy.createRequest(operation, body, parameters);
    // TODO: move Content-Type header to some specialized component.
    // TODO: move body serialization to some specialized component.
    return await fetch(targetOperation.target.iri, {
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/ld+json" },
      method: targetOperation.method
    });
  }

  private async getApiDocumentationUrl(url: string): Promise<string> {
    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error(HydraClient.invalidResponse + response.status);
    }

    const links = parseLinkHeader(response.headers.get("Link"));
    const result = !!links ? links[hydra.apiDocumentation] : null;
    if (!result) {
      throw new Error(HydraClient.apiDocumentationNotProvided);
    }

    return jsonld.prependBase(url.match(/^[a-z][a-z0-9+\-.]*:\/\/[^/]+/)[0], result.url);
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
}
