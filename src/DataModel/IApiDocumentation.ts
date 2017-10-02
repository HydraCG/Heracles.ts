import { IClass } from "./IClass";
import { IHypermedia } from "./IHypermedia";
import { IResource } from "./IResource";
import { IWebResource } from "./IWebResource";

/**
 * Represents an abstract API documentation.
 */
export interface IApiDocumentation extends IHypermedia {
  /**
   * Gets a title of this API documentation.
   */
  readonly title?: string;

  /**
   * Gets a description of this API documentation.
   */
  readonly description?: string;

  /**
   * Gets the supported classes by this API.
   */
  readonly supportedClasses: IClass[];

  /**
   * Gets the Url of the entry point of the API.
   */
  readonly entryPoint: string | IResource;

  /**
   * Retrieves an API's entry point resource.
   */
  getEntryPoint(): Promise<IWebResource>;
}
