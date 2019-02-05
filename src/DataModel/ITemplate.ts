import MappingsCollection from "./Collections/MappingsCollection";
import { IResource } from "./IResource";

/**
 * Describes an abstract template
 * @interface
 */
export interface ITemplate {
  /**
   * Gets an URI template.
   * @readonly
   * @returns {string}
   */
  readonly template: string;

  /**
   * Gets a variable representation type.
   * @readonly
   * @returns {IResource}
   */
  readonly variableRepresentation: IResource;

  /**
   * Gets the variable mappings.
   * @readonly
   * @returns {IMappingsCollection}
   */
  readonly mappings: MappingsCollection;
}
