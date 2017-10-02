import { IHypermediaContainer } from "./IHypermediaContainer";

/**
 * Describes an abstract web resource.
 */
export interface IWebResource extends Object {
  /**
   * Gets a collection of hypermedia controls.
   */
  readonly hypermedia: IHypermediaContainer;
}
