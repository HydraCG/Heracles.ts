import { ITypedResource } from "../ITypedResource";
import ResourceFilteredCollection from "./ResourceFilterableCollection";

/**
 * Provides a collection of {@link ITypedResource} that can be filtered with relevant criteria.
 * @class
 */
export default class TypedResourceFilterableCollection<T extends ITypedResource> extends ResourceFilteredCollection<T> {
  /**
   * Initializes a new instance of the {@link TypedResourceFilterableCollection<T>}
   * class with initial collections of resources to filter.
   * @param resources {Iterable<ITypedResource>} Initial collection of resources to filter.
   */
  public constructor(resources: Iterable<T>) {
    super(resources);
  }

  /**
   * Obtains a collection of resources of a given type;
   * @param iri {string} Type of the resources.
   * @returns {TypedResourceFilterableCollection<T>}
   */
  public ofType(iri: string): TypedResourceFilterableCollection<T> {
    return this.narrowFiltersWith("is", iri) as TypedResourceFilterableCollection<T>;
  }

  protected createInstance(items: Iterable<T>): TypedResourceFilterableCollection<T> {
    return new TypedResourceFilterableCollection<T>(items);
  }
}
