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
hydraLinks[hydra.freetextQuery] = hydra.TemplatedLink;
hydraLinks[hydra.search] = hydra.TemplatedLink;

const standaloneControls = {};
standaloneControls[hydra.view] = true;
standaloneControls[hydra.collection] = true;
standaloneControls[hydra.supportedClass] = true;
standaloneControls[hydra.supportedOperation] = true;
standaloneControls[hydra.supportedProperty] = true;
standaloneControls[hydra.entrypoint] = true;
standaloneControls[hydra.manages] = true;
standaloneControls[hydra.member] = true;
standaloneControls[hydra.first] = true;
standaloneControls[hydra.last] = true;
standaloneControls[hydra.next] = true;
standaloneControls[hydra.previous] = true;
standaloneControls[hydra.mapping] = true;
standaloneControls[hydra.variableRepresentation] = true;
standaloneControls[hydra.expects] = true;
standaloneControls[hydra.returns] = true;
standaloneControls[hydra.subject] = true;
standaloneControls[hydra.property] = true;
standaloneControls[hydra.object] = true;
standaloneControls[hydra.operation] = true;

function isLink(type) {
  return type === hydra.Link || type === hydra.TemplatedLink;
}

function isStandaloneControl(predicate: string): boolean {
  return !!standaloneControls[predicate];
}

function tryGetPredicateLinkType(predicate: string, processingState: ProcessingState, meta: any): string {
  meta.title = "";
  meta.description = "";
  let result = hydraLinks[predicate] || null;
  if (!result) {
    const predicateDefinition = processingState.findRawResource(predicate);
    if (!!predicateDefinition && predicateDefinition["@type"]) {
      result = predicateDefinition["@type"].find(isLink) || null;
      meta.title = !!predicateDefinition[hydra.title] ? predicateDefinition[hydra.title][0]["@value"] : meta.title;
      meta.description = !!predicateDefinition[hydra.description]
        ? predicateDefinition[hydra.description][0]["@value"]
        : meta.description;
    }
  }

  return result;
}

function tryGetResourceLinkType(iri: string, type: string[], processingState: ProcessingState): string {
  let result = null;
  if (!!type) {
    result = !!type.find(_ => _ === hydra.IriTemplate) ? hydra.TemplatedLink : null;
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
  const possiblePredicates = JsonLd.validKeys(originalResource).filter(
    _ => originalResource[_] instanceof Object && !isStandaloneControl(_)
  );
  for (const predicate of possiblePredicates) {
    const meta: any = {};
    const linkType = tryGetPredicateLinkType(predicate, processingState, meta);
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
          description: meta.description,
          iri: predicate,
          links: LinksCollection.empty,
          operations: OperationsCollection.empty,
          relation: predicate,
          supportedOperations: OperationsCollection.empty,
          target,
          title: meta.title,
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
