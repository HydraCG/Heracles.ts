import OperationsCollection from "./Collections/OperationsCollection";
import { IResource } from "./IResource";

/**
 * Describes an abstract Hydra resource.
 * @interface
 */
export interface IHydraResource extends IResource {
  /**
   * Gets operations that can be performed on that resource.
   * @readonly
   * @returns {OperationsCollection}
   */
  readonly operations: OperationsCollection;
}
