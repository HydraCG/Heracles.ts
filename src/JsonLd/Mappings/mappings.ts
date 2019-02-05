import { hydra } from "../../namespaces";
import { IPropertyMapping } from "../IPropertyMapping";
import { linksExtractor } from "../linksExtractor";
import { operationsExtractor } from "../operationsExtractor";
import { apiDocumentation } from "./apiDocumentation";
import { collection } from "./collection";
import { linksAndOperations } from "./linksAndOperations";
import { rdfSchema } from "./rdfSchema";
import { schema } from "./schema.org";

/**
 * Provides simple property mappings to be used when creating resources.
 * @const
 * @type {{ [property: string]: IPropertyMapping }}
 */
export const mappings: { [property: string]: IPropertyMapping } = {};

rdfSchema(mappings);
schema(mappings);
apiDocumentation(mappings);
linksAndOperations(mappings);
collection(mappings);
mappings[hydra.required] = {
  default: false,
  propertyName: "required",
  required: true,
  type: [hydra.SupportedProperty as string, hydra.IriTemplateMapping as string]
};
mappings[hydra.property] = {
  default: properties => properties[0] || null,
  propertyName: "property",
  required: true,
  type: [hydra.SupportedProperty as string, hydra.IriTemplateMapping as string]
};
mappings[hydra.operation] = {
  default: operationsExtractor,
  propertyName: "operations",
  required: true
};
mappings[hydra.title] = {
  default: "",
  propertyName: "displayName",
  required: true,
  type: [hydra.Class as string, hydra.ApiDocumentation as string]
};
mappings[hydra.description] = {
  default: "",
  propertyName: "description",
  required: true,
  type: [hydra.Class as string, hydra.ApiDocumentation as string]
};
mappings.links = {
  default: linksExtractor,
  propertyName: "links",
  required: true
};
