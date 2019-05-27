import * as URITemplate from "uri-templates";
import { IDictionary } from "../IDictionary";
import { hydra } from "../namespaces";
import CollectionsCollection from "./Collections/CollectionsCollection";
import LinksCollection from "./Collections/LinksCollection";
import MappingsCollection from "./Collections/MappingsCollection";
import OperationsCollection from "./Collections/OperationsCollection";
import TypesCollection from "./Collections/TypesCollection";
import { IIriTemplate } from "./IIriTemplate";
import { IPointingResource } from "./IPointingResource";
import { IResource } from "./IResource";
import { ITemplatedResource, MappingBuilder } from "./ITemplatedResource";
import MappingsBuilder from "./MappingsBuilder";

/**
 * Provides a base functionality for resources that has expandable template.
 * @class
 */
export default abstract class TemplatedResource<T extends IPointingResource> implements ITemplatedResource<T> {
  /** @inheritDoc */
  public readonly baseUrl: string;

  /** @inheritDoc */
  public readonly iri: string;

  /** @inheritDoc */
  public readonly type: TypesCollection;

  /** @inheritDoc */
  public readonly target: IResource;

  /** @inheritDoc */
  public readonly operations: OperationsCollection;

  /** @inheritDoc */
  public readonly links: LinksCollection;

  /** @inheritDoc */
  public readonly collections: CollectionsCollection;

  private readonly template: string;
  private readonly mappings: MappingsCollection;

  /**
   * Initializes a new instance of the {@link TemplatedOperation} class.
   * @param {IPointingResource} resource Original resource to create templated one from.
   * @param {IIriTemplate} template IRI template to take template from.
   * @param {Iterable<string>} type Types of the resource.
   */
  protected constructor(resource: IPointingResource, template: IIriTemplate, type: Iterable<string>) {
    this.baseUrl = resource.baseUrl;
    this.iri = resource.iri;
    this.links = LinksCollection.empty;
    this.collections = new CollectionsCollection();
    this.type = new TypesCollection(type);
    this.target = null;
    this.template = template.template;
    this.mappings = template.mappings;
    this.operations = OperationsCollection.empty;
  }

  /** @inheritDoc */
  public expandTarget(mappedVariables: IDictionary<string> | MappingBuilder): T {
    if (mappedVariables instanceof Function) {
      const builder = new MappingsBuilder(this.mappings);
      mappedVariables(builder);
      return this.expandTarget(builder.complete());
    }

    const templateVariables = mappedVariables as IDictionary<string>;
    const targetUri = URITemplate(this.template)
      .fillFromObject(templateVariables)
      .toString();
    const target = targetUri.match(/^[a-zA-Z][a-zA-Z0-9_]*:/) ? targetUri : new URL(targetUri, this.baseUrl).toString();
    return this.createInstance({
      baseUrl: this.baseUrl,
      collections: this.collections,
      iri: this.getNextIri(),
      links: this.links,
      operations: this.operations,
      target: { iri: target, type: TypesCollection.empty },
      type: new TypesCollection(this.type.except(hydra.IriTemplate).toArray())
    });
  }

  /**
   * Creates a new instance of the object of type T.
   * @param {IPointingResource} resource Resource to act as a bag of initial values.
   * @returns {T}
   */
  protected abstract createInstance(resource: IPointingResource): T;

  /**
   * Gets a next IRI.
   * @returns {string}
   */
  protected abstract getNextIri(): string;
}
