import OperationsCollection from "../DataModel/Collections/OperationsCollection";
import { IIriTemplate } from "../DataModel/IIriTemplate";
import { ILink } from "../DataModel/ILink";
import { IOperation } from "../DataModel/IOperation";
import TemplatedOperation from "../DataModel/TemplatedOperation";
import { hydra } from "../namespaces";
import { JsonLdHelper as JsonLd } from "./JsonLdHelper";
import ProcessingState from "./ProcessingState";

function onTemplateMaterialized(
  processingState: ProcessingState,
  template: IIriTemplate,
  linkIri: string,
  operations: IOperation[]
): void {
  tryCreateOperationFrom(processingState, processingState.getVisitedResource(linkIri), template, operations);
}

function onLinkMaterialized(
  processingState: ProcessingState,
  link: ILink,
  templateIri: string,
  operations: IOperation[]
) {
  tryCreateOperationFrom(processingState, link, processingState.getVisitedResource(templateIri), operations);
}

function tryCreateOperationFrom(
  processingState: ProcessingState,
  link: ILink,
  template: IIriTemplate,
  operations: IOperation[]
) {
  if (!!link && !!template) {
    processingState.markAsOwned(link.iri);
    processingState.markAsOwned(template.iri);
    if (link !== null && link.type.contains(hydra.TemplatedLink)) {
      for (const linkOperation of link.supportedOperations) {
        processingState.markAsOwned(linkOperation.iri);
        operations.push(new TemplatedOperation(linkOperation, template));
      }
    }
  }
}

export const templatedOperationsExtractor = (operations: IOperation[], processingState: ProcessingState) => {
  for (const link of JsonLd.validKeys(processingState.processedObject, true)) {
    for (const value of processingState.processedObject[link]) {
      const template = processingState.findRawResource(value["@id"]);
      let processedTemplate: IIriTemplate = null;
      if (!!template && template["@type"] && template["@type"].indexOf(hydra.IriTemplate) !== -1) {
        processedTemplate = processingState.getVisitedResource(template["@id"]);
        if (!processedTemplate) {
          processingState.notifyMaterialized(template["@id"], (state, resource) =>
            onTemplateMaterialized(state, resource as IIriTemplate, link, operations)
          );
        }

        const processedLink = processingState.getVisitedResource(link);
        if (!processedLink) {
          processingState.notifyMaterialized(link, (state, resource) =>
            onLinkMaterialized(state, resource as ILink, template["@id"], operations)
          );
        }

        tryCreateOperationFrom(processingState, processedLink, processedTemplate, operations);
      }
    }
  }

  return new OperationsCollection(operations);
};
