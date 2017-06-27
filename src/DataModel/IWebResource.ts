import {IHypermedia} from "./IHypermedia";

/**
 * @interface Describes an abstract web resource.
 */
export interface IWebResource extends Object
{
    /**
     * @readonly Gets a collection of hypermedia controls.
     */
    readonly hypermedia: Array<IHypermedia>;
}