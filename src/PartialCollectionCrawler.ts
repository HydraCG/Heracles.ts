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
   * The crawling direction .
   */
  direction?: CrawlingDirection;
  /**
   * The limit of the members to retrieve.
   */
  memberLimit?: number;

  /**
   * The limit of requests to make.
   */
  requestLimit?: number;

  /**
   * Value indicating whether to rewind back to the beginning (or end) of the collection in case the starting
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
  public async getMembers(options?: ICrawlingOptions): Promise<Iterable<IResource>> {
    options = options || {};
    const result = [];
    const memberLimit = options.memberLimit || Number.MAX_SAFE_INTEGER;
    if (this.addWithLimitReached(result, this.collection.members, memberLimit)) {
      return result;
    }

    const iterator = this.collection.getIterator();
    if (iterator === null || result.length >= options.memberLimit) {
      return result;
    }

    const visitedPages = [this.collection.iri];
    let requests = 0;
    do {
      let term = options.direction === CrawlingDirection.backward ? "Previous" : "Next";
      let link: string = iterator[term.toLowerCase()];
      let furtherPart: () => Promise<Iterable<IResource>> = iterator[`get${term}Part`];
      if (!link && !!options.rewind) {
        term = options.direction === CrawlingDirection.backward ? "Last" : "First";
        link = iterator[term.toLowerCase()];
        furtherPart = iterator[`get${term}Part`];
      }

      if (!link || visitedPages.indexOf(link) !== -1) {
        break;
      }

      const part = await furtherPart();
      requests++;
      visitedPages.push(iterator.current);
      this.addWithLimitReached(result, part, memberLimit);
    } while (requests < (options.requestLimit || Number.MAX_SAFE_INTEGER) && result.length < memberLimit);

    return result;
  }

  private addWithLimitReached(result: IResource[], part: Iterable<IResource>, memberLimit: number): boolean {
    for (const item of part) {
      result.push(item);
      if (result.length >= memberLimit) {
        return true;
      }
    }

    return false;
  }
}
