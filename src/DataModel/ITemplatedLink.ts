import { ILink } from "./ILink";
import { ITemplatedResource } from "./ITemplatedResource";

/**
 * Provides a link that can has an URI template.
 * @interface
 */

export interface ITemplatedLink extends ILink, ITemplatedResource<ILink> {}
