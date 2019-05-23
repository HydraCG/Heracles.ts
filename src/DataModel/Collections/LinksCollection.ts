import { hydra } from "../../namespaces";
import { ILink } from "../ILink";
import ResourceFilterableCollection from "./ResourceFilterableCollection";

/**
 * Provides a collection of {@link ILink} that can be filtered with relevant criteria.
 * @class
 */
export default class LinksCollection extends ResourceFilterableCollection<ILink> {
  /**
   * Defines an empty links collection.
   * @constant {LinksCollection}
   */
  public static readonly empty = new LinksCollection();

  /**
   * Initializes a new instance of the {@link LinksCollection}
   * class with initial collections of links to filter.
   * @param {Iterable<ILink>} [links] Initial collection of links to filter.
   */
  public constructor(links?: Iterable<ILink>) {
    super(links);
  }

  /**
   * Obtains a collection of links of a given relation type.
   * @param {string} iri Expected relation type.
   * @returns {LinksCollection}
   */
  public withRelationOf(iri: string): LinksCollection {
    let result: LinksCollection = this;
    if (typeof iri === "string" && iri.length > 0) {
      result = this.narrowFiltersWith("relation", iri) as LinksCollection;
    }

    return result;
  }

  /**
   * Obtains a collection of operations being an Hydra TemplatedLink.
   * @returns {LinksCollection}
   */
  public withTemplate(): LinksCollection {
    return this.ofType(hydra.TemplatedLink) as LinksCollection;
  }

  protected createInstance(items: Iterable<ILink>): LinksCollection {
    return new LinksCollection(items);
  }
}
