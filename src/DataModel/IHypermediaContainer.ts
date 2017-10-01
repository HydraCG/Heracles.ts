import { IHypermedia } from "./IHypermedia";
import { IResource } from "./IResource";
/**
 * @interface Provides an abstraction layer over hypermedia container.
 */
export interface IHypermediaContainer extends Array<IHypermedia> {
  /**
   * @readonly Gets a collection members. This may be null if the resource owning this container is
   * not a hydra:Collection.
   */
  readonly members: IResource[];
}
