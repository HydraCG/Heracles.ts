export interface IDictionary {
  [name: string]: string;
}
export type MappingBuilder = (MappingsBuilder) => void;

/**
 * Provides an abstract description of an object with expandable template.
 * @interface
 */
export interface ITemplated<T> {
  /**
   * Expands the object with given variables.
   * @param {{ [name: string]: string } | (MappingsBuilder) => void} mappedVariables Template variables with values or
   *                                                                                 {@link MappingsBuilder}.
   * @returns {T}
   */
  expand(mappedVariables: IDictionary | MappingBuilder): T;
}
