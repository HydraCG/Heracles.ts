import { ILink } from "./ILink";

/**
 * Describes an abstract partial collection view with links to other collection parts.
 * @interface
 */
export interface IPartialCollectionView extends ILink {
  /**
   * Gets the link to the first part of the collection, if any.
   * @readonly
   * @returns {ILink}
   */
  readonly first?: ILink;

  /**
   * Gets the link to the next part of the collection, if any.
   * @readonly
   * @returns {ILink}
   */
  readonly next?: ILink;

  /**
   * Gets the link to the previous part of the collection, if any.
   * @readonly
   * @returns {ILink}
   */
  readonly previous?: ILink;

  /**
   * Gets the link to the last part of the collection, if any.
   * @readonly
   * @returns {ILink}
   */
  readonly last?: ILink;
}
