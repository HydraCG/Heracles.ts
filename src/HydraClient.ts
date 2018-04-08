import "isomorphic-fetch";
import * as jsonld from "jsonld";
import ApiDocumentation from "./DataModel/ApiDocumentation";
import { IApiDocumentation } from "./DataModel/IApiDocumentation";
import { ILink } from "./DataModel/ILink";
import { IOperation } from "./DataModel/IOperation";
import { IResource } from "./DataModel/IResource";
import { IWebResource } from "./DataModel/IWebResource";
import { IHydraClient } from "./IHydraClient";
import { IHypermediaProcessor } from "./IHypermediaProcessor";
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
  public static noHypermediaProcessor = "No hypermedia processor instance was provided for registration.";
  public static invalidResponse = "Remote server responded with a status of ";
  public static responseFormatNotSupported = "Response format is not supported.";

  // TODO: These shouldn't be public but the tests access them directly
  public static hypermediaProcessors = new Array<IHypermediaProcessor>();

  /**
   * Registers a hypermedia processor.
   *
   * @param hypermediaProcessor Hypermedia processor to be registered.
   */
  public static registerHypermediaProcessor(hypermediaProcessor: IHypermediaProcessor) {
    if (!hypermediaProcessor) {
      throw new Error(HydraClient.noHypermediaProcessor);
    }

    HydraClient.hypermediaProcessors.push(hypermediaProcessor);
  }

  /**
   * Gets a hypermedia provider suitable for a given response.
   *
   * @param response Raw response to find hypermedia processor for.
   */
  public getHypermediaProcessor(response: Response): IHypermediaProcessor {
    for (const hypermediaProcessor of HydraClient.hypermediaProcessors) {
      for (const supportedMediaType of hypermediaProcessor.supportedMediaTypes) {
        if (response.headers.get("Content-Type").indexOf(supportedMediaType) === 0) {
          return hypermediaProcessor;
        }
      }
    }

    return null;
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

    const result = await hypermediaProcessor.process(response, this);
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
   * @returns Response of the operation.
   */
  public async invoke(operation: IOperation, body?: IWebResource): Promise<Response> {
    if (!operation) {
      throw new Error(HydraClient.noOperationProvided);
    }

    return await fetch(operation.target.iri, {
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/ld+json" },
      method: operation.method
    });
  }

  private async getApiDocumentationUrl(url: string): Promise<string> {
    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error(HydraClient.invalidResponse + response.status);
    }

    const link = response.headers.get("Link");
    if (!link) {
      throw new Error(HydraClient.apiDocumentationNotProvided);
    }

    const result = link.match(`<([^>]+)>; rel="${hydra.apiDocumentation}"`);
    if (!result) {
      throw new Error(HydraClient.apiDocumentationNotProvided);
    }

    return !result[1].match(/^[a-z][a-z0-9+\-.]*:/)
      ? jsonld.prependBase(url.match(/^[a-z][a-z0-9+\-.]*:\/\/[^/]+/)[0], result[1])
      : result[1];
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
