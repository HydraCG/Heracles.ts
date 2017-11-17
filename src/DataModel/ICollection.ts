import { ITypedResourceFilteredCollection } from "./Collections/ITypedResourceFilteredCollection";
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
   * @returns {ITypedResourceFilteredCollection<ITypedResource>}
   */
  readonly members: ITypedResourceFilteredCollection<ITypedResource>;

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
