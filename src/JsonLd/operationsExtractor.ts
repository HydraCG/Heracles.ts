import OperationsCollection from "../DataModel/Collections/OperationsCollection";
import { IIriTemplate } from "../DataModel/IIriTemplate";
import TemplatedOperation from "../DataModel/TemplatedOperation";

export const operationsExtractor = (operations, processingState) => {
  const result = [];
  for (const operation of operations) {
    if (!!(operation.target as IIriTemplate).mappings) {
      result.push(new TemplatedOperation(operation, operation.target as IIriTemplate));
    } else {
      result.push(operation);
    }

    processingState.markHypermediaAsOwned(operation);
  }

  return new OperationsCollection(result);
};
