import ResourceFilterableCollection from "../DataModel/Collections/ResourceFilterableCollection";
import { IClass } from "../DataModel/IClass";
import { hydra } from "../namespaces";
import { IPropertyMapping } from "./IPropertyMapping";
import { templatedOperationsExtractor } from "./templatedOperationsExtractor";

export function apiDocumentation(mappings: {
  [property: string]: IPropertyMapping;
}): { [property: string]: IPropertyMapping } {
  mappings[hydra.description] = {
    propertyName: "description",
    type: [hydra.ApiDocumentation as string]
  };
  mappings[hydra.title] = {
    propertyName: "title",
    type: [hydra.ApiDocumentation as string]
  };
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
    default: templatedOperationsExtractor,
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
