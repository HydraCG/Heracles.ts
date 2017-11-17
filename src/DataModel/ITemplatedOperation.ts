import { IOperation } from "./IOperation";

/**
 * Provides a {@link IOperation} that can have an URI template.
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
