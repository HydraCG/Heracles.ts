import { rdf, schemaDotOrg } from "../../namespaces";
import { IPropertyMapping } from "../IPropertyMapping";
import { typeExtractor } from "../typeExtractor";

export function schema(mappings: {
  [property: string]: IPropertyMapping;
}): { [property: string]: IPropertyMapping } {
  mappings[schemaDotOrg.rangeIncludes] = {
    default: typeExtractor,
    propertyName: "valuesOfType",
    required: true,
    type: [rdf.Property as string]
  };
  return mappings;
}
