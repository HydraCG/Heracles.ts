import * as jsonld from "jsonld";
import TypesCollection from "../DataModel/Collections/TypesCollection";

export const targetExtractor = (value, processingState) => {
  if (value.length > 0) {
    return value[0];
  }

  const iri = jsonld.prependBase(processingState.baseUrl, processingState.ownerIri);
  return processingState.resourceMap[iri] || { iri, type: new TypesCollection([]) };
};
