import { hydra, rdf } from "../namespaces";
import ProcessingState from "./ProcessingState";

const propertyDomain = {};
propertyDomain[hydra.entrypoint] = hydra.ApiDocumentation;
propertyDomain[hydra.supportedClass] = hydra.ApiDocumentation;
propertyDomain[hydra.supportedProperty] = hydra.Class;
propertyDomain[hydra.readonly] = hydra.SupportedProperty;
propertyDomain[hydra.writeonly] = hydra.SupportedProperty;
propertyDomain[hydra.operation] = hydra.Resource;
propertyDomain[hydra.method] = hydra.Operation;
propertyDomain[hydra.expects] = hydra.Operation;
propertyDomain[hydra.returns] = hydra.Operation;
propertyDomain[hydra.statusCodes] = hydra.Status;
propertyDomain[hydra.member] = hydra.Collection;
propertyDomain[hydra.view] = hydra.Resource;
propertyDomain[hydra.totalItems] = hydra.Collection;
propertyDomain[hydra.first] = hydra.Resource;
propertyDomain[hydra.last] = hydra.Resource;
propertyDomain[hydra.next] = hydra.Resource;
propertyDomain[hydra.previous] = hydra.Resource;
propertyDomain[hydra.mapping] = hydra.IriTemplateMapping;
propertyDomain[hydra.variable] = hydra.IriTemplateMapping;

const propertyRange = {};
propertyRange[hydra.apiDocumentation] = hydra.ApiDocumentation;
propertyRange[hydra.entrypoint] = hydra.Resource;
propertyRange[hydra.supportedClass] = hydra.Class;
propertyRange[hydra.statusCodes] = hydra.Status;
propertyRange[hydra.supportedProperty] = hydra.SupportedProperty;
propertyRange[hydra.property] = rdf.Property;
propertyRange[hydra.supportedOperation] = hydra.Operation;
propertyRange[hydra.operation] = hydra.Operation;
propertyRange[hydra.expects] = hydra.Class;
propertyRange[hydra.returns] = hydra.Class;
propertyRange[hydra.member] = hydra.Resource;
propertyRange[hydra.view] = hydra.Resource;
propertyRange[hydra.first] = hydra.Resource;
propertyRange[hydra.next] = hydra.Resource;
propertyRange[hydra.previous] = hydra.Resource;
propertyRange[hydra.search] = hydra.IriTemplate;
propertyRange[hydra.variableRepresentation] = hydra.VariableRepresentation;
propertyRange[hydra.mapping] = hydra.IriTemplateMapping;

export default function isOfType(expectedType: string, processingState: ProcessingState): boolean {
  return isOfClass(expectedType, processingState)
    || isInDomainOfPredicate(expectedType, processingState)
    || isInRangeOfPredicate(expectedType, processingState);
}

function isOfClass(expectedType: string, processingState: ProcessingState): boolean {
  return processingState.processedObject["@type"] instanceof Array
    && processingState.processedObject["@type"].indexOf(expectedType) !== -1;
}

function isInDomainOfPredicate(expectedType: string, processingState: ProcessingState): boolean {
  for (const property of Object.keys(processingState.processedObject)) {
    const domain = propertyDomain[property];
    if (!!domain && domain === expectedType) {
      return true;
    }
  }

  return false;
}

function isInRangeOfPredicate(expectedType: string, processingState: ProcessingState): boolean {
  const ownerResource = processingState.payload.find(resource => resource["@id"] === processingState.parentIri);
  if (!ownerResource) {
    return false;
  }

  for (const property of Object.keys(ownerResource)) {
    const range = propertyRange[property];
    if (!!range && range === expectedType
      && ownerResource[property].find(resource => resource["@id"] === processingState.processedObject["@id"])) {
      return true;
    }
  }


  return false;
}