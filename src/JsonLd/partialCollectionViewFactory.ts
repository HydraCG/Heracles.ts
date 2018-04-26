import LinksCollection from "../DataModel/Collections/LinksCollection";
import TypesCollection from "../DataModel/Collections/TypesCollection";
import { ICollection } from "../DataModel/ICollection";
import { ILink } from "../DataModel/ILink";
import { IResource } from "../DataModel/IResource";
import { IHydraClient } from "../IHydraClient";
import { hydra } from "../namespaces";
import ProcessingState from "./ProcessingState";

interface IState {
  current?: string;
  first?: ILink;
  next?: ILink;
  prev?: ILink;
  last?: ILink;
}

function createStateFrom(iri: string, links: LinksCollection): IState {
  return update({}, iri, links);
}

function update(state: IState, iri: string, links: LinksCollection): IState {
  state.current = iri;
  state.first = links.withRelationOf(hydra.first).first();
  state.next = links.withRelationOf(hydra.next).first();
  state.prev = links.withRelationOf(hydra.previous).first();
  state.last = links.withRelationOf(hydra.last).first();
  return state;
}

async function getPage(state: IState, link: ILink, client: IHydraClient): Promise<Iterable<IResource>> {
  const collectionPart = await client.getResource(link.target);
  const page = collectionPart.hypermedia.members;
  update(state, collectionPart.hypermedia.iri, collectionPart.hypermedia.links);
  return page;
}

export function partialCollectionViewFactory(
  resource: IResource,
  client: IHydraClient,
  processingState: ProcessingState
) {
  const target = resource as any;
  const collection = resource as ICollection;
  const viewIri = processingState.processedObject[hydra.view]
    ? processingState.processedObject[hydra.view][0]["@id"]
    : null;
  const getView = () => {
    const state = createStateFrom(collection.iri, collection.links);
    const result = {
      getFirstPage: () => getPage(state, state.first, client),
      getLastPage: () => getPage(state, state.last, client),
      getNextPage: () => getPage(state, state.next, client),
      getPreviousPage: () => getPage(state, state.prev, client),
      type: new TypesCollection([hydra.PartialCollectionView])
    };
    Object.defineProperty(result, "iri", { get: () => state.current });
    Object.defineProperty(result, "first", { get: () => state.first });
    Object.defineProperty(result, "next", { get: () => state.next });
    Object.defineProperty(result, "previous", { get: () => state.prev });
    Object.defineProperty(result, "last", { get: () => state.last });
    Object.defineProperty(result, "hasNextPage", { get: () => !!state.next });
    Object.defineProperty(result, "hasPreviousPage", { get: () => !!state.prev });
    return result;
  };
  Object.defineProperty(target, "getView", { value: viewIri ? getView : () => null, writable: false });
  return resource;
}
