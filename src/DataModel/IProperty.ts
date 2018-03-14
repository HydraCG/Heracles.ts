import ResourceFilterableCollection from "./Collections/ResourceFilterableCollection";
import { IResource } from "./IResource";

/**
 * Describes an abstract property.
 * @interface
 */
export interface IProperty extends IResource {
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
   * Gets the types of values this property can have.
   * @readonly
   */
  readonly valuesOfType: ResourceFilterableCollection<IResource>;
}
