import { promises as jsonLd } from "jsonld";
import { rdfs } from "../namespaces";
import { IOntologyProvider } from "./IOntologyProvider";

/**
 * Provides a simple implementation of the RDF predicate range-domain provider that uses statically provided ontology.
 */
export default class StaticOntologyProvider implements IOntologyProvider {
  private readonly jsonLdOntology: object;
  private ontology: object[];

  /**
   * Initializes a new instance of the {@link StaticOntologyProvider} class.
   * @param {object} context JSON-LD encoded RDF ontology to use as range-domain source.
   */
  public constructor(ontology: object) {
    this.jsonLdOntology = ontology;
    this.ontology = null;
  }

  public getDomainFor(predicate: string): Promise<string> {
    return this.getValueOf(predicate, rdfs.domain);
  }

  public getRangeFor(predicate: string): Promise<string> {
    return this.getValueOf(predicate, rdfs.range);
  }

  private async ensureInitialized(): Promise<void> {
    if (this.ontology === null) {
      this.ontology = await jsonLd.flatten(this.jsonLdOntology);
    }
  }

  private async findByIri(iri: string): Promise<object> {
    await this.ensureInitialized();
    for (const resource of this.ontology) {
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
