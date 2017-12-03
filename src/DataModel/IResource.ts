import TypesCollection from "./Collections/TypesCollection";

/**
 * Describes an abstract RDF resource.
 * @interface
 */
export interface IResource {
  /**
   * Gets an Iri of a resource.
   * @readonly
   * @returns {string}
   */
  readonly iri: string;

  /**
   * Gets classes a given resource is of.
   * @readonly
   * @returns {TypesCollection}
   */
  readonly type: TypesCollection;
}
