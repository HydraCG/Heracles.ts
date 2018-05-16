import ResourceFilterableCollection from "./Collections/ResourceFilterableCollection";
import { IHydraResource } from "./IHydraResource";
import { IIriTemplate } from "./IIriTemplate";
import { IPartialCollectionIterator } from "./IPartialCollectionIterator";
import { IResource } from "./IResource";

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
   * Gets the total items in the collection.
   * @readonly
   * @returns {number}
   */
  readonly totalItems: number;

  /**
   * Gets the optional member template.
   * @readonly
   * @returns {IIriTemplate}
   */
  readonly memberTemplate?: IIriTemplate;

  /**
   * Gets the optional partial collection view.
   * @readonly
   * @returns {IHydraResource}
   */
  readonly view?: IHydraResource;

  /**
   * Gets a partoal collection iterator associated in case it is a partial one.
   * @returns {IPartialCollectionIterator}
   */
  getIterator(): IPartialCollectionIterator;
}
