import { IResource } from "./IResource";
import { ITypedResource } from "./ITypedResource";

/**
 * Describes an abstract Hydra IRI template mapping
 * @interface
 */
export interface IIriTemplateMapping extends ITypedResource {
  /**
   * Gets a variable name being mapped.
   * @readonly
   * @returns {string}
   */
  readonly variable: string;

  /**
   * Gets a property used for this variable mapping.
   * @readonly
   * @returns {IResource}
   */
  readonly property: IResource;

  /**
   * Gets the value indicating whether the mapping is required or no.
   * @readonly
   * @returns {boolean}
   */
  readonly required: boolean;
}
