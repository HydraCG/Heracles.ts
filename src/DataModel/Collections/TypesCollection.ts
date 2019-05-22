import { rdf } from "../../namespaces";
import FilterableCollection from "./FilterableCollection";

/**
 * Provides a collection of types that can be filtered with relevant criteria.
 * @class
 */
export default class TypesCollection extends FilterableCollection<string> {
  /**
   * Initializes a new instance of the {@link TypesCollection} class with initial collections of types to filter.
   * @param types {Iterable<string>} Initial collection of types to filter.
   */
  public constructor(types: Iterable<string>) {
    super(types);
  }

  /**
   * Gets a value indicating that resource owning this type's collection has hydra:Collection type.
   * @returns {boolean}
   */
  public get isCollection(): boolean {
    return this.contains(rdf.type);
  }

  /**
   * Checks whether this collection has a given type.
   * @param type {string} Type to look for.
   * @returns {boolean}
   */
  public contains(type: string): boolean {
    return this.where(item => item === type).any();
  }

  protected createInstance(items: Iterable<string>): TypesCollection {
    return new TypesCollection(items);
  }
}
