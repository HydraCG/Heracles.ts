import CollectionsCollection from "./Collections/CollectionsCollection";
import LinksCollection from "./Collections/LinksCollection";
import OperationsCollection from "./Collections/OperationsCollection";
import ResourceFilterableCollection from "./Collections/ResourceFilterableCollection";
import TypesCollection from "./Collections/TypesCollection";
import { ICollection } from "./ICollection";
import { IHeaders } from "./IHeaders";
import { IHydraResource } from "./IHydraResource";
import { IHypermediaContainer } from "./IHypermediaContainer";
import { IPartialCollectionIterator } from "./IPartialCollectionIterator";
import { IResource } from "./IResource";

function addTo(collection: ICollection[], hashList: string[], item: ICollection): void {
  if (hashList.indexOf(item.iri) === -1) {
    collection.push(item);
    hashList.push(item.iri);
  }
}

function discoverCollectionsFrom(hypermedia: Iterable<IResource>): ICollection[] {
  const collectionIris: string[] = [];
  const collections: ICollection[] = [];
  for (const control of hypermedia) {
    if (control.type.isCollection) {
      addTo(collections, collectionIris, control as ICollection);
    } else if (!!(control as IHydraResource).collections) {
      for (const linkedCollection of (control as IHydraResource).collections) {
        addTo(collections, collectionIris, linkedCollection);
      }
    }
  }

  return collections;
}

/**
 * Provides a default implementation of the {@link IHypermediaContainer} interface.
 * @class
 */
export default class HypermediaContainer extends ResourceFilterableCollection<IResource>
  implements IHypermediaContainer {
  /** @inheritDoc */
  public readonly headers: IHeaders;

  /** @inheritDoc */
  public readonly iri: string;

  /** @inheritDoc */
  public readonly type: TypesCollection;

  /** @inheritDoc */
  public readonly view?: IHydraResource;

  /** @inheritDoc */
  public readonly members?: ResourceFilterableCollection<IResource>;

  /** @inheritDoc */
  public readonly collections: CollectionsCollection;

  /** @inheritDoc */
  public readonly operations: OperationsCollection;

  /** @inheritDoc */
  public readonly links: LinksCollection;

  /**
   * Initializes a new instance of the {@link HypermediaContainer} class.
   * @param {IResource} rootResource Main resource associated with the requested Url.
   * @param {Iterable<IResource>} hypermedia Hypermedia controls to be stored within this container.
   */
  public constructor(headers: IHeaders, rootResource: IResource, hypermedia: Iterable<IResource>) {
    super(hypermedia);
    this.headers = headers;
    this.iri = rootResource.iri;
    this.type = rootResource.type;
    this.operations = (rootResource as IHydraResource).operations;
    this.collections = new CollectionsCollection(discoverCollectionsFrom(hypermedia));
    this.links = (rootResource as IHydraResource).links;
    const collection = rootResource as ICollection;
    if (collection != null) {
      this.members = collection.members;
      this.view = collection.view;
      Object.defineProperty(this, "getIterator", { value: collection.getIterator, writable: false });
    }
  }

  /** @inheritDoc */
  public getIterator?(): IPartialCollectionIterator;
}
