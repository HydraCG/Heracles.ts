import {IOperation} from "./IOperation";
/**
 * @interface Describes an abstract Hydra resource.
 */
export interface IResource
{
    /**
     * @readonly Gets an Iri of a resource.
     */
    readonly iri: string;

    /**
     * @readonly Gets classes a given resource is of.
     */
    readonly isA: Array<string>

    /**
     * @readonly Gets operations that can be performed on that resource.
     */
    readonly operations: Array<IOperation>;
}