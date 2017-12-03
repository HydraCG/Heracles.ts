import ResourceFilterableCollection from "./Collections/ResourceFilterableCollection";
import { IClass } from "./IClass";
import { IResource } from "./IResource";
import { IWebResource } from "./IWebResource";

/**
 * Represents an abstract API documentation.
 * @interface
 */
export interface IApiDocumentation extends IResource {
  /**
   * Gets a title of this API documentation.
   * @readonly
   * @returns {string}
   */
  readonly title?: string;

  /**
   * Gets a description of this API documentation.
   * @readonly
   * @returns {string}
   */
  readonly description?: string;

  /**
   * Gets the supported classes by this API.
   * @readonly
   * @returns {TypedResourceFilterableCollection<IClass>}
   */
  readonly supportedClasses: ResourceFilterableCollection<IClass>;

  /**
   * Gets the Url of the entry point of the API.
   * @readonly
   * @returns {string}
   */
  readonly entryPoint: string;

  /**
   * Retrieves an API's entry point resource.
   * @readonly
   * @returns {Promise<IWebResource>}
   */
  getEntryPoint(): Promise<IWebResource>;
}
