import {hydra} from "./namespaces";
import {IMetadataProvider} from "./DataModel/IMetadataProvider";
import {IApiDocumentation} from "./DataModel/IApiDocumentation";
import {IMetadataDescription} from "./DataModel/IMetadataDescription";
import ApiDocumentation from "./ApiDocumentation";

/**
 * @class HydraClient Represents a Hypermedia Driven Application (HyDrA) Core Vocabulary client.
 */
export default class HydraClient
{
    private static _instance: HydraClient ;
    private static _metadataProviders = new Array<IMetadataProvider>();

    public static apiDocumentationNotProvided = "API documentation not provided.";
    public static noEntryPointDefined = "API documentation has no entry point defined.";
    public static noMetadataProvider = "No meta-data provider instance was provided for registration.";
    public static invalidResponse = "Remote server responded with a status of ";
    public static responseFormatNotSupported = "Response format is not supported.";

    /**
     * Gets an instance of the @link HydraClient class.
     * @returns {HydraClient}
     */
    public static get instance(): HydraClient
    {
        return (HydraClient._instance || (HydraClient._instance = new HydraClient()));
    }

    /**
     * Registers a meta-data provider.
     * @param {IMetadataProvider} metadataProvider Meta-data provider to be registered.
     */
    public static registerMetadataProvider(metadataProvider: IMetadataProvider)
    {
        if (!metadataProvider)
        {
            throw new Error(HydraClient.noMetadataProvider);
        }

        HydraClient._metadataProviders.push(metadataProvider);
    }

    /**
     * Gets a metadata provider suitable for a given response.
     * @param {Response} response Raw response to find metadata provider for.
     * @returns {IMetadataProvider}
     */
    public getMetadataProvider(response: Response): IMetadataProvider
    {
        return HydraClient._metadataProviders.find(provider =>
            !!provider.supportedMediaTypes.find(mediaType => mediaType === response.headers.get("Content-Type")));
    }

    /**
     * Obtains an API documentation.
     * @param url URL from which to obtain an API documentation.
     * @returns {Promise<ApiDocumentation>}
     */
    public async getApiDocumentation(url: string): Promise<IApiDocumentation>
    {
        let response = await window.fetch(await this.getApiDocumentationUrl(url));
        if (response.status !== 200)
        {
            throw new Error(HydraClient.invalidResponse + response.status);
        }

        let metadataProvider = this.getMetadataProvider(response);
        if (!metadataProvider)
        {
            throw new Error(HydraClient.responseFormatNotSupported);
        }

        let apiDocumentation = <IApiDocumentation>(await metadataProvider.parse(response))
            .metadata.find(hypermediaControl => (<any>hypermediaControl).entryPoint);
        if (!apiDocumentation)
        {
            throw new Error(HydraClient.noEntryPointDefined);
        }

        apiDocumentation.client = this;
        return Promise.resolve(Object.create(ApiDocumentation.prototype, HydraClient.convertToPropertyDescriptorMap(apiDocumentation)));
    }

    private async getApiDocumentationUrl(url: string): Promise<string>
    {
        let response = await window.fetch(url);
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