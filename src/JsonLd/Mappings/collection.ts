import ResourceFilterableCollection from "../../DataModel/Collections/ResourceFilterableCollection";
import TypesCollection from "../../DataModel/Collections/TypesCollection";
import { IResource } from "../../DataModel/IResource";
import { hydra } from "../../namespaces";
import { IPropertyMapping } from "../IPropertyMapping";
import ProcessingState from "../ProcessingState";

function convertToResource(item: any, processingState: ProcessingState, ...resourceType: string[]): IResource {
  let result = (item as IResource) || null;
  if (typeof item === "string") {
    result =
      processingState.resourceMap[item] ||
      (processingState.resourceMap[item] = { iri: item, type: new TypesCollection(resourceType) });
  }

  return result;
}

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
    required: true,
    type: [hydra.Collection as string]
  };
  mappings[hydra.manages] = {
    propertyName: "manages",
    required: true,
    type: [hydra.CollectionSpecification as string, hydra.Collection as string]
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
  mappings[hydra.first] = {
    default: (first, processingState) => convertToResource(first[0], processingState, hydra.Link),
    propertyName: "first",
    type: [hydra.PartialCollectionView as string]
  };
  mappings[hydra.last] = {
    default: (last, processingState) => convertToResource(last[0], processingState, hydra.Link),
    propertyName: "last",
    type: [hydra.PartialCollectionView as string]
  };
  mappings[hydra.next] = {
    default: (next, processingState) => convertToResource(next[0], processingState, hydra.Link),
    propertyName: "next",
    type: [hydra.PartialCollectionView as string]
  };
  mappings[hydra.previous] = {
    default: (previous, processingState) => convertToResource(previous[0], processingState, hydra.Link),
    propertyName: "previous",
    type: [hydra.PartialCollectionView as string]
  };
  mappings[hydra.subject] = {
    default: (subject, processingState) => convertToResource(subject[0], processingState),
    propertyName: "subject"
  };
  mappings[hydra.object] = {
    default: (object, processingState) => convertToResource(object[0], processingState),
    propertyName: "object"
  };
  return mappings;
}