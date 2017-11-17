import MappingsCollection from "../DataModel/Collections/MappingsCollection";
import OperationsCollection from "../DataModel/Collections/OperationsCollection";
import TypedResourceFilteredCollection from "../DataModel/Collections/TypedResourceFilteredCollection";
import { IClass } from "../DataModel/IClass";
import { ICollection } from "../DataModel/ICollection";
import TemplatedOperation from "../DataModel/TemplatedOperation";
import { hydra } from "../namespaces";
import ProcessingContext from "./ProcessingContext";

type Literal = string | boolean | number;
type MappingsProcessor = (items: any[], context: ProcessingContext) => any;

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
   * @returns {string}
   */
  type?: string;

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
  type: hydra.EntryPoint as string
};
mappings[hydra.description] = {
  propertyName: "description",
  type: hydra.ApiDocumentation as string
};
mappings[hydra.title] = {
  propertyName: "title",
  type: hydra.ApiDocumentation as string
};
mappings[hydra.supportedClass] = {
  default: (supportedClasses, context) => new TypedResourceFilteredCollection<IClass>(supportedClasses),
  propertyName: "supportedClasses",
  required: true,
  type: hydra.ApiDocumentation as string
};
mappings[hydra.entrypoint] = {
  default: (entryPoints, context) => (entryPoints.length > 0 ? entryPoints[0].iri : ""),
  propertyName: "entryPoint",
  required: true,
  type: hydra.ApiDocumentation as string
};
mappings[hydra.template] = {
  default: "",
  propertyName: "template",
  required: true,
  type: hydra.IriTemplate as string
};
mappings[hydra.variableRepresentation] = {
  default: (representations, context) => ({ iri: hydra.BasicRepresentation }),
  propertyName: "variableRepresentation",
  required: true,
  type: hydra.IriTemplate as string
};
mappings[hydra.mapping] = {
  default: (iriTemplateMappings, context) => new MappingsCollection(iriTemplateMappings),
  propertyName: "mappings",
  required: true,
  type: hydra.IriTemplate as string
};
mappings[hydra.totalItems] = {
  default: 0,
  propertyName: "totalItems",
  required: true,
  type: hydra.Collection as string
};
mappings[hydra.member] = {
  default: (members, context) => new TypedResourceFilteredCollection(members),
  propertyName: "members",
  type: hydra.Collection as string
};
mappings[hydra.memberTemplate] = {
  default: (memberTemplates, context) => memberTemplates[0] || null,
  propertyName: "memberTemplate",
  type: hydra.Collection as string
};
mappings[hydra.operation] = {
  default: (operations, context) => {
    if (
      context.currentResource.is.a(hydra.Collection) &&
      !!(context.currentResource as ICollection).memberTemplate &&
      (context.currentResource as ICollection).memberTemplate.operations.length > 0
    ) {
      operations = [...operations].concat(
        [...(context.currentResource as ICollection).memberTemplate.operations].map(
          operation => new TemplatedOperation(operation, (context.currentResource as ICollection).memberTemplate)
        )
      );
    }

    return new OperationsCollection(operations);
  },
  propertyName: "operations",
  required: true
};
mappings[hydra.supportedOperation] = {
  default: (operations, context) => new OperationsCollection(operations),
  propertyName: "supportedOperations",
  type: hydra.Class as string
};
mappings[hydra.supportedProperty] = {
  default: (properties, context) => new TypedResourceFilteredCollection(properties),
  propertyName: "supportedProperties",
  type: hydra.Class as string
};
mappings[hydra.expects] = {
  default: (expected, context) => new TypedResourceFilteredCollection(expected),
  propertyName: "expects",
  type: hydra.Operation as string
};
mappings[hydra.method] = {
  default: "GET",
  propertyName: "method",
  required: true,
  type: hydra.Operation as string
};
mappings.baseUrl = {
  default: (value, context) => context.baseUrl,
  propertyName: "baseUrl",
  required: true,
  type: hydra.Operation as string
};
mappings.target = {
  default: (value, context) =>
    context.ownerIri.match(/^[a-zA-Z][a-zA-Z0-9_]*:/)
      ? context.ownerIri
      : new URL(context.ownerIri, context.baseUrl).toString(),
  propertyName: "target",
  required: true,
  type: hydra.Operation as string
};
