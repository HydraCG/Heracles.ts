import "isomorphic-fetch";
import * as jsonld from "jsonld";
import ApiDocumentation from "./ApiDocumentation";
import { IApiDocumentation } from "./DataModel/IApiDocumentation";
import { IHypermediaProcessor } from "./DataModel/IHypermediaProcessor";
import { IResource } from "./DataModel/IResource";
import { IWebResource } from "./DataModel/IWebResource";
import { IOperation } from "./DataModel/IOperation";
import { hydra } from "./namespaces";
import ResourceEnrichmentProvider from "./ResourceEnrichmentProvider";

/**
 * HydraClient, also known as Heracles.ts, is a generic client for Hydra-powered Web APIs.
 *
 * To learn more about Hydra please refer to {@link https://www.hydra-cg.com/spec/latest/core/}
 */
export default class HydraClient {
  public static invalidArgument = "Argument passed is invalid.";
  public static operationNotSupported = "The operation specified is not supported.";
  public static noOperationProvided = "There was no operation provided.";
  public static noResourceProvided = "There was no resource provided.";
  public static noUrlProvided = "There was no Url provided.";
  public static apiDocumentationNotProvided = "API documentation not provided.";
  public static noEntryPointDefined = "API documentation has no entry point defined.";
  public static noHypermediaProcessor = "No hypermedia processor instance was provided for registration.";
  public static invalidResponse = "Remote server responded with a status of ";
  public static responseFormatNotSupported = "Response format is not supported.";

  // TODO: These shouldn't be public but the tests access them directly
  public static hypermediaProcessors = new Array<IHypermediaProcessor>();
  public static resourceEnrichmentProvider: {
    enrichHypermedia(client: HydraClient, resource: IWebResource): IWebResource;
  } = new ResourceEnrichmentProvider();
  public removeHypermediaFromPayload;

  private lastHypermediaProcessor: IHypermediaProcessor;

  /**
   * Initializes a new instance of the {@link HydraClient} class.
   *
   * @param removeHypermediaFromPayload Value indicating whether to remove hypermedia controls from the
   *                                    resource's payload or leave it as is. Default is true.
   */
  public constructor(removeHypermediaFromPayload = false) {
    this.removeHypermediaFromPayload = removeHypermediaFromPayload;
  }

  /**
   * Registers a custom resource enrichment provider.
   *
   * @param client Hydra client that can be used for further operation invocations.
   * @param resourceEnrichmentProvider Component to be registered.
   */
  public static registerResourceEnrichmentProvider(resourceEnrichmentProvider: {
    enrichHypermedia(client: HydraClient, resource: IWebResource): IWebResource;
  }) {
    if (resourceEnrichmentProvider) {
      HydraClient.resourceEnrichmentProvider = resourceEnrichmentProvider;
    }
  }

  /**
   * Registers a hypermedia processor.
   *
   * @param hypermediaProcessor Hypermedia processor to be registered.
   */
  public static registerHypermediaProcessor(
    hypermediaProcessor: IHypermediaProcessor
  ) {
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
    return (this.lastHypermediaProcessor = HydraClient.hypermediaProcessors.find(
      provider =>
        !!provider.supportedMediaTypes.find(
          mediaType =>
            response.headers.get("Content-Type").indexOf(mediaType) === 0
        )
    ));
  }

  /**
   * Obtains an API documentation.
   *
   * @param urlOrResource URL or object with an iri property from which to obtain an API
   *                      documentation.
   */
  public async getApiDocumentation(
    urlOrResource: string | IResource
  ): Promise<IApiDocumentation> {
    const url = HydraClient.getUrl(urlOrResource);
    const apiDocumentationUrl = await this.getApiDocumentationUrl(url);
    const resource = await this.getResource(apiDocumentationUrl);
    const apiDocumentation = resource.hypermedia.find(
      hypermediaControl => (hypermediaControl as any).entryPoint
    ) as IApiDocumentation;
    if (!apiDocumentation) {
      throw new Error(HydraClient.noEntryPointDefined);
    }

    apiDocumentation.client = this;
    return Promise.resolve(
      Object.create(
        ApiDocumentation.prototype,
        HydraClient.convertToPropertyDescriptorMap(apiDocumentation)
      )
    );
  }

  /**
   * Obtains a representation of a resource.
   *
   * @param urlOrResource URL or a {@link IResource} carrying an IRI of the resource to be obtained.
   */
  public async getResource(
    urlOrResource: string | IResource
  ): Promise<IWebResource> {
    const url = HydraClient.getUrl(urlOrResource);
    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error(HydraClient.invalidResponse + response.status);
    }

    const hypermediaProcessor = this.getHypermediaProcessor(response);
    if (!hypermediaProcessor) {
      throw new Error(HydraClient.responseFormatNotSupported);
    }

    const result = await hypermediaProcessor.process(
      response,
      this.removeHypermediaFromPayload
    );
    Object.defineProperty(result, "iri", {
      value: response.url
    });
    return HydraClient.resourceEnrichmentProvider.enrichHypermedia(
      this,
      result
    );
  }

  /**
   * Invokes a given operation.
   *
   * @param operation Operation descriptor to be invoked.
   * @param body Optional resource to be used as a body of the operation.
   * @returns Response of the operation.
   */
  public async invoke(
    operation: IOperation,
    body?: IWebResource
  ): Promise<Response> {
    if (!operation) {
      throw new Error(HydraClient.noOperationProvided);
    }

    return await fetch(operation.targetUrl, {
      method: operation.method,
      body: body
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
      ? jsonld.prependBase(
          url.match(/^[a-z][a-z0-9+\-.]*:\/\/[^/]+/)[0],
          result[1]
        )
      : result[1];
  }

  private static getUrl(urlOrResource: string | IResource): string {
    const url =
      typeof urlOrResource === "object" ? urlOrResource.iri : urlOrResource;
    if (!!!url) {
      throw new Error(HydraClient.noUrlProvided);
    }

    return url;
  }

  private static convertToPropertyDescriptorMap(
    instance: any
  ): PropertyDescriptorMap {
    const properties = {};
    for (const property of Object.keys(instance)) {
      const isFunction = typeof (instance[property] === "function");
      properties[property] = {
        configurable: false,
        enumerable: !isFunction,
        value: instance[property],
        writable: !isFunction
      };
    }

    return properties;
  }
}
