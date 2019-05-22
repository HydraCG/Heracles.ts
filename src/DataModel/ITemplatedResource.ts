import { IDictionary } from "../IDictionary";
import { IPointingResource } from "./IPointingResource";

export type MappingBuilder = (MappingsBuilder) => void;

/**
 * Provides an abstract description of a resource with expandable template.
 * @interface
 */
export interface ITemplatedResource<T extends IPointingResource> extends IPointingResource {
  /**
   * Expands an URI template with given variables.
   * @param {IDictionary<string> | MappingBuilder} mappedVariables Template variables with values or
   *                                                               {@link MappingsBuilder}.
   * @returns {T}
   */
  expandTarget(mappedVariables: IDictionary<string> | MappingBuilder): T;
}
