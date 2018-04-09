import OperationsCollection from "../DataModel/Collections/OperationsCollection";
import { ICollection } from "../DataModel/ICollection";
import { IResource } from "../DataModel/IResource";
import TemplatedOperation from "../DataModel/TemplatedOperation";
import { hydra } from "../namespaces";

function isCollection(resource: IResource) {
  return resource.type.contains(hydra.Collection) || resource.type.contains(hydra.PartialCollectionView);
}

export const memberTemplateOperationsExtractor = (operations, processingState) => {
  if (
    isCollection(processingState.currentResource) &&
    !!(processingState.currentResource as ICollection).memberTemplate &&
    (processingState.currentResource as ICollection).memberTemplate.operations.length > 0
  ) {
    operations = [...operations].concat(
      [...(processingState.currentResource as ICollection).memberTemplate.operations].map(
        operation => new TemplatedOperation(operation, (processingState.currentResource as ICollection).memberTemplate)
      )
    );
  }

  return new OperationsCollection(operations);
};
