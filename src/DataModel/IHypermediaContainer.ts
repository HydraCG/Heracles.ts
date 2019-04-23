import LinksCollection from "./Collections/LinksCollection";
import OperationsCollection from "./Collections/OperationsCollection";
import ResourceFilterableCollection from "./Collections/ResourceFilterableCollection";
import { ICollection } from "./ICollection";
import { IHeaders } from "./IHeaders";
import { IHydraResource } from "./IHydraResource";
import { IPartialCollectionIterator } from "./IPartialCollectionIterator";
import { IResource } from "./IResource";

/**
 * Provides an abstraction layer over hypermedia container.
 */
export interface IHypermediaContainer extends ResourceFilterableCollection<IResource> {
  /**
   * Gets the currently obtained resource IRI.
   */
  readonly iri: string;

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
   * Gets a partial collection view.
   * This may be null if the resource owning this container is not a hydra:Collection with hydra:view.
   */
  readonly view?: IHydraResource;

  /**
   * Gets response headers.
   */
  readonly headers: IHeaders;

  /**
   * Gets a part iterator associated with the collection.
   * This may be null if the resource owning this container is not a hydra:Collection with hydra:view.
   * @returns {IPartialCollectionIterator}
   */
  getIterator?(): IPartialCollectionIterator;
}
