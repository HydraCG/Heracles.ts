import { ITypesCollection } from "./Collections/ITypesCollection";
import { IResource } from "./IResource";

/**
 * Describes a resource that has a type description.
 * @interface
 */
export interface ITypedResource extends IResource {
  /**
   * Gets classes a given resource is of.
   * @readonly
   * @ereturns {ITypesCollection}
   */
  readonly is: ITypesCollection;
}
