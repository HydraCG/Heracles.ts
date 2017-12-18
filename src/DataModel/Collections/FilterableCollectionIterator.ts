/**
 * Provides an Iterator<T> implementation for the {@link FilterableCollection}.
 * @class
 */
export default class FilterableCollectionIterator<T> implements Iterator<T> {
  private readonly items: Iterator<T>;
  private readonly filters: { [predicate: string]: any };

  /**
   * Initializes a new instance of the {@link FilterableCollectionIterator<T>} class.
   * @param items {Iterable<T>} Collection of items to iterate through.
   * @param filters {{ [predicate: string]: any }} Dictionary of predicate-value pairs used for filtering.
   */
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
        (currentPredicateValue === expectedValue as any))
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
          !FilterableCollectionIterator.equals(expectedValue, item.value, predicate) &&
          !FilterableCollectionIterator.isInArray(expectedValue, item.value, predicate) &&
          !FilterableCollectionIterator.matchesRegex(expectedValue, item.value, predicate)
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
