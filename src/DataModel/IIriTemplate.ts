import { IMappingsCollection } from "./Collections/IMappingsCollection";
import { IHydraResource } from "./IHydraResource";
import { IResource } from "./IResource";

/**
 * Describes an abstract Hydra IRI template
 * @interface
 */
export interface IIriTemplate extends IHydraResource {
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
  readonly mappings: IMappingsCollection;
}
