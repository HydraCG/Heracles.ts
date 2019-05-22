import * as jsonld from "jsonld";
import MappingsCollection from "../DataModel/Collections/MappingsCollection";
import ResourceFilterableCollection from "../DataModel/Collections/ResourceFilterableCollection";
import TypesCollection from "../DataModel/Collections/TypesCollection";
import { IDictionary } from "../IDictionary";
import { hydra } from "../namespaces";
import { IPropertyMapping } from "./IPropertyMapping";

export function linksAndOperations(mappings: IDictionary<IPropertyMapping>): IDictionary<IPropertyMapping> {
  mappings[hydra.template] = {
    default: "",
    propertyName: "template",
    required: true,
    type: [hydra.IriTemplate as string]
  };
  mappings[hydra.mapping] = {
    default: iriTemplateMappings => new MappingsCollection(iriTemplateMappings),
    propertyName: "mappings",
    required: true,
    type: [hydra.IriTemplate as string]
  };

  mappings[hydra.variable] = {
    default: "",
    propertyName: "variable",
    required: true,
    type: [hydra.IriTemplateMapping as string]
  };
  mappings[hydra.variableRepresentation] = {
    default: representations => representations[0] || null,
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
    default: returned => new ResourceFilterableCollection(returned),
    propertyName: "returns",
    required: true,
    type: [hydra.Operation as string]
  };
  mappings[hydra.expectsHeader] = {
    propertyName: "expectedHeaders",
    required: true,
    type: [hydra.Operation as string]
  };
  mappings[hydra.returnsHeader] = {
    propertyName: "returnedHeaders",
    required: true,
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
  mappings.target = {
    default: (value, processingState) => {
      const iri = jsonld.url.prependBase(processingState.baseUrl, processingState.ownerIri);
      return processingState.getVisitedResource(iri) || { iri, type: TypesCollection.empty };
    },
    propertyName: "target",
    required: true,
    type: [hydra.Link as string, hydra.TemplatedLink as string, hydra.Operation as string]
  };
  return mappings;
}
