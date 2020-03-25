import { IResource } from "./DataModel/IResource";
import { IResourceCache } from "./IResourceCache";

/**
 * Provides a simple, key-value based implementation of the {@link IResourceCache} interface.
 */
export default class SimpleVolatileResourceCache implements IResourceCache {
  private readonly cache: { [uri: string]: IResource } = {};

  /** @inheritDoc */
  public getItem(uri: string): IResource {
    return this.cache[uri] || null;
  }

  /** @inheritDoc */
  public setItem(uri: string, resource: IResource) {
    if (typeof uri === "string" && uri.length > 0 && !!resource) {
      this.cache[uri] = resource;
    }
  }

  /** @inheritDoc */
  public all(predicate: (resource: IResource) => boolean): Iterable<IResource> {
    return Object.keys(this.cache)
      .map(_ => this.cache[_])
      .filter(predicate);
  }
}
