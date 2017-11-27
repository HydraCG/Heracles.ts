import { ITypedResourceFilterableCollection } from "./Collections/ITypedResourceFilterableCollection";
import { IClass } from "./IClass";
import { IHydraResource } from "./IHydraResource";

/**
 * Describes an abstract Hydra operation.
 * @interface
 */
export interface IOperation extends IHydraResource {
  /**
   * Gets a base URL that can be used to resolve target in case it is relative.
   * @readonly
   * @returns {string}
   */
  readonly baseUrl: string;

  /**
   * Gets a target URL to be called.
   * @readonly
   * @returns {string}
   */
  readonly target: string;

  /**
   * Gets a method to be used for the call.
   * @readonly
   * @returns {string}
   */
  readonly method: string;

  /**
   * Gets the expected classes.
   * @readonly
   * @returns {ITypedResourceFilterableCollection<IClass>}
   */
  readonly expects: ITypedResourceFilterableCollection<IClass>;
}
