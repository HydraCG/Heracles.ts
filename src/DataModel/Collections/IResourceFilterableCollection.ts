import { IResource } from "../IResource";
import { IFilterableCollection } from "./IFilterableCollection";

/**
 * Provides an abstract description of the collection of {@link IResource} that can be filtered with relevant criteria.
 * @interface
 */
export interface IResourceFilterableCollection<T extends IResource> extends IFilterableCollection<T> {
  /**
   * Obtains a collection of resources being non blank nodes;
   * @returns {IResourceFilterableCollection<T>}
   */
  nonBlank(): IResourceFilterableCollection<T>;
}
