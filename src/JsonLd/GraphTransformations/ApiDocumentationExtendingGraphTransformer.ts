import { IOperation } from "../../DataModel/IOperation";
import { IHypermediaProcessingOptions } from "../../IHypermediaProcessingOptions";
import { IHypermediaProcessor } from "../../IHypermediaProcessor";
import { hydra, rdfs } from "../../namespaces";
import { IGraphTransformer } from "./IGraphTransformer";

/**
 * Extends resources with {@link IApiDocumentation}'s discovered capabilities.
 */
export default class ApiDocumentationExtendingGraphTransformer implements IGraphTransformer {
  /** @inheritDoc */
  public transform(graph: object[], processor: IHypermediaProcessor, options?: IHypermediaProcessingOptions): object[] {
    if (!!options && !!options.apiDocumentations) {
      for (const resource of graph) {
        if (!!resource["@type"] && resource["@type"] instanceof Array) {
          for (const apiDocumentation of options.apiDocumentations) {
            for (const supportedClass of apiDocumentation.supportedClasses) {
              if (resource["@type"].indexOf(supportedClass.iri) !== -1) {
                for (const operation of supportedClass.supportedOperations) {
                  (resource[hydra.operation] || (resource[hydra.operation] = [])).push(this.copy(operation));
                }
              }
            }
          }
        }
      }
    }

    return graph;
  }

  private copy(operation: IOperation): any {
    const newOperation = {};
    this.copyPredicate(operation, "expects", newOperation, hydra.expects);
    this.copyPredicate(operation, "returns", newOperation, hydra.returns);
    this.copyPredicate(operation, "expectedHeaders", newOperation, hydra.expectsHeader);
    this.copyPredicate(operation, "returnedHeaders", newOperation, hydra.returnsHeader);
    this.copyPredicate(operation, "collections", newOperation, hydra.collection);
    this.copyPredicate(operation, "operations", newOperation, hydra.operation);
    this.copyPredicate(operation, "method", newOperation, hydra.method);
    this.copyPredicate(operation, "title", newOperation, hydra.title);
    this.copyPredicate(operation, "description", newOperation, hydra.description);
    this.copyPredicate(operation, "label", newOperation, rdfs.label);
    this.copyPredicate(operation, "comment", newOperation, rdfs.comment);
    this.copyPredicate(operation, "type", newOperation, "@type");
    return newOperation;
  }

  private copyPredicate(
    operation: IOperation,
    sourcePredicate: string,
    newOperation: any,
    targetPredicate: string
  ): void {
    if (!!operation[sourcePredicate]) {
      if (["string", "number", "boolean"].indexOf(typeof operation[sourcePredicate]) !== -1) {
        (newOperation[targetPredicate] = []).push({ "@value": operation[sourcePredicate] });
      } else if (!!operation[sourcePredicate][Symbol.iterator]) {
        newOperation[targetPredicate] = [];
        for (const value of operation[sourcePredicate]) {
          newOperation[targetPredicate].push(value);
        }
      }
    }
  }
}
