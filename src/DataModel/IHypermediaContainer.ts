import OperationsCollection from "./Collections/OperationsCollection";
import TypedResourceFilterableCollection from "./Collections/TypedResourceFilterableCollection";
import { ITypedResource } from "./ITypedResource";

/**
 * Provides an abstraction layer over hypermedia container.
 */
export interface IHypermediaContainer extends TypedResourceFilterableCollection<ITypedResource> {
  /**
   * Gets a collection members.
   * This may be null if the resource owning this container is not a hydra:Collection.
   */
  readonly members?: TypedResourceFilterableCollection<ITypedResource>;

  /**
   * Gets possible operations.
   */
  readonly operations: OperationsCollection;
}
