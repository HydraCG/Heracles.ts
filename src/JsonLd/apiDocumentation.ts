import ResourceFilterableCollection from "../DataModel/Collections/ResourceFilterableCollection";
import { IClass } from "../DataModel/IClass";
import { IOperation } from "../DataModel/IOperation";
import { IDictionary } from "../IDictionary";
import { hydra } from "../namespaces";
import { IPropertyMapping } from "./IPropertyMapping";
import ProcessingState from "./ProcessingState";
import { templatedOperationsExtractor } from "./templatedOperationsExtractor";

function operationsTargetExtractor(operations: IOperation[], processingState: ProcessingState) {
  for (const operation of operations) {
    (operation as any).target = {
      iri: processingState.currentResource.iri,
      type: processingState.currentResource.type
    };
  }

  return templatedOperationsExtractor(operations, processingState);
}

export function apiDocumentation(mappings: IDictionary<IPropertyMapping>): IDictionary<IPropertyMapping> {
  mappings[hydra.supportedClass] = {
    default: supportedClasses => new ResourceFilterableCollection<IClass>(supportedClasses),
    propertyName: "supportedClasses",
    required: true,
    type: [hydra.ApiDocumentation as string]
  };
  mappings[hydra.entrypoint] = {
    default: entryPoints => (entryPoints.length > 0 ? entryPoints[0].iri : ""),
    propertyName: "entryPoint",
    required: true,
    type: [hydra.ApiDocumentation as string]
  };

  mappings[hydra.readable] = {
    default: false,
    propertyName: "readable",
    required: true,
    type: [hydra.SupportedProperty as string]
  };
  mappings[hydra.writeable] = {
    default: false,
    propertyName: "writable",
    required: true,
    type: [hydra.SupportedProperty as string]
  };

  mappings[hydra.supportedOperation] = {
    default: operationsTargetExtractor,
    propertyName: "supportedOperations",
    required: true,
    type: [hydra.Class as string, hydra.Link as string, hydra.TemplatedLink as string]
  };
  mappings[hydra.supportedProperty] = {
    default: properties => new ResourceFilterableCollection(properties),
    propertyName: "supportedProperties",
    required: true,
    type: [hydra.Class as string]
  };
  return mappings;
}
