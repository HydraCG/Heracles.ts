/**
 * Provides an abstraction over a vocabulary.
 * @interface
 */
export interface IVocabularyProvider {
  /**
   * Gets the domain for a given property if defined; otherwise null;
   * @param {string} predicate IRI of the predicate for which to obtain a domain.
   * @returns {string}
   */
  getDomainFor(predicate: string): Promise<string>;

  /**
   * Gets the range for a given property if defined; otherwise null;
   * @param {string} predicate IRI of the predicate for which to obtain a range.
   * @returns {string}
   */
  getRangeFor(predicate: string): Promise<string>;
}
