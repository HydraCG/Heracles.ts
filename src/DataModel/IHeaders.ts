/**
 * Describes an abstract headers collection.
 * @interface
 */
export interface IHeaders {
  /**
   * Gets a header of a given name.
   * @param {string} name Name of the header to obtain.
   * @returns {string | null}
   */
  get(name: string): string | null;

  /**
   * Checks whether the collection has a header of a given name.
   * @param {string} name Name of the header to check for existence.
   * @returns {boolean}
   */
  has(name: string): boolean;
}
