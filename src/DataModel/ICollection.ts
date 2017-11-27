import { ITypedResourceFilterableCollection } from "./Collections/ITypedResourceFilterableCollection";
import { IHydraResource } from "./IHydraResource";
import { IIriTemplate } from "./IIriTemplate";
import { ITypedResource } from "./ITypedResource";

/**
 * Describes an abstract Hydra collection.
 * @interface
 */
export interface ICollection extends IHydraResource {
  /**
   * Gets the collection's member resources.
   * @readonly
   * @returns {ITypedResourceFilterableCollection<ITypedResource>}
   */
  readonly members: ITypedResourceFilterableCollection<ITypedResource>;

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
}
