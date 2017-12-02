import { IResource } from "../IResource";
import FilterableCollection from "./FilterableCollection";

/**
 * Provides a collection of {@link IResource} that can be filtered with relevant criteria.
 * @class
 */
export default class ResourceFilterableCollection<T extends IResource> extends FilterableCollection<T> {
  /**
   * Initializes a new instance of the {@link ResourceFilterableCollection<T>}
   * class with initial collections of resources to filter.
   * @param resources {Iterable<IResource>} Initial collection of resources to filter.
   */
  public constructor(resources: Iterable<T>) {
    super(resources);
  }

  /**
   * Obtains a collection of resources being non blank nodes;
   * @returns {IResourceFilterableCollection<T>}
   */
  public nonBlank(): ResourceFilterableCollection<T> {
    return this.narrowFiltersWith("iri", new RegExp("[a-zA-Z][a-zA-Z0-9_]*:")) as ResourceFilterableCollection<T>;
  }

  protected createInstance(items: Iterable<T>): ResourceFilterableCollection<T> {
    return new ResourceFilterableCollection<T>(items);
  }
}
