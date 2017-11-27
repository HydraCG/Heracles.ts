import { ITypedResource } from "../ITypedResource";
import { IResourceFilterableCollection } from "./IResourceFilterableCollection";

/**
 * Provides an abstract description of the collection of {@link ITypedResource}
 * that can be filtered with relevant criteria.
 * @interface
 */
export interface ITypedResourceFilterableCollection<T extends ITypedResource> extends IResourceFilterableCollection<T> {
  /**
   * Obtains a collection of resources of a given type;
   * @param iri {string} Type of the resources.
   * @returns {ITypedResourceFilterableCollection<T>}
   */
  ofType(iri: string): ITypedResourceFilterableCollection<T>;
}
