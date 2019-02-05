import HeadersCollection from "./Collections/HeadersCollection";
import ResourceFilterableCollection from "./Collections/ResourceFilterableCollection";
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
  readonly returns: ResourceFilterableCollection<IResource>;

  /**
   * Gets the expected headers.
   * @readonly
   * @returns {HeadersCollection}
   */
  readonly expectedHeaders: HeadersCollection;

  /**
   * Gets the returned headers.
   * @readonly
   * @returns {Iterable<string>}
   */
  readonly returnedHeaders: Iterable<string>;
}
