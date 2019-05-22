import ProcessingState from "./ProcessingState";

/**
 * Describes an abstract facility used for RDF-like type entailing.
 * @interface
 */
export interface IIndirectTypingProvider {
  /**
   * Checks whether a currently processed resource within a given processing state is of a given type.
   * @param expectedType {string} Type to check against.
   * @param {ProcessingState} processingState Current JSON-LD processing state.
   * @returns {Promise<boolean>}
   */
  isOfType(expectedType: string, processingState: ProcessingState): Promise<boolean>;
}
