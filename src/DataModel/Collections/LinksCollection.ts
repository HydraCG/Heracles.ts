import { hydra } from "../../namespaces";
import { ILink } from "../ILink";
import OperationsCollection from "./OperationsCollection";
import ResourceFilterableCollection from "./ResourceFilterableCollection";

/**
 * Provides a collection of {@link ILink} that can be filtered with relevant criteria.
 * @class
 */
export default class LinksCollection extends ResourceFilterableCollection<ILink> {
  /**
   * Initializes a new instance of the {@link LinksCollection}
   * class with initial collections of operations to filter.
   * @param operations {Iterable<ILink>} Initial collection of operations to filter.
   */
  public constructor(operations: Iterable<ILink>) {
    super(operations);
  }

  /**
   * Obtains a collection of links of a given relation type.
   * @param iri {string} Expected relation type.
   * @returns {OperationsCollection}
   */
  public withRelationOf(iri: string): LinksCollection {
    return this.narrowFiltersWith("relation", iri) as LinksCollection;
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
