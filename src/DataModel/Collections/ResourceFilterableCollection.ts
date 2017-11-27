import { IResource } from "../IResource";
import FilteredCollection from "./FilterableCollection";
import { IResourceFilterableCollection } from "./IResourceFilterableCollection";

/**
 * Provides a collection of {@link IResource} that can be filtered with relevant criteria.
 * @class
 */
export default class ResourceFilterableCollection<T extends IResource> extends FilteredCollection<T>
  implements IResourceFilterableCollection<T> {
  /**
   * Initializes a new instance of the {@link ResourceFilterableCollection<T>}
   * class with initial collections of resources to filter.
   * @param resources {Iterable<IResource>} Initial collection of resources to filter.
   */
  public constructor(resources: Iterable<T>) {
    super(resources);
  }

  public nonBlank(): IResourceFilterableCollection<T> {
    return this.narrowFiltersWith("iri", new RegExp("[a-zA-Z][a-zA-Z0-9_]*:")) as ResourceFilterableCollection<T>;
  }

  protected createInstance(items: Iterable<T>): ResourceFilterableCollection<T> {
    return new ResourceFilterableCollection<T>(items);
  }
}
