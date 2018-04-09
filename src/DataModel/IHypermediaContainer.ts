import LinksCollection from "./Collections/LinksCollection";
import OperationsCollection from "./Collections/OperationsCollection";
import ResourceFilterableCollection from "./Collections/ResourceFilterableCollection";
import { ICollection } from "./ICollection";
import { IResource } from "./IResource";

/**
 * Provides an abstraction layer over hypermedia container.
 */
export interface IHypermediaContainer extends ResourceFilterableCollection<IResource> {
  /**
   * Gets a collection of links.
   */
  readonly links: LinksCollection;

  /**
   * Gets possible operations.
   */
  readonly operations: OperationsCollection;

  /**
   * Gets discovered collections.
   */
  readonly collections: ResourceFilterableCollection<ICollection>;

  /**
   * Gets a collection members.
   * This may be null if the resource owning this container is not a hydra:Collection.
   */
  readonly members?: ResourceFilterableCollection<IResource>;

  /**
   * Gets all collection's members, regardless current collection is either complete or partial view.
   * This may be null if the resource owning this container is not a hydra:Collection.
   * @returns {Promise<IResource[]>}
   */
  getAllMembers?(): Promise<IResource[]>;
}
