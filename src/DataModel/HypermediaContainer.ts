import { hydra } from "../namespaces";
import LinksCollection from "./Collections/LinksCollection";
import OperationsCollection from "./Collections/OperationsCollection";
import ResourceFilterableCollection from "./Collections/ResourceFilterableCollection";
import { ICollection } from "./ICollection";
import { IHydraResource } from "./IHydraResource";
import { IHypermediaContainer } from "./IHypermediaContainer";
import { IPartialCollectionIterator } from "./IPartialCollectionIterator";
import { IResource } from "./IResource";

/**
 * Provides a default implementation of the {@link IHypermediaContainer} interface.
 * @class
 */
export default class HypermediaContainer extends ResourceFilterableCollection<IResource>
  implements IHypermediaContainer {
  public readonly iri: string;

  public readonly view?: IHydraResource;

  public readonly members?: ResourceFilterableCollection<IResource>;

  public readonly collections: ResourceFilterableCollection<ICollection>;

  public readonly operations: OperationsCollection;

  public readonly links: LinksCollection;

  /**
   * Initializes a new instance of the {@link HypermediaContainer} class.
   * @param {string} iri Iri of the resource obtained.
   * @param {Iterable<IResource>} items Hypermedia controls to be stored within this container.
   * @param {OperationsCollection} operations Operations available on the container.
   * @param {LinksCollection} links Links available on the container.
   * @param {ResourceFilterableCollection<IResource>} members Optional Hydra collection members in case
   *                                                          container is a collection.
   */
  public constructor(
    iri: string,
    items: Iterable<IResource>,
    operations: OperationsCollection,
    links: LinksCollection,
    collection?: ICollection
  ) {
    super(items);
    const itemsArray = Array.from(items);
    const explicitlyTypedCollections: ICollection[] = itemsArray
      .filter(control => control.type.contains(hydra.Collection))
      .map(control => control as ICollection);
    const linkedCollections: ICollection[] = Array.prototype.concat(
      ...itemsArray
        .filter((control: any) => !!control.collections)
        .map((control: IHydraResource) => Array.from(control.collections))
    );
    this.iri = iri;
    this.operations = operations;
    this.collections = new ResourceFilterableCollection<ICollection>(
      explicitlyTypedCollections.concat(linkedCollections)
    );
    this.links = links;
    if (collection != null) {
      this.members = collection.members;
      this.view = collection.view;
      Object.defineProperty(this, "getIterator", { value: collection.getIterator, writable: false });
    }
  }

  public getIterator?(): IPartialCollectionIterator;
}
