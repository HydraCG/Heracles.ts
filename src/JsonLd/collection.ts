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
    type: [hydra.Collection as string, hydra.PartialCollectionView as string]
  };
  mappings[hydra.member] = {
    default: members => new ResourceFilterableCollection(members),
    propertyName: "members",
    type: [hydra.Collection as string, hydra.PartialCollectionView as string]
  };
  mappings[hydra.memberTemplate] = {
    default: memberTemplates => memberTemplates[0] || null,
    propertyName: "memberTemplate",
    type: [hydra.Collection as string, hydra.PartialCollectionView as string]
  };
  mappings[hydra.collection] = {
    default: (collections, processingState) => new ResourceFilterableCollection(collections),
    propertyName: "collections",
    required: true
  };
  mappings[hydra.collection] = {
    default: collections => new ResourceFilterableCollection(collections),
    propertyName: "collections",
    required: true
  };
  return mappings;
}
