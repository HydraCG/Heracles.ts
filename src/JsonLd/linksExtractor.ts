import LinksCollection from "../DataModel/Collections/LinksCollection";
import OperationsCollection from "../DataModel/Collections/OperationsCollection";
import ResourceFilterableCollection from "../DataModel/Collections/ResourceFilterableCollection";
import TypesCollection from "../DataModel/Collections/TypesCollection";
import { ICollection } from "../DataModel/ICollection";
import { IIriTemplate } from "../DataModel/IIriTemplate";
import { ILink } from "../DataModel/ILink";
import TemplatedLink from "../DataModel/TemplatedLink";
import { hydra } from "../namespaces";
import ProcessingState from "./ProcessingState";

const hydraLinks = {};
hydraLinks[hydra.first] = hydra.Link;
hydraLinks[hydra.last] = hydra.Link;
hydraLinks[hydra.previous] = hydra.Link;
hydraLinks[hydra.next] = hydra.Link;
hydraLinks[hydra.view] = hydra.Link;
hydraLinks[hydra.search] = hydra.TemplatedLink;

function getHydraLinkType(predicate: string, processingState: ProcessingState): string {
  let result = hydraLinks[predicate] || null;
  if (!result) {
    const predicateDefinition = processingState.payload.find(entry => entry["@id"] === predicate);
    if (!!predicateDefinition && predicateDefinition["@type"]) {
      result = predicateDefinition["@type"].find(type => type === hydra.Link || type === hydra.TemplatedLink) || null;
    }
  }

  return result;
}

function internalLinksExtractor(resources: any[], processingState: ProcessingState, links: ILink[]): void {
  const originalResource = processingState.processedObject;
  for (const predicate of Object.keys(originalResource)) {
    const linkType = getHydraLinkType(predicate, processingState);
    if (!!linkType) {
      for (const targetResource of originalResource[predicate]) {
        const targetIri = targetResource["@value"] || targetResource["@id"];
        const target = processingState.resourceMap[targetIri] || { iri: targetIri, type: new TypesCollection([]) };
        processingState.forbiddenHypermedia.push(predicate);
        let link = {
          baseUrl: processingState.baseUrl,
          collections: new ResourceFilterableCollection<ICollection>([]),
          iri: targetIri,
          links: new LinksCollection([]),
          operations: new OperationsCollection([]),
          relation: predicate,
          target,
          type: new TypesCollection(linkType === hydra.TemplatedLink ? [hydra.TemplatedLink] : [hydra.Link])
        };
        if (linkType === hydra.TemplatedLink) {
          processingState.forbiddenHypermedia.push(targetResource["@id"]);
          link = new TemplatedLink(link, target as IIriTemplate);
        }

        links.push(link);
      }
    }
  }
}

export const linksExtractor = (resources, processingState) => {
  const links: ILink[] = [];
  internalLinksExtractor(resources, processingState, links);
  return new LinksCollection(links);
};
