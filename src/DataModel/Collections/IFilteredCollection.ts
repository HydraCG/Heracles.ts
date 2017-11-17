/**
 * Provides an abstract description of a collection that can be filtered.
 * @interface
 */
export interface IFilteredCollection<T> extends Iterable<T> {
  /**
   * Gets the number of items in this collection.
   * @readonly
   * @returns {number}
   */
  readonly length: number;

  /**
   * Checks whether this collection has any items fitlered.
   * @returns {boolean}
   */
  any(): boolean;

  /**
   * Gets the first item of the collection or null if there are no items matching the criteria.
   * @returns {T}
   */
  first(): T;

  /**
   * Filters the collection with a generic match evaluator.
   * @param matchEvaluator {Function} Match evaluation delegate.
   * @returns {IFilteredCollection<T>}
   */
  where(matchEvaluator: (item: T) => boolean): IFilteredCollection<T>;
}
