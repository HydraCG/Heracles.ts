import OperationsCollection from "./Collections/OperationsCollection";
import { ITypedResource } from "./ITypedResource";

/**
 * Describes an abstract Hydra resource.
 * @interface
 */
export interface IHydraResource extends ITypedResource {
  /**
   * Gets operations that can be performed on that resource.
   * @readonly
   * @returns {OperationsCollection}
   */
  readonly operations: OperationsCollection;
}
