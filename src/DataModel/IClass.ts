import OperationsCollection from "./Collections/OperationsCollection";
import ResourceFilterableCollection from "./Collections/ResourceFilterableCollection";
import { IResource } from "./IResource";
import { ISupportedProperty } from "./ISupportedProperty";

/**
 * Represents a Hydra class.
 * @interface
 */
export interface IClass extends IResource {
  /**
   * Gets the class' display name.
   * @readonly
   * @returns {string}
   */
  readonly displayName: string;

  /**
   * Gets the class' description.
   * @readonly
   * @returns {string}
   */
  readonly description: string;

  /**
   * Gets the class' supported operations.
   * @readonly
   * @returns {OperationsCollection}
   */
  readonly supportedOperations: OperationsCollection;

  /**
   * Gets the class' supported properties
   * @readonly
   * @returns {ResourceFilterableCollection<ISupportedProperty>}
   */
  readonly supportedProperties: ResourceFilterableCollection<ISupportedProperty>;
}
