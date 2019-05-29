import { IResource } from "./IResource";

/**
 * Describes an abstract statement.
 * While all properties are optional, it is recommended to provide at least two of the properties.
 */
export interface IStatement extends IResource {
  /**
   * Gets the IRI of the statement's subject.
   * @readonly
   * @returns {IResource}
   */
  subject?: IResource;

  /**
   * Gets the IRI of the statement's predicate.
   * @readonly
   * @returns {IResource}
   */
  property?: IResource;

  /**
   * Gets the IRI of the statement's object.
   * @readonly
   * @returns {IResource}
   */
  object?: IResource;
}
