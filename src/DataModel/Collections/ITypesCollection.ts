/**
 * Provides an abstract description of the collection of types that can be filtered with relevant criteria.
 * @interface
 */
export interface ITypesCollection extends Array<string> {
  /**
   * Checks whether this collection has a given type
   * @param type {string} Type name.
   * @returns {boolean}
   */
  a(type: string): boolean;
}
