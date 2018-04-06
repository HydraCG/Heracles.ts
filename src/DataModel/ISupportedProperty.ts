import { IProperty } from "./IProperty";
import { IResource } from "./IResource";

/**
 * Describes an abstract Hydra property.
 * @interface
 */
export interface ISupportedProperty extends IResource {
  /**
   * Gets the actual property.
   * @readonly
   */
  readonly property: IProperty;

  /**
   * Gets the value indicating whether this property is required.
   * @readonly
   */
  readonly required: boolean;

  /**
   * Gets the value indicating whether this property is readable.
   * @readonly
   */
  readonly readable: boolean;

  /**
   * Gets the value indicating whether this property is writable.
   * @readonly
   */
  readonly writable: boolean;
}
