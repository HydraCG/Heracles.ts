import { ILink } from "./ILink";
import { IResource } from "./IResource";

/**
 * Provides a link that can has an URI template.
 * @interface
 */

export interface ITemplatedLink extends ILink {
  /**
   * Expands an URI template with given variables.
   * @param templateVariables {{ [name: string]: string }} Template variables with values.
   * @returns {IResource}
   */
  expandTarget(templateVariables: { [name: string]: string }): IResource;
}
