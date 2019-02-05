import { rdf, rdfs } from "../../namespaces";
import { IPropertyMapping } from "../IPropertyMapping";
import { typeExtractor } from "../typeExtractor";

export function rdfSchema(mappings: {
  [property: string]: IPropertyMapping;
}): { [property: string]: IPropertyMapping } {
  mappings[rdfs.range] = {
    default: typeExtractor,
    propertyName: "valuesOfType",
    required: true,
    type: [rdf.Property as string]
  };
  mappings[rdfs.label] = {
    default: "",
    propertyName: "displayName",
    required: true,
    type: [rdf.Property as string]
  };
  mappings[rdfs.comment] = {
    default: "",
    propertyName: "description",
    required: true,
    type: [rdf.Property as string]
  };
  return mappings;
}
