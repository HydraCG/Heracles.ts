import OperationsCollection from "./Collections/OperationsCollection";
import ResourceFilterableCollection from "./Collections/ResourceFilterableCollection";
import { IHydraResource } from "./IHydraResource";
import { ISupportedProperty } from "./ISupportedProperty";

/**
 * Represents a Hydra class.
 * @interface
 */
export interface IClass extends IHydraResource {
  /**
   * Gets the class' title.
   * @readonly
   * @returns {string}
   */
  readonly title: string;

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
