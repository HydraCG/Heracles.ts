import ResourceFilterableCollection from "../DataModel/Collections/ResourceFilterableCollection";
import TypesCollection from "../DataModel/Collections/TypesCollection";
import { IResource } from "../DataModel/IResource";

export const typeExtractor = (types, processingState, propertyName) => {
  const result = !!processingState.currentResource[propertyName]
    ? [...processingState.currentResource[propertyName]]
    : [];
  const additionalTypes = types
    .filter(type => !!!result.find(item => item.iri === type.iri))
    .map(type => ({
      iri: (typeof type === "string" ? type : type.iri),
      type: TypesCollection.empty
    }));
  return new ResourceFilterableCollection<IResource>(result.concat(additionalTypes));
};
