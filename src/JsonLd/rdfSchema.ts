import ResourceFilterableCollection from "../DataModel/Collections/ResourceFilterableCollection";
import TypesCollection from "../DataModel/Collections/TypesCollection";
import { IResource } from "../DataModel/IResource";
import { hydra, rdf, rdfs } from "../namespaces";
import { IPropertyMapping } from "./IPropertyMapping";

export function rdfSchema(mappings: {
  [property: string]: IPropertyMapping;
}): { [property: string]: IPropertyMapping } {
  mappings[rdfs.range] = {
    default: ranges =>
      new ResourceFilterableCollection<IResource>(
        ranges.map(type => (typeof type === "string" ? { iri: type, type: new TypesCollection([]) } : type))
      ),
    propertyName: "valuesOfType",
    required: true,
    type: [rdf.Property as string]
  };
  mappings[rdfs.label] = {
    default: "",
    propertyName: "displayName",
    required: true,
    type: [rdf.Property as string, hydra.Class as string]
  };
  mappings[rdfs.comment] = {
    default: "",
    propertyName: "description",
    required: true,
    type: [rdf.Property as string, hydra.Class as string]
  };
  return mappings;
}
