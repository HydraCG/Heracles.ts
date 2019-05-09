import { IOperation } from "./DataModel/IOperation";
import { IResource } from "./DataModel/IResource";

/**
 * Describes a strategy of {@link IOperation} and {@link IIriTemplate} expansion.
 * @interface
 */
export interface IIriTemplateExpansionStrategy {
  /**
   * Creates a fully invocable {@link IOperation} taking into account possible IRI template used by the input operation.
   * @param {IOperation} operation Source operation describing the request.
   * @param [IResource] body Optional resource to be placed in the body of the request.
   * @param [auxResource] Optional auxiliar resource to be used for variable mappings.
   * @returns {IOperation}
   */
  createRequest(operation: IOperation, body?: IResource, auxResource?: any): IOperation;
}
