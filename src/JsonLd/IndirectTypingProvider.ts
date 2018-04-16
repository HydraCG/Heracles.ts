import { IVocabularyProvider } from "./IVocabularyProvider";
import ProcessingState from "./ProcessingState";

/**
 * Provides a logic checking type of RDF resources.
 */
export default class IndirectTypingProvider {
  private readonly vocabularyProvider: IVocabularyProvider;

  /**
   * Initializes a new instance of the {@link IndirectTypingProvider} class.
   * @param {IVocabularyProvider} vocabularyProvider Provider of predicate range-domain details.
   */
  public constructor(vocabularyProvider: IVocabularyProvider) {
    this.vocabularyProvider = vocabularyProvider;
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
    for (const property of Object.keys(processingState.processedObject).filter(key => key.charAt(0) !== "@")) {
      const domain = await this.vocabularyProvider.getDomainFor(property);
      if (domain === expectedType) {
        return true;
      }
    }

    return false;
  }

  private async isInRangeOfPredicate(expectedType: string, processingState: ProcessingState): Promise<boolean> {
    const ownerResource = processingState.payload.find(resource => resource["@id"] === processingState.parentIri);
    if (!ownerResource) {
      return false;
    }

    for (const property of Object.keys(ownerResource).filter(key => key.charAt(0) !== "@")) {
      const range = await this.vocabularyProvider.getRangeFor(property);
      if (
        range === expectedType &&
        ownerResource[property].find(resource => resource["@id"] === processingState.processedObject["@id"])
      ) {
        return true;
      }
    }

    return false;
  }
}
