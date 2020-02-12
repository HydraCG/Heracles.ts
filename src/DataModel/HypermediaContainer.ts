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
import { IPartialCollectionView } from "./IPartialCollectionView";
import { IResource } from "./IResource";
import { IStatement } from "./IStatement";

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
  private readonly response: Response;
  private readonly collection: ICollection;

  /** @inheritDoc */
  public readonly iri: string;

  /** @inheritDoc */
  public readonly type: TypesCollection;

  /** @inheritDoc */
  public readonly collections: CollectionsCollection;

  /** @inheritDoc */
  public readonly operations: OperationsCollection;

  /** @inheritDoc */
  public readonly links: LinksCollection;

  /** @inheritDoc */
  public get headers(): IHeaders {
    return this.response.headers;
  }

  /** @inheritDoc */
  public get url(): string {
    return this.response.url;
  }

  /** @inheritDoc */
  public get status(): number {
    return this.response.status;
  }

  /** @inheritDoc */
  public get body(): ReadableStream<Uint8Array> | null {
    return this.response.body;
  }

  /** @inheritDoc */
  public get bodyUsed(): boolean {
    return this.response.bodyUsed;
  }

  /** @inheritDoc */
  public get view(): IPartialCollectionView | null {
    return !!this.collection ? this.collection.view : null;
  }

  /** @inheritDoc */
  public get members(): ResourceFilterableCollection<IResource> {
    return !!this.collection ? this.collection.members : null;
  }

  /** @inheritDoc */
  public get manages(): ResourceFilterableCollection<IStatement> {
    return !!this.collection ? this.collection.manages : null;
  }

  /** @inheritDoc */
  public get totalItems(): number {
    return !!this.collection ? this.collection.totalItems : 0;
  }

  /**
   * Initializes a new instance of the {@link HypermediaContainer} class.
   * @param {Response} response Raw response.
   * @param {IResource} rootResource Main resource associated with the requested Url.
   * @param {Iterable<IResource>} hypermedia Hypermedia controls to be stored within this container.
   */
  public constructor(response: Response, rootResource: IResource, hypermedia: Iterable<IResource>) {
    super(hypermedia);
    this.response = response;
    this.iri = rootResource.iri;
    this.type = rootResource.type;
    this.operations = (rootResource as IHydraResource).operations;
    this.collections = new CollectionsCollection(discoverCollectionsFrom(hypermedia));
    this.links = (rootResource as IHydraResource).links;
    const collection = rootResource as ICollection;
    if (!!collection.members) {
      this.collection = collection;
    }
  }

  /** @inheritDoc */
  public getIterator(): IPartialCollectionIterator {
    return !!this.collection ? this.collection.getIterator() : null;
  }

  /** @inheritDoc */
  public arrayBuffer(): Promise<ArrayBuffer> {
    return this.response.arrayBuffer();
  }

  /** @inheritDoc */
  public blob(): Promise<Blob> {
    return this.response.blob();
  }

  /** @inheritDoc */
  public json(): Promise<any> {
    return this.response.json();
  }

  /** @inheritDoc */
  public text(): Promise<string> {
    return this.response.text();
  }
}
