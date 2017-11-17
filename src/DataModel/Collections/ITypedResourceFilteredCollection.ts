import { ITypedResource } from "../ITypedResource";
import { IResourceFilteredCollection } from "./IResourceFilteredCollection";

/**
 * Provides an abstract description of the collection of {@link ITypedResource}
 * that can be filtered with relevant criteria.
 * @interface
 */
export interface ITypedResourceFilteredCollection<T extends ITypedResource> extends IResourceFilteredCollection<T> {
  /**
   * Obtains a collection of resources of a given type;
   * @param iri {string} Type of the resources.
   * @returns {ITypedResourceFilteredCollection<T>}
   */
  ofType(iri: string): ITypedResourceFilteredCollection<T>;
}
