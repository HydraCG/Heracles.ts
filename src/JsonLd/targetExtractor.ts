import * as jsonld from "jsonld";
import TypesCollection from "../DataModel/Collections/TypesCollection";

export const targetExtractor = (value, processingState) => {
  if (value.length > 0) {
    return value[0];
  }

  const iri = jsonld.prependBase(processingState.baseUrl, processingState.ownerIri);
  const result = { iri, type: new TypesCollection([]) };
  const existingResource = processingState.resourceMap[iri];
  if (!!existingResource) {
    result.type = existingResource.type || result.type;
  }

  return result;
};
