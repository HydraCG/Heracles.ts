import { IPartialCollectionPage } from "./IPartialCollectionPage";
import { IResource } from "./IResource";

/**
 * Describes an abstract view of a partial collection. This is an iterator-like pattern that once obtained from it's
 * owning {@link ICollection} should maintain it's state between consecutive next/previous page calls.
 * @interface
 */
export interface IPartialCollectionView extends IResource {
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
   * Retrieves a next page of the partial collection view.
   * @returns {Promise<IPartialCollectionPage>}
   */
  getNextPage(): Promise<IPartialCollectionPage>;

  /**
   * Retrieves a previous page of the partial collection view.
   * @returns {Promise<IPartialCollectionPage>}
   */
  getPreviousPage(): Promise<IPartialCollectionPage>;
}
