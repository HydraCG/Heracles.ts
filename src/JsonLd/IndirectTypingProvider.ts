import { IIndirectTypingProvider } from "./IIndirectTypingProvider";
import { IOntologyProvider } from "./IOntologyProvider";
import { JsonLdHelper as JsonLd } from "./JsonLdHelper";
import ProcessingState from "./ProcessingState";

/**
 * Provides a logic checking type of RDF resources.
 */
export default class IndirectTypingProvider implements IIndirectTypingProvider {
  private readonly ontologyProvider: IOntologyProvider;

  /**
   * Initializes a new instance of the {@link IndirectTypingProvider} class.
   * @param {IOntologyProvider} ontologyProvider Provider of predicate range-domain details.
   */
  public constructor(ontologyProvider: IOntologyProvider) {
    this.ontologyProvider = ontologyProvider;
  }

  /**
   * Checks whether a currently processed resource within a given processing state is of a given type.
   * @param expectedType {string} Type to check against.
   * @param {ProcessingState} processingState Current JSON-LD processing state.
   * @returns {Promise<boolean>}
   */
  public async isOfType(expectedType: string, processingState: ProcessingState): Promise<boolean> {
    return (
      this.isOfClass(expectedType, processingState) ||
      (await this.isInDomainOfPredicate(expectedType, processingState)) ||
      (await this.isInRangeOfPredicate(expectedType, processingState))
    );
  }

  private isOfClass(expectedType: string, processingState: ProcessingState): boolean {
    return (
      processingState.processedObject["@type"] instanceof Array &&
      processingState.processedObject["@type"].indexOf(expectedType) !== -1
    );
  }

  private async isInDomainOfPredicate(expectedType: string, processingState: ProcessingState): Promise<boolean> {
    for (const property of JsonLd.validKeys(processingState.processedObject)) {
      const domain = await this.ontologyProvider.getDomainFor(property);
      if (domain === expectedType) {
        return true;
      }
    }

    return false;
  }

  private async isInRangeOfPredicate(expectedType: string, processingState: ProcessingState): Promise<boolean> {
    const ownerResource = processingState.findRawResource(processingState.parentIri);
    if (!ownerResource) {
      return false;
    }

    for (const property of JsonLd.validKeys(ownerResource)) {
      const range = await this.ontologyProvider.getRangeFor(property);
      if (
        range === expectedType &&
        ownerResource[property].find(_ => _["@id"] === processingState.processedObject["@id"])
      ) {
        return true;
      }
    }

    return false;
  }
}
