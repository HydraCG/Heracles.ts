import OperationsCollection from "./Collections/OperationsCollection";
import { ITypedResource } from "./ITypedResource";

/**
 * Represents a Hydra class
 * @interface
 */
export interface IClass extends ITypedResource {
  /**
   * Gets the class' supported operations.
   * @readonly
   * @returns {OperationsCollection}
   */
  readonly supportedOperations: OperationsCollection;
}
