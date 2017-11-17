import { IResource } from "../IResource";
import FilteredCollection from "./FilteredCollection";
import { IResourceFilteredCollection } from "./IResourceFilteredCollection";

/**
 * Provides a collection of {@link IResource} that can be filtered with relevant criteria.
 * @class
 */
export default class ResourceFilteredCollection<T extends IResource> extends FilteredCollection<T>
  implements IResourceFilteredCollection<T> {
  /**
   * Initializes a new instance of the {@link ResourceFilteredCollection<T>}
   * class with initial collections of resources to filter.
   * @param resources {Iterable<IResource>} Initial collection of resources to filter.
   */
  public constructor(resources: Iterable<T>) {
    super(resources);
  }

  public nonBlank(): IResourceFilteredCollection<T> {
    return this.narrowFiltersWith("iri", new RegExp("[a-zA-Z][a-zA-Z0-9_]*:")) as ResourceFilteredCollection<T>;
  }

  protected createInstance(items: Iterable<T>): ResourceFilteredCollection<T> {
    return new ResourceFilteredCollection<T>(items);
  }
}
