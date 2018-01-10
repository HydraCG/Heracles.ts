import OperationsCollection from "../DataModel/Collections/OperationsCollection";
import { ICollection } from "../DataModel/ICollection";
import TemplatedOperation from "../DataModel/TemplatedOperation";
import { hydra } from "../namespaces";

export const memberTemplateOperationsExtractor = (operations, processingState) => {
  if (
    processingState.currentResource.type.contains(hydra.Collection) &&
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
