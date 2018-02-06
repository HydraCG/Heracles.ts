import MappingsCollection from "../DataModel/Collections/MappingsCollection";
import OperationsCollection from "../DataModel/Collections/OperationsCollection";
import ResourceFilterableCollection from "../DataModel/Collections/ResourceFilterableCollection";
import TypesCollection from "../DataModel/Collections/TypesCollection";
import { IClass } from "../DataModel/IClass";
import { hydra } from "../namespaces";
import { linksExtractor } from "./linksExtractor";
import { memberTemplateOperationsExtractor } from "./memberTemplateOperationsExtractor";
import ProcessingState from "./ProcessingState";

type Literal = string | boolean | number;
type MappingsProcessor = (items: any[], processingState: ProcessingState) => any;

/**
 * Describes a simple RDF mappings used in Heracles' data model.
 * @interface
 */
interface IPropertyMapping {
  /**
   * Gets the property name.
   * @readonly
   * @returns {string}
   */
  propertyName: string;

  /**
   * Gets the type of the resource that this property is valid for.
   * @readonly
   * @returns {string[]}
   */
  type?: string[];

  /**
   * Gets a value indicating whether the property is required and needs to be created anyway.
   * @readonly
   * @returns {boolean}
   */
  required?: boolean;

  /**
   * Gets the either default literal value or a factory method to be used for this property.
   * @readonly
   * @returns {Function | string | number | boolean}
   */
  default?: Literal | MappingsProcessor;
}

/**
 * Provides simple property mappings to be used when creating resources.
 * @const
 * @type {{ [property: string]: IPropertyMapping }}
 */
export const mappings: { [property: string]: IPropertyMapping } = {};
mappings[hydra.supportedClass] = {
  propertyName: "supportedClasses",
  type: [hydra.EntryPoint as string]
};
mappings[hydra.description] = {
  propertyName: "description",
  type: [hydra.ApiDocumentation as string]
};
mappings[hydra.title] = {
  propertyName: "title",
  type: [hydra.ApiDocumentation as string]
};
mappings[hydra.supportedClass] = {
  default: (supportedClasses, processingState) => new ResourceFilterableCollection<IClass>(supportedClasses),
  propertyName: "supportedClasses",
  required: true,
  type: [hydra.ApiDocumentation as string]
};
mappings[hydra.entrypoint] = {
  default: (entryPoints, processingState) => (entryPoints.length > 0 ? entryPoints[0].iri : ""),
  propertyName: "entryPoint",
  required: true,
  type: [hydra.ApiDocumentation as string]
};
mappings[hydra.template] = {
  default: "",
  propertyName: "template",
  required: true,
  type: [hydra.IriTemplate as string]
};
mappings[hydra.mapping] = {
  default: (iriTemplateMappings, processingState) => new MappingsCollection(iriTemplateMappings),
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
  default: (representations, processingState) => ({ iri: hydra.BasicRepresentation }),
  propertyName: "variableRepresentation",
  required: true,
  type: [hydra.IriTemplateMapping as string]
};
mappings[hydra.property] = {
  default: (properties, processingState) => properties[0] || null,
  propertyName: "property",
  required: true,
  type: [hydra.IriTemplateMapping as string]
};
mappings[hydra.totalItems] = {
  default: 0,
  propertyName: "totalItems",
  required: true,
  type: [hydra.Collection as string]
};
mappings[hydra.member] = {
  default: (members, processingState) => new ResourceFilterableCollection(members),
  propertyName: "members",
  type: [hydra.Collection as string]
};
mappings[hydra.memberTemplate] = {
  default: (memberTemplates, processingState) => memberTemplates[0] || null,
  propertyName: "memberTemplate",
  type: [hydra.Collection as string]
};
mappings[hydra.operation] = {
  default: memberTemplateOperationsExtractor,
  propertyName: "operations",
  required: true
};
mappings[hydra.supportedOperation] = {
  default: (operations, processingState) => new OperationsCollection(operations),
  propertyName: "supportedOperations",
  type: [hydra.Class as string]
};
mappings[hydra.supportedProperty] = {
  default: (properties, processingState) => new ResourceFilterableCollection(properties),
  propertyName: "supportedProperties",
  type: [hydra.Class as string]
};
mappings[hydra.expects] = {
  default: (expected, processingState) => new ResourceFilterableCollection(expected),
  propertyName: "expects",
  type: [hydra.Operation as string]
};
mappings[hydra.method] = {
  default: "GET",
  propertyName: "method",
  required: true,
  type: [hydra.Operation as string]
};
mappings.links = {
  default: linksExtractor,
  propertyName: "links",
  required: true
};
mappings.baseUrl = {
  default: (value, processingState) => processingState.baseUrl,
  propertyName: "baseUrl",
  required: true,
  type: [hydra.Link as string, hydra.TemplatedLink as string, hydra.Operation as string]
};
mappings.relation = {
  default: (value, processingState) => processingState.currentResource.iri,
  propertyName: "relation",
  required: true,
  type: [hydra.Link as string, hydra.TemplatedLink as string]
};
mappings.target = {
  default: (value, processingState) => {
    const iri = processingState.ownerIri.match(/^[a-zA-Z][a-zA-Z0-9_]*:/)
      ? processingState.ownerIri
      : new URL(processingState.ownerIri, processingState.baseUrl).toString();
    return processingState.resourceMap[iri] || { iri, type: new TypesCollection([]) };
  },
  propertyName: "target",
  required: true,
  type: [hydra.Link as string, hydra.TemplatedLink as string, hydra.Operation as string]
};
