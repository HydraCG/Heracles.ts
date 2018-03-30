import { IHydraResource } from "./IHydraResource";
import { IResource } from "./IResource";

/**
 * Provides an abstract description of a resource that points to another one.
 * @interface
 */
export interface IPointingResource extends IHydraResource {
  /**
   * Gets a base URL that can be used to resolve target in case it is relative.
   * @readonly
   * @returns {string}
   */
  readonly baseUrl: string;

  /**
   * Gets a target URL to be called.
   * @readonly
   * @returns {IResource}
   */
  readonly target: IResource;
}
