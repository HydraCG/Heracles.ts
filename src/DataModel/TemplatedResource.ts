import * as URITemplate from "uri-templates";
import { hydra } from "../namespaces";
import LinksCollection from "./Collections/LinksCollection";
import MappingsCollection from "./Collections/MappingsCollection";
import OperationsCollection from "./Collections/OperationsCollection";
import ResourceFilterableCollection from "./Collections/ResourceFilterableCollection";
import TypesCollection from "./Collections/TypesCollection";
import { ICollection } from "./ICollection";
import { IIriTemplate } from "./IIriTemplate";
import { IPointingResource } from "./IPointingResource";
import { IResource } from "./IResource";
import { IDictionary, ITemplatedResource, MappingBuilder } from "./ITemplatedResource";
import MappingsBuilder from "./MappingsBuilder";

/**
 * Provides a base functionality for resources that has expandable template.
 * @class
 */
export default abstract class TemplatedResource<T extends IPointingResource> implements ITemplatedResource<T> {
  public readonly baseUrl: string;

  public readonly iri: string;

  public readonly type: TypesCollection;

  public readonly target: IResource;

  public readonly operations: OperationsCollection;

  public readonly links: LinksCollection;

  public readonly collections: ResourceFilterableCollection<ICollection>;

  private readonly template: string;

  private readonly mappings: MappingsCollection;

  /**
   * Initializes a new instance of the {@link TemplatedOperation} class.
   * @param {IPointingResource} resource Original resource to create templated one from.
   * @param {IIriTemplate} template IRI template to take template from.
   * @param {string} type Types of the resource.
   */
  protected constructor(resource: IPointingResource, template: IIriTemplate, type: Iterable<string>) {
    const types = Array.from(type);
    this.baseUrl = resource.baseUrl;
    this.iri = resource.iri;
    this.links = new LinksCollection([]);
    this.collections = new ResourceFilterableCollection<ICollection>([]);
    this.type = new TypesCollection(types.filter((item, index) => types.indexOf(item) === index));
    this.target = null;
    this.template = template.template;
    this.mappings = template.mappings;
    this.operations = new OperationsCollection([]);
  }

  public expandTarget(mappedVariables: IDictionary | MappingBuilder): T {
    if (mappedVariables instanceof Function) {
      const builder = new MappingsBuilder(this.mappings);
      mappedVariables(builder);
      return this.expandTarget(builder.complete());
    }

    const templateVariables = mappedVariables as IDictionary;
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
      target: { iri: target, type: new TypesCollection([]) },
      type: new TypesCollection([...this.type].filter(type => type !== hydra.IriTemplate))
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
