import { IOperationsCollection } from "./Collections/IOperationsCollection";
import { ITypedResource } from "./ITypedResource";

/**
 * Represents a Hydra class
 * @interface
 */
export interface IClass extends ITypedResource {
  /**
   * Gets the class' supported operations.
   * @readonly
   * @returns {IOperationsCollection}
   */
  readonly supportedOperations: IOperationsCollection;
}
