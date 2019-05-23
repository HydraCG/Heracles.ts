import { hydra } from "../../namespaces";
import FilterableCollection from "./FilterableCollection";

/**
 * Provides a collection of types that can be filtered with relevant criteria.
 * @class
 */
export default class TypesCollection extends FilterableCollection<string> {
  /**
   * Defines an empty types collection.
   * @constant {TypesCollection}
   */
  public static readonly empty = new TypesCollection();

  /**
   * Initializes a new instance of the {@link TypesCollection} class with initial collections of types to filter.
   * @param {Iterable<string>} [types] Initial collection of types to filter.
   */
  public constructor(types?: Iterable<string>) {
    let actualTypes = types;
    if (!!actualTypes) {
      let typeArray: string[] = types as string[];
      if (!(actualTypes instanceof Array)) {
        typeArray = Array.from(actualTypes);
      }

      actualTypes = typeArray.filter((item, index) => typeArray.indexOf(item) === index);
    }

    super(actualTypes);
  }

  /**
   * Gets a value indicating that resource owning this type's collection has hydra:Collection type.
   * @returns {boolean}
   */
  public get isCollection(): boolean {
    return this.contains(hydra.Collection);
  }

  /**
   * Checks whether this collection has a given type.
   * @param {string} type Type to look for.
   * @returns {boolean}
   */
  public contains(type: string): boolean {
    return this.where(item => item === type).any();
  }

  public except(type: string): TypesCollection {
    return this.narrowFiltersWith("_", _ => _ !== type) as TypesCollection;
  }

  protected createInstance(items: Iterable<string>): TypesCollection {
    return new TypesCollection(items);
  }
}
