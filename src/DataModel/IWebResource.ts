import { IHypermediaContainer } from "./IHypermediaContainer";
import { IResource } from "./IResource";

/**
 * Describes an abstract web resource.
 */
export interface IWebResource extends Object, IResource {
  /**
   * Gets a collection of hypermedia controls.
   */
  readonly hypermedia: IHypermediaContainer;
}
