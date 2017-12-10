/**
 * Provides a collection of types that can be filtered with relevant criteria.
 * @class
 */
export default class TypesCollection extends Array<string> {
  /**
   * Initializes a new instance of the {@link TypesCollection} class with initial collections of types to filter.
   * @param types {Iterable<string> | Array<string>} Initial collection of types to filter.
   */
  public constructor(types: Iterable<string> | string[]);

  /**
   * Initializes a new instance of the {@link TypesCollection} class with initial collections of types to filter.
   * @param types {...string} Initial collection of types to filter.
   */
  public constructor(...types: string[]);

  public constructor(types: any) {
    super(...types);
  }

  /**
   * Checks whether this collection has a given type
   * @param type {string} Type name.
   * @returns {boolean}
   */
  public contains(type: string): boolean {
    return this.indexOf(type) !== -1;
  }
}
