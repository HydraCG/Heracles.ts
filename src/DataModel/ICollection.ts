import {IResource} from "./IResource";
import {IWebResource} from "./IWebResource";

export interface ICollection extends Array<IResource> {
  /**
   * Adds a given web resource to the collection.
   *
   * @param webResource Web resource to be added to the collection.
   * @returns Response of the operation designated for adding a resource.
   */
  add(webResource: IWebResource): Promise<Response>;
}
