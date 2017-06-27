import {hydra} from "./namespaces";
import {IHypermediaProcessor} from "./DataModel/IHypermediaProcessor";
import {IApiDocumentation} from "./DataModel/IApiDocumentation";
import {IWebResource} from "./DataModel/IWebResource";
import ApiDocumentation from "./ApiDocumentation";
require('isomorphic-fetch');

/**
 * @class HydraClient Heracles is a generic client for Hydra-powered Web APIs.
 *                    To learn more about Hydra please refer to {@link https://www.hydra-cg.com/spec/latest/core/}
 */
export default class HydraClient
{
    private static _hypermediaProcessors = new Array<IHypermediaProcessor>();

    public static noUrlProvided = "There was no Url provided.";
    public static apiDocumentationNotProvided = "API documentation not provided.";
    public static noEntryPointDefined = "API documentation has no entry point defined.";
    public static noHypermediaProcessor = "No hypermedia processor instance was provided for registration.";
    public static invalidResponse = "Remote server responded with a status of ";
    public static responseFormatNotSupported = "Response format is not supported.";

    /**
     * Registers a hypermedia processor.
     * @param {IHypermediaProcessor} hypermediaProcessor Hypermedia processor to be registered.
     */
    public static registerHypermediaProcessor(hypermediaProcessor: IHypermediaProcessor)
    {
        if (!hypermediaProcessor)
        {
            throw new Error(HydraClient.noHypermediaProcessor);
        }

        HydraClient._hypermediaProcessors.push(hypermediaProcessor);
    }

    /**
     * Gets a hypermedia provider suitable for a given response.
     * @param {Response} response Raw response to find hypermedia processor for.
     * @returns {IHypermediaProcessor}
     */
    public getHypermediaProcessor(response: Response): IHypermediaProcessor
    {
        return HydraClient._hypermediaProcessors.find(provider =>
            !!provider.supportedMediaTypes.find(mediaType => mediaType === response.headers.get("Content-Type")));
    }

    /**
     * Obtains an API documentation.
     * @param url URL from which to obtain an API documentation.
     * @returns {Promise<ApiDocumentation>}
     */
    public async getApiDocumentation(url: string): Promise<IApiDocumentation>;
    /**
     * Obtains an API documentation.
     * @param resources {{ iri: string }} Resource with an iri property from which to obtain an API documentation.
     * @returns {Promise<ApiDocumentation>}
     */
    public async getApiDocumentation(resource: { iri: string }): Promise<IApiDocumentation>;
    public async getApiDocumentation(urlOrResource: string | { iri: string }): Promise<IApiDocumentation>
    {
        let url = HydraClient.getUrl(urlOrResource);
        let apiDocumentationUrl = await this.getApiDocumentationUrl(url);
        let resource = await this.getResource(apiDocumentationUrl);
        let apiDocumentation = <IApiDocumentation>resource
            .hypermedia.find(hypermediaControl => (<any>hypermediaControl).entryPoint);
        if (!apiDocumentation)
        {
            throw new Error(HydraClient.noEntryPointDefined);
        }

        apiDocumentation.client = this;
        return Promise.resolve(Object.create(ApiDocumentation.prototype, HydraClient.convertToPropertyDescriptorMap(apiDocumentation)));
    }

    /**
     * Obtains a representation of a resource.
     * @param url Url of the resource to be obtained.
     * @returns {Promise<IWebResource>}
     */
    public async getResource(url: string): Promise<IWebResource>;
    /**
     * Obtains a representation of a resource.
     * @param url Url of the resource to be obtained.
     * @returns {Promise<IWebResource>}
     */
    public async getResource(resource: { iri: string }): Promise<IWebResource>;
    public async getResource(urlOrResource: string | { iri: string }): Promise<IWebResource>
    {
        let url = HydraClient.getUrl(urlOrResource);
        let response = await fetch(url);
        if (response.status !== 200)
        {
            throw new Error(HydraClient.invalidResponse + response.status);
        }

        let hypermediaProcessor = this.getHypermediaProcessor(response);
        if (!hypermediaProcessor)
        {
            throw new Error(HydraClient.responseFormatNotSupported);
        }

        return await hypermediaProcessor.process(response, true);
    }

    private async getApiDocumentationUrl(url: string): Promise<string>
    {
        let response = await fetch(url);
        if (response.status !== 200)
        {
            throw new Error(HydraClient.invalidResponse + response.status);
        }

        let link = response.headers.get("Link");
        if (!link)
        {
            throw new Error(HydraClient.apiDocumentationNotProvided)
        }

        let result = link.match(`<([^>]+)>; rel="${hydra.apiDocumentation}"`);
        if (!result)
        {
            throw new Error(HydraClient.apiDocumentationNotProvided)
        }

        return result[1];
    }

    private static getUrl(urlOrResource: string | { iri: string }): string
    {
        let url = (typeof(urlOrResource) === "object" ? urlOrResource.iri : urlOrResource);
        if (!!!url)
        {
            throw new Error(HydraClient.noUrlProvided);
        }

        return url;
    }

    private static convertToPropertyDescriptorMap(instance: any): PropertyDescriptorMap
    {
        let properties = {};
        for (let property of Object.keys(instance))
        {
            let isFunction = typeof(instance[property] === "function");
            properties[property] = {
                value: instance[property],
                writable: !isFunction,
                enumerable: !isFunction,
                configurable: false
            };
        }

        return properties;
    }
}