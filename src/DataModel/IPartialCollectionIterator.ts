import { IResource } from "./IResource";

/**
 * Describes an abstract view of a partial collection. This is an iterator-like pattern that once obtained from it's
 * owning {@link ICollection} should maintain it's state between consecutive next/previous page calls.
 * @interface
 */
export interface IPartialCollectionIterator {
  /**
   * Gets the IRI of current part.
   * @readonly
   * @returns {string}
   */
  readonly currentPartIri: string;

  /**
   * Gets the IRI to the first part.
   * @readonly
   * @returns {string}
   */
  readonly firstPartIri: string;

  /**
   * Gets the IRI to the next part.
   * @readonly
   * @returns {string}
   */
  readonly nextPartIri: string;

  /**
   * Gets the IRI to the previous part.
   * @readonly
   * @returns {string}
   */
  readonly previousPartIri: string;

  /**
   * Gets the IRI to the last part.
   * @readonly
   * @returns {string}
   */
  readonly lastPartIri: string;

  /**
   * Gets a value indicating whether the view has a next part available.
   * @readonly
   * @returns {boolean}
   */
  readonly hasNextPart: boolean;

  /**
   * Gets a value indicating whether the view has a previous part available.
   * @readonly
   * @returns {boolean}
   */
  readonly hasPreviousPart: boolean;

  /**
   * Retrieves a first part of the partial collection view.
   * @returns {Promise<Iterable<IResource>>}
   */
  getFirstPart(): Promise<Iterable<IResource>>;

  /**
   * Retrieves a next part of the partial collection view.
   * @returns {Promise<Iterable<IResource>>}
   */
  getNextPart(): Promise<Iterable<IResource>>;

  /**
   * Retrieves a previous part of the partial collection view.
   * @returns {Promise<Iterable<IResource>>}
   */
  getPreviousPart(): Promise<Iterable<IResource>>;

  /**
   * Retrieves a last part of the partial collection view.
   * @returns {Promise<Iterable<IResource>>}
   */
  getLastPart(): Promise<Iterable<IResource>>;
}
