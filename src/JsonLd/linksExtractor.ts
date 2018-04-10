import LinksCollection from "../DataModel/Collections/LinksCollection";
import OperationsCollection from "../DataModel/Collections/OperationsCollection";
import ResourceFilterableCollection from "../DataModel/Collections/ResourceFilterableCollection";
import TypesCollection from "../DataModel/Collections/TypesCollection";
import { ICollection } from "../DataModel/ICollection";
import TemplatedLink from "../DataModel/TemplatedLink";
import { hydra } from "../namespaces";

const hydraLinks = {};
hydraLinks[hydra.first] = hydra.Link;
hydraLinks[hydra.last] = hydra.Link;
hydraLinks[hydra.previous] = hydra.Link;
hydraLinks[hydra.next] = hydra.Link;
hydraLinks[hydra.view] = hydra.Link;
hydraLinks[hydra.search] = hydra.TemplatedLink;

export const linksExtractor = (resources, processingState) => {
  const links = [];
  const originalResource =
    processingState.payload.find(entry => entry["@id"] === processingState.currentResource.iri) || {};
  for (const predicate of Object.keys(originalResource)) {
    let linkType = hydraLinks[predicate] || null;
    if (!linkType) {
      const predicateDefinition = processingState.payload.find(entry => entry["@id"] === predicate);
      if (!!predicateDefinition && predicateDefinition["@type"]) {
        linkType =
          predicateDefinition["@type"].find(type => type === hydra.Link || type === hydra.TemplatedLink) || null;
      }
    }

    if (!!linkType) {
      for (const targetResource of originalResource[predicate]) {
        const targetIri = targetResource["@value"] || targetResource["@id"];
        const target = processingState.resourceMap[targetIri] || { iri: targetIri, type: new TypesCollection([]) };
        processingState.forbiddenHypermedia.push(predicate);
        let link = {
          baseUrl: processingState.baseUrl,
          collections: new ResourceFilterableCollection<ICollection>([]),
          iri: predicate,
          links: new LinksCollection([]),
          operations: new OperationsCollection([]),
          relation: predicate,
          target,
          type: new TypesCollection(linkType === hydra.TemplatedLink ? [hydra.TemplatedLink] : [hydra.Link])
        };
        if (linkType === hydra.TemplatedLink) {
          processingState.forbiddenHypermedia.push(targetResource["@id"]);
          link = new TemplatedLink(link, target);
        }

        links.push(link);
      }
    }
  }

  return new LinksCollection(links);
};
