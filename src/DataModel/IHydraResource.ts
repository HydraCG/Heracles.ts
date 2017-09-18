import {IOperation} from "./IOperation";
import {IResource} from "./IResource";
import {IHypermedia} from "./IHypermedia";
/**
 * @interface Describes an abstract Hydra resource.
 */
export interface IHydraResource extends IResource, IHypermedia
{
    /**
     * @readonly Gets classes a given resource is of.
     */
    readonly isA: Array<string>

    /**
     * @readonly Gets operations that can be performed on that resource.
     */
    readonly operations: Array<IOperation>;
}