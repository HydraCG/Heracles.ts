import { IOperation } from "./IOperation";
import { ITemplatedResource } from "./ITemplatedResource";

/**
 * Describes an {@link IOperation} that uses an URI template to point to the target of the request.
 * @interface
 */
export interface ITemplatedOperation extends IOperation, ITemplatedResource<IOperation> {}
