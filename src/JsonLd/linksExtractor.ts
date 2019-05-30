import CollectionsCollection from "../DataModel/Collections/CollectionsCollection";
import LinksCollection from "../DataModel/Collections/LinksCollection";
import OperationsCollection from "../DataModel/Collections/OperationsCollection";
import TypesCollection from "../DataModel/Collections/TypesCollection";
import { IIriTemplate } from "../DataModel/IIriTemplate";
import { ILink } from "../DataModel/ILink";
import TemplatedLink from "../DataModel/TemplatedLink";
import { LinksPolicy } from "../LinksPolicy";
import { hydra } from "../namespaces";
import { JsonLdHelper as JsonLd } from "./JsonLdHelper";
import ProcessingState from "./ProcessingState";

const hydraLinks = {};
hydraLinks[hydra.first] = hydra.Link;
hydraLinks[hydra.last] = hydra.Link;
hydraLinks[hydra.previous] = hydra.Link;
hydraLinks[hydra.next] = hydra.Link;
hydraLinks[hydra.view] = hydra.Link;
hydraLinks[hydra.collection] = hydra.Link;
hydraLinks[hydra.search] = hydra.TemplatedLink;

function isLink(type) {
  return type === hydra.Link || type === hydra.TemplatedLink;
}

function tryGetPredicateLinkType(predicate: string, processingState: ProcessingState): string {
  let result = hydraLinks[predicate] || null;
  if (!result) {
    const predicateDefinition = processingState.findRawResource(predicate);
    if (!!predicateDefinition && predicateDefinition["@type"]) {
      result = predicateDefinition["@type"].find(isLink) || null;
    }
  }

  return result;
}

function tryGetResourceLinkType(iri: string, type: string[], processingState: ProcessingState): string {
  let result = null;
  if (!!type) {
    result = type.find(isLink) || null;
  }

  if (!result && iri.charAt(0) !== "_") {
    if (
      processingState.linksPolicy >= LinksPolicy.SameRoot &&
      iri.indexOf(processingState.rootUrl) === 0 &&
      iri !== processingState.rootUrl
    ) {
      result = hydra.Link;
    }

    if (!result && processingState.linksPolicy >= LinksPolicy.AllHttp && iri.indexOf("http") === 0) {
      result = hydra.Link;
    }

    if (!result && processingState.linksPolicy >= LinksPolicy.All) {
      result = hydra.Link;
    }
  }

  return result;
}

function internalLinksExtractor(resources: any[], processingState: ProcessingState): ILink[] {
  const links = [];
  const originalResource = processingState.processedObject;
  for (const predicate of JsonLd.validKeys(originalResource)) {
    const linkType = tryGetPredicateLinkType(predicate, processingState);
    const possibleLinkedResources = originalResource[predicate].filter(_ => !!_["@id"]);
    for (const targetResource of possibleLinkedResources) {
      const rawTargetResource = processingState.findRawResource(targetResource["@id"]) || targetResource;
      const resourceLinkType =
        linkType || tryGetResourceLinkType(rawTargetResource["@id"], rawTargetResource["@type"], processingState);
      if (!!resourceLinkType) {
        const target = processingState.getVisitedResource(targetResource["@id"]) || {
          iri: targetResource["@id"],
          type: TypesCollection.empty
        };

        processingState.markAsOwned(predicate);
        let link = {
          baseUrl: processingState.baseUrl,
          collections: new CollectionsCollection(),
          iri: targetResource["@id"],
          links: LinksCollection.empty,
          operations: OperationsCollection.empty,
          relation: predicate,
          supportedOperations: OperationsCollection.empty,
          target,
          type: new TypesCollection([resourceLinkType])
        };
        if (resourceLinkType === hydra.TemplatedLink) {
          processingState.markAsOwned(targetResource["@id"]);
          link = new TemplatedLink(link, target as IIriTemplate);
        }

        links.push(link);
      }
    }
  }

  return links;
}

export const linksExtractor = (resources, processingState) => {
  return new LinksCollection(internalLinksExtractor(resources, processingState));
};
