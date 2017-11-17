import { IFilteredCollection } from "./IFilteredCollection";

/**
 * Provides a base functionality of a collection that filters itself with given predicates.
 * @abstract
 * @class
 */
export default abstract class FilteredCollection<T> implements IFilteredCollection<T> {
  private readonly items: Iterable<T>;
  private filters: { [predicate: string]: any } = {};

  /**
   * Initializes a new instance of the {@link FilteredCollection<T>} class with initial collections of items to filter.
   * @param items {Iterable<T>} Initial collection of items to filter.
   */
  protected constructor(items: Iterable<T>) {
    this.items = items || new Array<T>();
  }

  public get length(): number {
    let result = 0;
    for (const item of this) {
      result++;
    }

    return result;
  }

  public any(): boolean {
    for (const item of this) {
      return true;
    }

    return false;
  }

  public first(): T {
    for (const item of this) {
      return item;
    }

    return null;
  }

  public where(matchEvaluator: (item: T) => boolean): IFilteredCollection<T> {
    const predicate = Object.keys(this.filters)
      .filter(key => key.charAt(0) === "_")
      .map(key => parseInt(key.substr(1), 10))
      .sort()
      .reduce((previousValue, currentValue) => currentValue, 0);
    return this.narrowFiltersWith<T>("_" + predicate, matchEvaluator);
  }

  public [Symbol.iterator](): Iterator<T> {
    return new FilteredCollectionIterator<T>(this.items, this.filters);
  }

  /**
   * @abstract
   * Creates a new instance of the collection.
   * @param items {Iterable<T>} Initial collection of items to filter.
   * @returns {FilteredCollection<T>}
   */
  protected abstract createInstance(items: Iterable<T>): FilteredCollection<T>;

  /**
   * Creates a new instance of the {@link FilteredCollection} with filter made narrower with given predicate.
   * @param predicate {string} Predicate of the filter.
   * @param matchEvaluator {Function} Match evaluator of the predicate to filter.
   * @returns {FilteredCollection<T>}
   */
  protected narrowFiltersWith<TValue>(
    predicate: string,
    matchEvaluator: (item: TValue) => boolean
  ): FilteredCollection<T>;

  /**
   * Creates a new instance of the {@link FilteredCollection} with filter made narrower with given predicate.
   * @param predicate {string} Predicate of the filter.
   * @param value {string | RegExp} Either value or regular expression to match the value of the predicate to filter.
   * @returns {FilteredCollection<T>}
   */
  protected narrowFiltersWith(predicate: string, value: string | RegExp): FilteredCollection<T>;

  protected narrowFiltersWith(predicate: string, value: any): FilteredCollection<T> {
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

/* tslint:disable:max-classes-per-file */
class FilteredCollectionIterator<T> implements Iterator<T> {
  private readonly items: Iterator<T>;
  private readonly filters: { [predicate: string]: any };

  public constructor(items: Iterable<T>, filters: { [predicate: string]: any }) {
    this.items = items[Symbol.iterator]();
    this.filters = filters;
  }

  public next(): IteratorResult<T> {
    const nextMatching = this.getNextMatchingItemFrom(this.items);
    if (nextMatching === null) {
      return { value: null, done: true };
    }

    return { value: nextMatching, done: false };
  }

  private static isInArray(expectedValue: any, itemValue: any, predicate: any): boolean {
    const currentPredicateValue = itemValue[predicate];
    if (
      !!currentPredicateValue &&
      currentPredicateValue[Symbol.iterator] &&
      typeof currentPredicateValue !== "string"
    ) {
      for (const item of currentPredicateValue) {
        if (item === expectedValue || (typeof expectedValue === "function" && expectedValue(item))) {
          return true;
        }
      }
    }

    return false;
  }

  private static matchesRegex(expectedValue: any, itemValue: any, predicate: any): boolean {
    const currentPredicateValue = itemValue[predicate];
    return !!currentPredicateValue && expectedValue instanceof RegExp && expectedValue.test(currentPredicateValue);
  }

  private static equals(expectedValue: any, itemValue: any, predicate: any): boolean {
    const currentPredicateValue = itemValue[predicate];
    return (
      (typeof expectedValue === "function" && expectedValue(itemValue)) ||
      (!!currentPredicateValue &&
        !(currentPredicateValue instanceof Array) &&
        !(expectedValue instanceof RegExp) &&
        (currentPredicateValue === (expectedValue as any) || expectedValue(currentPredicateValue)))
    );
  }

  private getNextMatchingItemFrom(iterator: Iterator<T>): T {
    let item: IteratorResult<T> = iterator.next();
    while (!item.done) {
      let isMatch = true;
      for (const predicate of Object.keys(this.filters).filter(
        filter => !!item.value[filter] || filter.charAt(0) === "_"
      )) {
        const expectedValue = this.filters[predicate];
        if (
          !FilteredCollectionIterator.equals(expectedValue, item.value, predicate) &&
          !FilteredCollectionIterator.isInArray(expectedValue, item.value, predicate) &&
          !FilteredCollectionIterator.matchesRegex(expectedValue, item.value, predicate)
        ) {
          isMatch = false;
          break;
        }
      }

      if (isMatch) {
        return item.value;
      }

      item = iterator.next();
    }

    return null;
  }
}
