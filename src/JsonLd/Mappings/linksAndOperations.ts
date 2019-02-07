import MappingsCollection from "../../DataModel/Collections/MappingsCollection";
import ResourceFilterableCollection from "../../DataModel/Collections/ResourceFilterableCollection";
import ReturnedResourcesCollection from "../../DataModel/Collections/ReturnedResourcesCollection";
import TypesCollection from "../../DataModel/Collections/TypesCollection";
import { hydra } from "../../namespaces";
import { headersExtractor } from "../headersExtractor";
import { IPropertyMapping } from "../IPropertyMapping";
import { targetExtractor } from "../targetExtractor";

export function linksAndOperations(mappings: {
  [property: string]: IPropertyMapping;
}): { [property: string]: IPropertyMapping } {
  mappings[hydra.template] = {
    default: "",
    propertyName: "template",
    required: true,
    type: [hydra.Template as string, hydra.IriTemplate as string, hydra.HeaderTemplate as string]
  };
  mappings[hydra.mapping] = {
    default: iriTemplateMappings => new MappingsCollection(iriTemplateMappings),
    propertyName: "mappings",
    required: true,
    type: [hydra.IriTemplate as string]
  };
  mappings[hydra.headerName] = {
    default: names => (names.length > 0 ? names[0] : ""),
    propertyName: "name",
    required: true,
    type: [hydra.HeaderTemplate as string]
  };

  mappings[hydra.variable] = {
    default: "",
    propertyName: "variable",
    required: true,
    type: [hydra.IriTemplateMapping as string]
  };
  mappings[hydra.variableRepresentation] = {
    default: representations => representations[0] || { iri: hydra.BasicRepresentation, type: TypesCollection.empty },
    propertyName: "variableRepresentation",
    required: true,
    type: [hydra.IriTemplateMapping as string]
  };

  mappings[hydra.expects] = {
    default: expected => new ResourceFilterableCollection(expected),
    propertyName: "expects",
    required: true,
    type: [hydra.Operation as string]
  };
  mappings[hydra.returns] = {
    default: returned => new ReturnedResourcesCollection(returned),
    propertyName: "returns",
    required: true,
    type: [hydra.Operation as string]
  };
  mappings[hydra.expectsHeader] = {
    default: headersExtractor,
    propertyName: "expectedHeaders",
    required: true,
    type: [hydra.Operation as string]
  };
  mappings[hydra.returnsHeader] = {
    default: returnedHeaders => returnedHeaders,
    propertyName: "returnedHeaders",
    type: [hydra.Operation as string]
  };
  mappings[hydra.method] = {
    default: "GET",
    propertyName: "method",
    required: true,
    type: [hydra.Operation as string]
  };

  mappings.relation = {
    default: (value, processingState) => processingState.currentResource.iri,
    propertyName: "relation",
    required: true,
    type: [hydra.Link as string, hydra.TemplatedLink as string]
  };
  mappings.baseUrl = {
    default: (value, processingState) => processingState.baseUrl,
    propertyName: "baseUrl",
    required: true,
    type: [hydra.Link as string, hydra.TemplatedLink as string, hydra.Operation as string]
  };
  mappings[hydra.target] = {
    default: targetExtractor,
    propertyName: "target",
    required: true,
    type: [hydra.Link as string, hydra.TemplatedLink as string, hydra.Operation as string]
  };
  return mappings;
}
