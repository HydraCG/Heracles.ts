import { IResource } from "./IResource";

/**
 * Describes an abstract partial collection view with links to other collection parts.
 * @interface
 */
export interface IPartialCollectionView extends IResource {
  /**
   * Gets the link to the first part of the collection, if any.
   * @readonly
   * @returns {ILink}
   */
  readonly first?: IResource;

  /**
   * Gets the link to the next part of the collection, if any.
   * @readonly
   * @returns {ILink}
   */
  readonly next?: IResource;

  /**
   * Gets the link to the previous part of the collection, if any.
   * @readonly
   * @returns {ILink}
   */
  readonly previous?: IResource;

  /**
   * Gets the link to the last part of the collection, if any.
   * @readonly
   * @returns {ILink}
   */
  readonly last?: IResource;
}
