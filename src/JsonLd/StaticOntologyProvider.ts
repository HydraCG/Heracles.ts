import { promises as jsonLd } from "jsonld";
import { IDictionary } from "../IDictionary";
import { rdfs } from "../namespaces";
import { IOntologyProvider } from "./IOntologyProvider";

/**
 * Provides a simple implementation of the RDF predicate range-domain provider that uses statically provided ontology.
 */
export default class StaticOntologyProvider implements IOntologyProvider {
  private readonly jsonLdOntology: object;
  private ontology: IDictionary<any>;

  /**
   * Initializes a new instance of the {@link StaticOntologyProvider} class.
   * @param {object} context JSON-LD encoded RDF ontology to use as range-domain source.
   */
  public constructor(ontology: object) {
    this.jsonLdOntology = ontology;
    this.ontology = null;
  }

  /** @inheritDoc */
  public getDomainFor(predicate: string): Promise<string> {
    return this.getValueOf(predicate, rdfs.domain);
  }

  /** @inheritDoc */
  public getRangeFor(predicate: string): Promise<string> {
    return this.getValueOf(predicate, rdfs.range);
  }

  private async ensureInitialized(): Promise<void> {
    if (this.ontology === null) {
      const ontology = await jsonLd.flatten(this.jsonLdOntology);
      const map = {};
      for (const term of ontology) {
        map[term["@id"]] = term;
      }

      this.ontology = map;
    }
  }

  private async getValueOf(iri: string, predicate: string): Promise<string> {
    await this.ensureInitialized();
    let resource: any = this.ontology[iri] || null;
    if (resource !== null) {
      resource = resource[predicate] || null;
    }

    if (resource !== null) {
      resource = resource[0]["@id"] || null;
    }

    return resource;
  }
}
