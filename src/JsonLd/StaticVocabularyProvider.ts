import { promises as jsonLd } from "jsonld";
import { rdfs } from "../namespaces";
import { IVocabularyProvider } from "./IVocabularyProvider";

/**
 * Provides a simple implementation of the RDF predicate range-domain provider that uses statically provided vocabulary.
 */
export default class StaticVocabularyProvider implements IVocabularyProvider {
  private readonly jsonLdVocabulary: object;
  private vocabulary: object[];

  /**
   * Initializes a new instance of the {@link StaticVocabularyProvider} class.
   * @param {object} context JSON-LD encoded RDF vocabulary to use as range-domain source.
   */
  public constructor(vocabulary: object) {
    this.jsonLdVocabulary = vocabulary;
    this.vocabulary = null;
  }

  public getDomainFor(predicate: string): Promise<string> {
    return this.getValueOf(predicate, rdfs.domain);
  }

  public getRangeFor(predicate: string): Promise<string> {
    return this.getValueOf(predicate, rdfs.range);
  }

  private async ensureInitialized(): Promise<void> {
    if (this.vocabulary === null) {
      this.vocabulary = await jsonLd.flatten(this.jsonLdVocabulary);
    }
  }

  private async findByIri(iri: string): Promise<object> {
    await this.ensureInitialized();
    for (const resource of this.vocabulary) {
      if (resource["@id"] === iri) {
        return resource;
      }
    }

    return null;
  }

  private async getValueOf(iri: string, predicate: string): Promise<string> {
    let resource: any = await this.findByIri(iri);
    if (resource !== null) {
      resource = resource[predicate] || null;
    }

    if (resource != null) {
      resource = resource[0]["@id"] || null;
    }

    return resource;
  }
}
