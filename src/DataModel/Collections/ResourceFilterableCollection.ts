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
   * @param {Iterable<IResource>} [resources] Initial collection of resources to filter.
   */
  public constructor(resources?: Iterable<T>) {
    super(resources);
  }

  /**
   * Obtains a collection of resources of a given type;
   * @param {string} iri Type of the resources.
   * @returns {ResourceFilterableCollection<T>}
   */
  public ofType(iri: string): ResourceFilterableCollection<T> {
    let result: ResourceFilterableCollection<T> = this;
    if (typeof iri === "string" && iri.length > 0) {
      result = this.narrowFiltersWith("type", iri) as ResourceFilterableCollection<T>;
    }

    return result;
  }

  /**
   * Obtains a collection of resources of a given Iri;
   * @param {string} iri Iri of the resources.
   * @returns {ResourceFilterableCollection<T>}
   */
  public ofIri(iri: string): ResourceFilterableCollection<T> {
    let result: ResourceFilterableCollection<T> = this;
    if (typeof iri === "string" && iri.length > 0) {
      result = this.narrowFiltersWith("iri", iri) as ResourceFilterableCollection<T>;
    }

    return result;
  }

  /**
   * Obtains a collection of resources being non blank nodes;
   * @returns {IResourceFilterableCollection<T>}
   */
  public nonBlank(): ResourceFilterableCollection<T> {
    return this.narrowFiltersWith("iri", new RegExp("[a-zA-Z][a-zA-Z0-9_]*:")) as ResourceFilterableCollection<T>;
  }

  /** @inheritdoc */
  protected createInstance(items: Iterable<T>): ResourceFilterableCollection<T> {
    return new ResourceFilterableCollection<T>(items);
  }
}
