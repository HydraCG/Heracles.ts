import { ICollection } from "./DataModel/ICollection";
import { IResource } from "./DataModel/IResource";

/**
 * Defines possible partial collection view crawling directions.
 */
export enum CrawlingDirection {
  /**
   * Defines a forward direction that consumes hydra:next link.
   * @enum
   */
  forward,

  /**
   * Defines a forward direction that consumes hydra:previous link.
   * @enum
   */
  backward
}
/**
 * Describes {@link PartialCollectionCrawler.getMoreMembersStartingFrom(IPartialCollectionView)} crawling options.
 * @interface
 */
export interface ICrawlingOptions {
  /**
   * Gets a direction of the crawling.
   */
  direction?: CrawlingDirection;
  /**
   * Gets the limit of the members to be obtained.
   */
  memberLimit?: number;

  /**
   * Gets the limit of requests to be made.
   */
  requestLimit?: number;

  /**
   * Gets a value indicating whether to rewind back to the beginning (or end) of the collection in case the starting
   * point was not the first (or last) possible view.
   */
  rewind?: boolean;
}

/**
 * Provides capability of crawling through partial collection views.
 */
export default class PartialCollectionCrawler {
  private readonly collection: ICollection;

  private constructor(collection: ICollection) {
    this.collection = collection;
  }

  /**
   * Creates a new instance of the {@link PartialCollectionCrawler} from a given partial collection view.
   * @param {ICollection} collection Partial collection view to start with.
   * @returns {PartialCollectionCrawler}
   */
  public static from(collection: ICollection): PartialCollectionCrawler {
    return new PartialCollectionCrawler(collection);
  }

  /**
   * Crawls partial collection views starting with a given one.
   * @param {ICrawlingOptions} options Crawling options.
   * @returns {Promise<Iterable<IResource>>}
   */
  public async getMoreMembers(options?: ICrawlingOptions): Promise<Iterable<IResource>> {
    options = options || {};
    const result = [];
    for (const item of this.collection.members) {
      result.push(item);
    }

    const view = this.collection.getView();
    if (view === null || result.length >= options.memberLimit) {
      return result;
    }

    const visitedPages = [this.collection.iri];
    let requests = 0;
    do {
      let term = options.direction === CrawlingDirection.backward ? "Previous" : "Next";
      let link: string = view[term.toLowerCase()];
      let furtherPart: () => Promise<Iterable<IResource>> = view[`get${term}Page`];
      if (!link && !!options.rewind) {
        term = options.direction === CrawlingDirection.backward ? "Last" : "First";
        link = view[term.toLowerCase()];
        furtherPart = view[`get${term}Page`];
      }

      if (!link || visitedPages.indexOf(link) !== -1) {
        break;
      }

      const part = await furtherPart();
      requests++;
      visitedPages.push(view.iri);
      for (const item of part) {
        result.push(item);
      }
    } while (
      requests < (options.requestLimit || Number.MAX_SAFE_INTEGER) &&
      result.length < (options.memberLimit || Number.MAX_SAFE_INTEGER)
    );

    return result;
  }
}
