import { IHydraResource } from "./IHydraResource";
import {IClass} from "./IClass";

/**
 * Describes an abstract Hydra operation.
 */
export interface IOperation extends IHydraResource {
  /**
   * Gets a target URL to be called.
   */
  readonly targetUrl: string;

  /**
   * Gets a method to be used for the call.
   */
  readonly method: string;

  /**
   * Gets the expectec class, if any.
   */
  readonly expects?: IClass[];
}
