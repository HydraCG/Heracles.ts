import LinksCollection from "../DataModel/Collections/LinksCollection";
import OperationsCollection from "../DataModel/Collections/OperationsCollection";
import TypesCollection from "../DataModel/Collections/TypesCollection";
import TemplatedLink from "../DataModel/TemplatedLink";
import { hydra } from "../namespaces";

const hydraLinks = {};
hydraLinks[hydra.first] = hydra.Link;
hydraLinks[hydra.last] = hydra.Link;
hydraLinks[hydra.previous] = hydra.Link;
hydraLinks[hydra.next] = hydra.Link;
hydraLinks[hydra.view] = hydra.Link;
hydraLinks[hydra.search] = hydra.TemplatedLink;

export const linksExtractor = (resources, context) => {
  const links = [];
  const originalResource = context.payload.find(entry => entry["@id"] === context.currentResource.iri) || {};
  for (const predicate of Object.keys(originalResource)) {
    let linkType = hydraLinks[predicate] || null;
    if (!linkType) {
      const predicateDefinition = context.payload.find(entry => entry["@id"] === predicate);
      if (!!predicateDefinition && predicateDefinition["@type"]) {
        linkType =
          predicateDefinition["@type"].find(type => type === hydra.Link || type === hydra.TemplatedLink) || null;
      }
    }

    if (!!linkType) {
      for (let target of originalResource[predicate]) {
        context.forbiddenHypermedia.push(predicate);
        let link = {
          baseUrl: context.baseUrl,
          iri: predicate,
          links: new LinksCollection([]),
          operations: new OperationsCollection([]),
          target: target["@value"] || target["@id"],
          type: new TypesCollection(linkType === hydra.TemplatedLink ? [hydra.Link, hydra.TemplatedLink] : [hydra.Link])
        };
        if (linkType === hydra.TemplatedLink) {
          context.forbiddenHypermedia.push(target["@id"]);
          target = context.resourceMap[target["@id"]];
          link = new TemplatedLink(link, target);
        }

        links.push(link);
      }
    }
  }

  return new LinksCollection(links);
};
