import { IPointingResource } from "./IPointingResource";
import {ITemplated} from "./ITemplated";

export interface IDictionary {
  [name: string]: string;
}
export type MappingBuilder = (MappingsBuilder) => void;

/**
 * Provides an abstract description of a resource with expandable template.
 * @interface
 */
export interface ITemplatedResource<T extends IPointingResource> extends ITemplated<T>, IPointingResource {
}
