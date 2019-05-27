import { rdf } from "../../namespaces";
import { ICollection } from "../ICollection";
import ResourceFilterableCollection from "./ResourceFilterableCollection";

/**
 * Provides a convenient collection for {@link ICollection}s.
 */
export default class CollectionsCollection extends ResourceFilterableCollection<ICollection> {
  /**
   * Initializes a new instance of the {@link CollectionsCollection} class.
   * @param {Iterable<ICollection>} collections Initial collections to add to the collection.
   */
  public constructor(collections?: Iterable<ICollection>) {
    super(collections);
  }

  /**
   * Obtains those collections that defines a hydra:manages block matching a given property and object.
   * @param {string} subject Subject to match in the hydra:manages block.
   * @param {string} property Property to match in the hydra:manages block.
   * @returns {CollectionsCollection}
   */
  public withMembersInRelationWith(subject: string, property: string): CollectionsCollection {
    let result: CollectionsCollection = this;
    if (typeof(property) === "string" && property.length > 0 && typeof subject === "string" && subject.length > 0) {
      result = this.where(
        item => item.manages.where(
          _ => _.property.iri === property && _.subject.iri === subject).any()) as CollectionsCollection;
    }

    return result;
  }

  /**
   * Obtains those collections that defines a hydra:manages block matching a given property and object.
   * @param {string} property Property to match in the hydra:manages block.
   * @param {string} object Object to match in the hydra:manages block.
   * @returns {CollectionsCollection}
   */
  public withMembersMatching(property: string, object: string): CollectionsCollection {
    let result: CollectionsCollection = this;
    if (typeof(property) === "string" && property.length > 0 && typeof object === "string" && object.length > 0) {
      result = this.where(
        item => item.manages.where(
          _ => _.property.iri === property && _.object.iri === object).any()) as CollectionsCollection;
    }

    return result;
  }

  /**
   * Obtains those collections that defines a hydra:manages block matching a given type and type IRI.
   * @param {string} type Type to match in the hydra:manages block.
   * @returns {CollectionsCollection}
   */
  public withMembersOfType(type: string): CollectionsCollection {
    return this.withMembersMatching(rdf.type, type);
  }
}