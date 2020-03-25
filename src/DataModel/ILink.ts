import OperationsCollection from "./Collections/OperationsCollection";
import { IHydraResource } from "./IHydraResource";
import { IResource } from "./IResource";

/**
 * Describes a link to another resource.
 * @interface
 */

export interface ILink extends IHydraResource {
  /**
   * Gets the link's title.
   * @readonly
   * @returns {string}
   */
  readonly title: string;

  /**
   * Gets the link's description.
   * @readonly
   * @returns {string}
   */
  readonly description: string;

  /**
   * Gets a relation of the link.
   * @readonly
   * @returns {string}
   */
  readonly relation: string;
  /**
   * Gets a base URL that can be used to resolve target in case it is relative.
   * @readonly
   * @returns {string}
   */
  readonly baseUrl: string;

  /**
   * Gets a target URL to be called.
   * @readonly
   * @returns {IResource}
   */
  readonly target: IResource;

  /**
   * Gets a link's supported operations.
   * @readonly
   * @returns {ResourceFilterableCollection<IOperation>}
   */
  readonly supportedOperations: OperationsCollection;
}
