import { IOperation } from "./DataModel/IOperation";
import { IResource } from "./DataModel/IResource";
import { ITemplatedOperation } from "./DataModel/ITemplatedOperation";
import MappingsBuilder from "./DataModel/MappingsBuilder";
import { IIriTemplateExpansionStrategy } from "./IIiriTemplateExpansionStrategy";

/**
 * Provides a simple implementation of the {@link IIriTemplateExpansionStrategy} interface where an input resource
 * is used to fill the possible {@link IIriTemplate} with values.
 */
export default class BodyResourceBoundIriTemplateExpansionStrategy implements IIriTemplateExpansionStrategy {
  public createRequest(operation: IOperation, body?: IResource, auxResource?: any): IOperation {
    const templatedOperation = operation as ITemplatedOperation;
    if (typeof templatedOperation.expandTarget === "function") {
      return templatedOperation.expandTarget(builder =>
        this.withResourceVariables(builder, body || {}, auxResource || {})
      );
    }

    return operation;
  }

  private withResourceVariables(builder: MappingsBuilder, body: object, auxResource: object): void {
    const variableMappings = builder.variableMappings;
    for (const variableName of Object.keys(variableMappings)) {
      const property = variableMappings[variableName];
      const literal = typeof body[property] !== "undefined" ? body[property].toString() : auxResource[property] || null;
      builder.withVariable(variableName).havingValueOf(literal);
    }
  }
}
