import { IOperationsCollection } from "./Collections/IOperationsCollection";
import { ITypedResourceFilterableCollection } from "./Collections/ITypedResourceFilterableCollection";
import { ITypedResource } from "./ITypedResource";

/**
 * Provides an abstraction layer over hypermedia container.
 */
export interface IHypermediaContainer extends ITypedResourceFilterableCollection<ITypedResource> {
  /**
   * Gets a collection members.
   * This may be null if the resource owning this container is not a hydra:Collection.
   */
  readonly members?: ITypedResourceFilterableCollection<ITypedResource>;

  /**
   * Gets possible operations.
   */
  readonly operations: IOperationsCollection;
}
