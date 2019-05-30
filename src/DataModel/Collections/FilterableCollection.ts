import { IDictionary } from "../../IDictionary";
import FilterableCollectionIterator from "./FilterableCollectionIterator";

const empty: any[] = [];

/**
 * Provides a base functionality of a collection that filters itself with given predicates.
 * @abstract
 * @class
 */
export default abstract class FilterableCollection<T> {
  private readonly items: Iterable<T>;
  private filters: IDictionary<any> = {};

  /**
   * Initializes a new instance of the {@link FilterableCollection<T>} class
   * with initial collections of items to filter.
   * @param {Iterable<T>} [items] Initial collection of items to filter.
   */
  protected constructor(items?: Iterable<T>) {
    let actualItems = items;
    if (!actualItems || typeof items[Symbol.iterator] !== "function") {
      actualItems = empty;
    }

    this.items = actualItems;
  }

  /**
   * Gets the number of items in this collection.
   * @readonly
   * @returns {number}
   */
  public get length(): number {
    let result = 0;
    const iterator = this[Symbol.iterator]();
    while (!iterator.next().done) {
      result++;
    }

    return result;
  }

  /**
   * Checks whether this collection has any items fitlered.
   * @returns {boolean}
   */
  public any(): boolean {
    return !this[Symbol.iterator]().next().done;
  }

  /**
   * Gets the first item of the collection or null if there are no items matching the criteria.
   * @returns {T}
   */
  public first(): T {
    const result = this[Symbol.iterator]().next();
    return !result.done ? result.value : null;
  }

  /**
   * Gets the last item of the collection or null if there are no items matching the criteria.
   * @returns {T}
   */
  public last(): T {
    let result: T = null;
    for (const item of this) {
      result = item;
    }

    return result;
  }

  /**
   * Filters the collection with a generic match evaluator.
   * @param {Function} matchEvaluator Match evaluation delegate.
   * @returns {IFilterableCollection<T>}
   */
  public where(matchEvaluator: (item: T) => boolean): FilterableCollection<T> {
    let result: FilterableCollection<T> = this;
    if (!!matchEvaluator) {
      const predicate = Object.keys(this.filters)
        .filter(key => key.charAt(0) === "_")
        .map(key => parseInt(key.substr(1), 10))
        .sort()
        .reduce((previousValue, currentValue) => currentValue, 0);
      result = this.narrowFiltersWith<T>("_" + predicate, matchEvaluator);
    }

    return result;
  }

  /**
   * Flattens this collection to a standard array.
   * @returns {T[]}
   */
  public toArray(): T[] {
    const result = [];
    for (const item of this) {
      result.push(item);
    }

    return result;
  }

  /** @inheritDoc */
  public [Symbol.iterator](): Iterator<T> {
    return new FilterableCollectionIterator<T>(this.items, this.filters);
  }

  /**
   * Creates a new instance of the collection.
   * @param {Iterable<T>} items Initial collection of items to filter.
   * @abstract
   * @returns {FilterableCollection<T>}
   */
  protected abstract createInstance(items: Iterable<T>): FilterableCollection<T>;

  /**
   * Creates a new instance of the {@link FilterableCollection} with filter made narrower with given predicate.
   * @param {string} predicate Predicate of the filter.
   * @param {Function} matchEvaluator Match evaluator of the predicate to filter.
   * @returns {FilterableCollection<T>}
   */
  protected narrowFiltersWith<TValue>(
    predicate: string,
    matchEvaluator: (item: TValue) => boolean
  ): FilterableCollection<T>;

  /**
   * Creates a new instance of the {@link FilterableCollection} with filter made narrower with given predicate.
   * @param {string} predicate Predicate of the filter.
   * @param {string | RegExp} value Either value or regular expression to match the value of the predicate to filter.
   * @returns {FilterableCollection<T>}
   */
  protected narrowFiltersWith(predicate: string, value: string | RegExp): FilterableCollection<T>;

  protected narrowFiltersWith(predicate: string, value: any): FilterableCollection<T> {
    const result = this.createInstance(this.items);
    for (const filter of Object.keys(this.filters)) {
      result.filters[filter] = this.filters[filter];
    }

    if (!value) {
      delete result.filters[predicate];
    } else {
      result.filters[predicate] = value;
    }

    return result;
  }
}
