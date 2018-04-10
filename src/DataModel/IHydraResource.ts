import LinksCollection from "./Collections/LinksCollection";
import OperationsCollection from "./Collections/OperationsCollection";
import ResourceFilterableCollection from "./Collections/ResourceFilterableCollection";
import { ICollection } from "./ICollection";
import { IResource } from "./IResource";

/**
 * Describes an abstract Hydra resource.
 * @interface
 */
export interface IHydraResource extends IResource {
  /**
   * Gets collections exposed by that resource.
   * @readonly
   * @returns {ResourceFilterableCollection<ICollection>}
   */
  readonly collections: ResourceFilterableCollection<ICollection>;

  /**
   * Gets operations that can be performed on that resource.
   * @readonly
   * @returns {OperationsCollection}
   */
  readonly operations: OperationsCollection;

  /**
   * Gets links related to that resource.
   * @readonly
   * @returns {LinksCollection}
   */
  readonly links: LinksCollection;
}
