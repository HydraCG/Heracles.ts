/**
 * Describes an abstract dictionary of key-value pairs where key is always a string.
 * @interface
 */
export interface IDictionary<T> {
  /**
   * Gets a value by its key.
   */
  [key: string]: T;
}
