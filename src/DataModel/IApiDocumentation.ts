import {IWebResource} from "./IWebResource";
import {IClass} from "./IClass";
import {IHypermedia} from "./IHypermedia";

/**
 * @interface Represents an abstract API documentation.
 */
export interface IApiDocumentation extends IHypermedia
{
    /**
     * @readonly Gets a title of this API documentation.
     */
    readonly title?: string;

    /**
     * @readonly Gets a description of this API documentation.
     */
    readonly description?: string;

    /**
     * @readonly Gets the supported classes by this API.
     */
    readonly supportedClasses: Array<IClass>;

    /**
     * @readonly Gets the Url of the entry point of the API.
     */
    readonly entryPoint: string | { iri: string };

    /**
     * Retrieves an API's entry point resource.
     * @returns Promise<IWebResource>
     */
    getEntryPoint(): Promise<IWebResource>;
}