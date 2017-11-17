import { ITypedResource } from "../ITypedResource";
import { ITypedResourceFilteredCollection } from "./ITypedResourceFilteredCollection";
import ResourceFilteredCollection from "./ResourceFilteredCollection";

/**
 * Provides a collection of {@link ITypedResource} that can be filtered with relevant criteria.
 * @class
 */
export default class TypedResourceFilteredCollection<T extends ITypedResource> extends ResourceFilteredCollection<T>
  implements ITypedResourceFilteredCollection<T> {
  /**
   * Initializes a new instance of the {@link TypedResourceFilteredCollection<T>}
   * class with initial collections of resources to filter.
   * @param resources {Iterable<ITypedResource>} Initial collection of resources to filter.
   */
  public constructor(resources: Iterable<T>) {
    super(resources);
  }

  public ofType(iri: string): ITypedResourceFilteredCollection<T> {
    return this.narrowFiltersWith("is", iri) as TypedResourceFilteredCollection<T>;
  }

  protected createInstance(items: Iterable<T>): TypedResourceFilteredCollection<T> {
    return new TypedResourceFilteredCollection<T>(items);
  }
}
