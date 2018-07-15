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

async function getPart(
  state: IState,
  link: ILink,
  client: IHydraClient,
  collectionIri: string
): Promise<Iterable<IResource>> {
  const collectionPart = await client.getResource(link.target);
  const page = collectionPart.hypermedia.collections.ofIri(collectionIri).first();
  update(state, page.view.iri, page.view.links);
  return page.members;
}

function getTargetOf(link: ILink) {
  return link != null ? link.target.iri : null;
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
    const state = createStateFrom(collection.iri, collection.view.links);
    const result = {
      getFirstPart: () => getPart(state, state.first, client, collection.iri),
      getLastPart: () => getPart(state, state.last, client, collection.iri),
      getNextPart: () => getPart(state, state.next, client, collection.iri),
      getPreviousPart: () => getPart(state, state.prev, client, collection.iri),
      type: new TypesCollection([hydra.PartialCollectionView])
    };
    Object.defineProperty(result, "current", { get: () => state.current });
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
