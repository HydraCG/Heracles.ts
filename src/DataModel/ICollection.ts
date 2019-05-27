import ResourceFilterableCollection from "./Collections/ResourceFilterableCollection";
import { IHydraResource } from "./IHydraResource";
import { IPartialCollectionIterator } from "./IPartialCollectionIterator";
import { IPartialCollectionView } from "./IPartialCollectionView";
import { IResource } from "./IResource";
import { IStatement } from "./IStatement";

/**
 * Describes an abstract Hydra collection.
 * @interface
 */
export interface ICollection extends IHydraResource {
  /**
   * Gets the collection's member resources.
   * @readonly
   * @returns {ResourceFilterableCollection<IResource>}
   */
  readonly members: ResourceFilterableCollection<IResource>;

  /**
   * Gets the statements defining the hydra:manages blocks.
   * @readonly
   * @returns {StatementsCollection}
   */
  readonly manages: ResourceFilterableCollection<IStatement>;

  /**
   * Gets the total items in the collection.
   * @readonly
   * @returns {number}
   */
  readonly totalItems: number;

  /**
   * Gets the optional partial collection view.
   * @readonly
   * @returns {IPartialCollectionView}
   */
  readonly view?: IPartialCollectionView;

  /**
   * Gets a partial collection iterator associated in case it is a partial one.
   * @returns {IPartialCollectionIterator}
   */
  getIterator(): IPartialCollectionIterator;
}
