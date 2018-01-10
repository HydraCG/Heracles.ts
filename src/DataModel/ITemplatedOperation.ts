import { IOperation } from "./IOperation";

/**
 * Describes an {@link IOperation} that uses an URI template to point to the target of the request.
 * @interface
 */
export interface ITemplatedOperation extends IOperation {
  /**
   * Expands an URI template with given variables.
   * @param templateVariables {{ [name: string]: string }} Template variables with values.
   * @returns {IOperation}
   */
  expandTarget(templateVariables: { [name: string]: string }): IOperation;
}
