import {IHydraResource} from "./IHydraResource";

/**
 * Provides a link that can has an URI template.
 * @interface
 */

export interface ILink extends IHydraResource {
  /**
   * Gets a base URL that can be used to resolve target in case it is relative.
   * @readonly
   * @returns {string}
   */
  readonly baseUrl: string;

  /**
   * Gets a target URL to be called.
   * @readonly
   * @returns {string}
   */
  readonly target: string;
}
