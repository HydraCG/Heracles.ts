import { IResource } from "./DataModel/IResource";

/**
 * Provides an abstraction over a cache that stores resources.
 * @interface
 */
export interface IResourceCache {
  /**
   * Gets a resource within the cache.
   * @param {string} uri Uri of the resource.
   * @returns {IResource}
   */
  getItem(uri: string): IResource;

  /**
   * Sets a resource within the cache.
   * @param {string} uri Uri of the resource.
   * @param {IResource} resource Resource to be stored.
   */
  setItem(uri: string, resource: IResource);

  /**
   * Gets all cached resources of type T.
   * @param {(resource: IResource) => boolean} predicate Predicate filtering out resources.
   * @returns {Iterable<T extends IResource>}
   */
  all(predicate: (resource: IResource) => boolean): Iterable<IResource>;
}
