import { IResource } from "./IResource";

/**
 * Describes an abstract partial collection page with members.
 * @interface
 */
export interface IPartialCollectionPage {
  /**
   * Gets members of this partial collection page.
   */
  readonly members: Iterable<IResource>;
}
