import { ITypedResource } from "../ITypedResource";
import { ITypedResourceFilterableCollection } from "./ITypedResourceFilterableCollection";
import ResourceFilteredCollection from "./ResourceFilterableCollection";

/**
 * Provides a collection of {@link ITypedResource} that can be filtered with relevant criteria.
 * @class
 */
export default class TypedResourceFilterableCollection<T extends ITypedResource> extends ResourceFilteredCollection<T>
  implements ITypedResourceFilterableCollection<T> {
  /**
   * Initializes a new instance of the {@link TypedResourceFilterableCollection<T>}
   * class with initial collections of resources to filter.
   * @param resources {Iterable<ITypedResource>} Initial collection of resources to filter.
   */
  public constructor(resources: Iterable<T>) {
    super(resources);
  }

  public ofType(iri: string): ITypedResourceFilterableCollection<T> {
    return this.narrowFiltersWith("is", iri) as TypedResourceFilterableCollection<T>;
  }

  protected createInstance(items: Iterable<T>): TypedResourceFilterableCollection<T> {
    return new TypedResourceFilterableCollection<T>(items);
  }
}
