import { IOperationsCollection } from "./Collections/IOperationsCollection";
import { ITypedResourceFilteredCollection } from "./Collections/ITypedResourceFilteredCollection";
import { ITypedResource } from "./ITypedResource";

/**
 * Provides an abstraction layer over hypermedia container.
 */
export interface IHypermediaContainer extends ITypedResourceFilteredCollection<ITypedResource> {
  /**
   * Gets a collection members.
   * This may be null if the resource owning this container is not a hydra:Collection.
   */
  readonly members?: ITypedResourceFilteredCollection<ITypedResource>;

  /**
   * Gets possible operations.
   */
  readonly operations: IOperationsCollection;
}
