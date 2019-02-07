import { ICollectionItemSpecification } from "./ICollectionItemSpecification";
import { IResource } from "./IResource";

/**
 * Describes an abstract Hydra collection specification.
 * @interface
 */

export interface ICollectionSpecification extends IResource {
  /**
   * Gets the set of collection item's common assertions.
   * @readonly
   * @returns {ICollectionItemSpecification}
   */
  readonly manages: Iterable<ICollectionItemSpecification>;
}
