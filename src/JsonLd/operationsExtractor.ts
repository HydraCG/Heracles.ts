import OperationsCollection from "../DataModel/Collections/OperationsCollection";
import { ICollection } from "../DataModel/ICollection";
import TemplatedOperation from "../DataModel/TemplatedOperation";
import { hydra } from "../namespaces";

export const operationsExtractor = (operations, context) => {
  if (
    context.currentResource.type.contains(hydra.Collection) &&
    !!(context.currentResource as ICollection).memberTemplate &&
    (context.currentResource as ICollection).memberTemplate.operations.length > 0
  ) {
    operations = [...operations].concat(
      [...(context.currentResource as ICollection).memberTemplate.operations].map(
        operation => new TemplatedOperation(operation, (context.currentResource as ICollection).memberTemplate)
      )
    );
  }

  return new OperationsCollection(operations);
};
