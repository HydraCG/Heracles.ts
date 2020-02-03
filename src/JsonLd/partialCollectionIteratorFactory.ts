import ResourceFilterableCollection from "../DataModel/Collections/ResourceFilterableCollection";
import TypesCollection from "../DataModel/Collections/TypesCollection";
import { ICollection } from "../DataModel/ICollection";
import { IPartialCollectionView } from "../DataModel/IPartialCollectionView";
import { IResource } from "../DataModel/IResource";
import { IHydraClient } from "../IHydraClient";
import { hydra } from "../namespaces";
import ProcessingState from "./ProcessingState";

interface IBrowsableCollection {
  members?: ResourceFilterableCollection<IResource>;
  view?: IPartialCollectionView;
}

interface IState {
  current?: string;
  first?: IResource;
  next?: IResource;
  prev?: IResource;
  last?: IResource;
}

function createStateFrom(iri: string, view: IPartialCollectionView): IState {
  return update({}, iri, view);
}

function update(state: IState, iri: string, view: IPartialCollectionView): IState {
  state.current = iri;
  state.first = view.first;
  state.next = view.next;
  state.prev = view.previous;
  state.last = view.last;
  return state;
}

async function getPart(
  state: IState,
  link: IResource,
  client: IHydraClient
): Promise<Iterable<IResource>> {
  const collectionPart = await client.getResource(link);
  let page: IBrowsableCollection = collectionPart.hypermedia;
  if (!page.view) {
    page = collectionPart.hypermedia.where(_ => !!(_ as ICollection).view).first() as ICollection;
  }

  update(state, page.view.iri, page.view);
  return page.members;
}

function getTargetOf(link: IResource) {
  return !!link ? link.iri : null;
}

export function partialCollectionIteratorFactory(
  resource: IResource,
  client: IHydraClient,
  processingState: ProcessingState
) {
  const target = resource as any;
  const collection = resource as ICollection;
  const viewIri = processingState.processedObject[hydra.view]
    ? processingState.processedObject[hydra.view][0]["@id"]
    : null;
  const getIterator = () => {
    const state = createStateFrom(collection.iri, collection.view);
    const result = {
      getFirstPart: () => getPart(state, state.first, client),
      getLastPart: () => getPart(state, state.last, client),
      getNextPart: () => getPart(state, state.next, client),
      getPreviousPart: () => getPart(state, state.prev, client),
      type: new TypesCollection([hydra.PartialCollectionView])
    };
    Object.defineProperty(result, "currentPartIri", { get: () => state.current });
    Object.defineProperty(result, "firstPartIri", { get: () => getTargetOf(state.first) });
    Object.defineProperty(result, "nextPartIri", { get: () => getTargetOf(state.next) });
    Object.defineProperty(result, "previousPartIri", { get: () => getTargetOf(state.prev) });
    Object.defineProperty(result, "lastPartIri", { get: () => getTargetOf(state.last) });
    Object.defineProperty(result, "hasNextPart", { get: () => !!state.next });
    Object.defineProperty(result, "hasPreviousPart", { get: () => !!state.prev });
    return result;
  };
  Object.defineProperty(target, "getIterator", { value: viewIri ? getIterator : () => null, writable: false });
  return resource;
}
