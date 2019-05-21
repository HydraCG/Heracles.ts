import ResourceFilterableCollection from "./Collections/ResourceFilterableCollection";
import { IClass } from "./IClass";
import { IHydraResource } from "./IHydraResource";
import { IPointingResource } from "./IPointingResource";

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
   * Gets the expected classes.
   * @readonly
   * @returns {TypedResourceFilterableCollection<IClass>}
   */
  readonly expects: ResourceFilterableCollection<IClass>;

  /**
   * Gets the returned classes.
   * @readonly
   * @returns {TypedResourceFilterableCollection<IClass>}
   */
  readonly returns: ResourceFilterableCollection<IClass>;

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
