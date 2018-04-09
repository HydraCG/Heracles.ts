import ResourceFilterableCollection from "./Collections/ResourceFilterableCollection";
import { IHydraResource } from "./IHydraResource";
import { IIriTemplate } from "./IIriTemplate";
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
   * Gets all collection's members, regardless current collection is either complete or partial view.
   * @returns {Promise<IResource[]>}
   */
  getAllMembers(): Promise<IResource[]>;
}
