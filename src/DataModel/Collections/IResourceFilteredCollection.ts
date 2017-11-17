import { IResource } from "../IResource";
import { IFilteredCollection } from "./IFilteredCollection";

/**
 * Provides an abstract description of the collection of {@link IResource} that can be filtered with relevant criteria.
 * @interface
 */
export interface IResourceFilteredCollection<T extends IResource> extends IFilteredCollection<T> {
  /**
   * Obtains a collection of resources being non blank nodes;
   * @returns {IResourceFilteredCollection<T>}
   */
  nonBlank(): IResourceFilteredCollection<T>;
}
