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
}
