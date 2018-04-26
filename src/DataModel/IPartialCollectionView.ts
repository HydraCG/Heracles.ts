import { IResource } from "./IResource";

/**
 * Describes an abstract view of a partial collection. This is an iterator-like pattern that once obtained from it's
 * owning {@link ICollection} should maintain it's state between consecutive next/previous page calls.
 * @interface
 */
export interface IPartialCollectionView extends IResource {
  /**
   * Gets the link to the first page.
   */
  readonly first: string;

  /**
   * Gets the link to the next page.
   */
  readonly next: string;

  /**
   * Gets the link to the previous page.
   */
  readonly previous: string;

  /**
   * Gets the link to the last page.
   */
  readonly last: string;

  /**
   * Gets a value indicating whether the view has a next page available.
   * @returns {boolean}
   */
  readonly hasNextPage: boolean;

  /**
   * Gets a value indicating whether the view has a previous page available.
   * @returns {boolean}
   */
  readonly hasPreviousPage: boolean;

  /**
   * Retrieves a first page of the partial collection view.
   * @returns {Promise<Iterable<IResource>>}
   */
  getFirstPage(): Promise<Iterable<IResource>>;

  /**
   * Retrieves a next page of the partial collection view.
   * @returns {Promise<Iterable<IResource>>}
   */
  getNextPage(): Promise<Iterable<IResource>>;

  /**
   * Retrieves a previous page of the partial collection view.
   * @returns {Promise<Iterable<IResource>>}
   */
  getPreviousPage(): Promise<Iterable<IResource>>;

  /**
   * Retrieves a last page of the partial collection view.
   * @returns {Promise<Iterable<IResource>>}
   */
  getLastPage(): Promise<Iterable<IResource>>;
}
