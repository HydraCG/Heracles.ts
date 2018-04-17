import LinksCollection from "../DataModel/Collections/LinksCollection";
import TypesCollection from "../DataModel/Collections/TypesCollection";
import { ICollection } from "../DataModel/ICollection";
import { ILink } from "../DataModel/ILink";
import { IPartialCollectionPage } from "../DataModel/IPartialCollectionPage";
import { IResource } from "../DataModel/IResource";
import { IHydraClient } from "../IHydraClient";
import { hydra } from "../namespaces";
import ProcessingState from "./ProcessingState";

interface IState {
  next?: ILink;
  prev?: ILink;
}

function createStateFrom(links: LinksCollection): IState {
  return update({}, links);
}

function update(state: IState, links: LinksCollection): IState {
  state.next = links.withRelationOf(hydra.next).first();
  state.prev = links.withRelationOf(hydra.previous).first();
  return state;
}

async function getPage(state: IState, link: ILink, client: IHydraClient): Promise<IPartialCollectionPage> {
  const collectionPart = await client.getResource(link.target);
  const page = { members: collectionPart.hypermedia.members };
  update(state, collectionPart.hypermedia.links);
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
    const state = createStateFrom(collection.links);
    const result = {
      getNextPage: () => getPage(state, state.next, client),
      getPreviousPage: () => getPage(state, state.prev, client),
      iri: viewIri,
      type: new TypesCollection([hydra.PartialCollectionView])
    };
    Object.defineProperty(result, "hasNextPage", { get: () => !!state.next });
    Object.defineProperty(result, "hasPreviousPage", { get: () => !!state.prev });
    return result;
  };
  Object.defineProperty(target, "getView", { value: viewIri ? getView : () => null, writable: false });
  return resource;
}
