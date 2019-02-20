import ResourceFilterableCollection from "./Collections/ResourceFilterableCollection";
import ReturnedResourcesCollection from "./Collections/ReturnedResourcesCollection";
import { IHydraResource } from "./IHydraResource";
import { IPointingResource } from "./IPointingResource";
import { IResource } from "./IResource";

/**
 * Describes an abstract Hydra operation.
 * @interface
 */
export interface IOperation extends IHydraResource, IPointingResource {
  /**
   * Gets a method to be used for the call.
   * @readonly
   * @returns {string}
   */
  readonly method: string;

  /**
   * Gets the expected resources.
   * @readonly
   * @returns {TypedResourceFilterableCollection<IResource>}
   */
  readonly expects: ResourceFilterableCollection<IResource>;

  /**
   * Gets the returned resources.
   * @readonly
   * @returns {TypedResourceFilterableCollection<IResource>}
   */
  readonly returns: ReturnedResourcesCollection;

  /**
   * Gets the expected headers.
   * @readonly
   * @returns {Iterable<string>}
   */
  readonly expectedHeaders: Iterable<string>;

  /**
   * Gets the returned headers.
   * @readonly
   * @returns {Iterable<string>}
   */
  readonly returnedHeaders: Iterable<string>;
}
