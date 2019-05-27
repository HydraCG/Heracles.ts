import ResourceFilterableCollection from "./Collections/ResourceFilterableCollection";
import { IHeaders } from "./IHeaders";
import { IHydraResource } from "./IHydraResource";
import { IPartialCollectionIterator } from "./IPartialCollectionIterator";
import { IResource } from "./IResource";

/**
 * Provides an abstraction layer over hypermedia container.
 * @interface
 */
export interface IHypermediaContainer extends ResourceFilterableCollection<IResource>, IHydraResource {
  /**
   * Gets a collection members.
   * This may be null if the resource owning this container is not a hydra:Collection.
   * @readonly
   * @returns {ResourceFilterableCollection<IResource>}
   */
  readonly members?: ResourceFilterableCollection<IResource>;

  /**
   * Gets a partial collection view.
   * This may be null if the resource owning this container is not a hydra:Collection with hydra:view.
   * @readonly
   * @returns {IHydraResource}
   */
  readonly view?: IHydraResource;

  /**
   * Gets response headers.
   * @readonly
   * @returns {IHeaders}
   */
  readonly headers: IHeaders;

  /**
   * Gets a part iterator associated with the collection.
   * This may be null if the resource owning this container is not a hydra:Collection with hydra:view.
   * @returns {IPartialCollectionIterator}
   */
  getIterator?(): IPartialCollectionIterator;
}
