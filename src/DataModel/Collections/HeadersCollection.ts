import { IHeader } from "../IHeader";
import FilterableCollection from "./FilterableCollection";

/**
 * Provides a collection of headers that can be filtered with relevant criteria.
 * @class
 */
export default class HeadersCollection extends FilterableCollection<IHeader> {
  /**
   * Initializes a new instance of the {@link HeadersCollection} class with initial collections of headers to filter.
   * @param headers {Iterable<IHeader>} Initial collection of headers to filter.
   */
  public constructor(headers: Iterable<IHeader>) {
    super(headers);
  }

  /**
   * Obtains header of a given name.
   * @param name {string} Header name to look for.
   * @returns {IHeader}
   */
  public ofName(name: string): IHeader {
    return this.where(item => item.name === name).first();
  }

  protected createInstance(items: Iterable<IHeader>): HeadersCollection {
    return new HeadersCollection(items);
  }
}
