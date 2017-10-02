import { IHypermedia } from "./IHypermedia";
import { IOperation } from "./IOperation";
import { IResource } from "./IResource";
/**
 * Describes an abstract Hydra resource.
 */
export interface IHydraResource extends IResource, IHypermedia {
  /**
   * Gets classes a given resource is of.
   */
  readonly isA: string[];

  /**
   * Gets operations that can be performed on that resource.
   */
  readonly operations: IOperation[];
}
