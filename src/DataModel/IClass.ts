import OperationsCollection from "./Collections/OperationsCollection";
import { IResource } from "./IResource";

/**
 * Represents a Hydra class
 * @interface
 */
export interface IClass extends IResource {
  /**
   * Gets the class' supported operations.
   * @readonly
   * @returns {OperationsCollection}
   */
  readonly supportedOperations: OperationsCollection;
}
