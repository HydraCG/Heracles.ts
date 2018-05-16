import ResourceFilterableCollection from "../DataModel/Collections/ResourceFilterableCollection";
import { hydra } from "../namespaces";
import { IPropertyMapping } from "./IPropertyMapping";

export function collection(mappings: {
  [property: string]: IPropertyMapping;
}): { [property: string]: IPropertyMapping } {
  mappings[hydra.totalItems] = {
    default: 0,
    propertyName: "totalItems",
    required: true,
    type: [hydra.Collection as string]
  };
  mappings[hydra.member] = {
    default: members => new ResourceFilterableCollection(members),
    propertyName: "members",
    type: [hydra.Collection as string]
  };
  mappings[hydra.memberTemplate] = {
    default: memberTemplates => memberTemplates[0] || null,
    propertyName: "memberTemplate",
    type: [hydra.Collection as string]
  };
  mappings[hydra.collection] = {
    default: collections => new ResourceFilterableCollection(collections),
    propertyName: "collections",
    required: true
  };
  mappings[hydra.view] = {
    default: views => views[0] || null,
    propertyName: "view",
    type: [hydra.Collection as string]
  };
  return mappings;
}
