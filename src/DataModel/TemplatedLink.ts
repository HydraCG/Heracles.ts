import * as URITemplate from "uri-templates";
import { hydra } from "../namespaces";
import LinksCollection from "./Collections/LinksCollection";
import OperationsCollection from "./Collections/OperationsCollection";
import TypesCollection from "./Collections/TypesCollection";
import { IIriTemplate } from "./IIriTemplate";
import { ILink } from "./ILink";
import { ITemplatedLink } from "./ITemplatedLink";

/**
 * Provides a default implementation of the {@link ITemplatedLink} interface.
 * @class
 */
export default class TemplatedLink implements ITemplatedLink {
  private static id = 0;

  private readonly template: string;

  public readonly baseUrl: string;

  public readonly iri: string;

  public readonly target: string;

  public readonly type: TypesCollection;

  public readonly operations: OperationsCollection;

  public readonly links: LinksCollection;

  /**
   * Initializes a new instance of the {@link TemplatedLink} class.
   * @param linkResource {ILink} Original link to create templated one from.
   * @param template {IIriTemplate} IRI template to take template from.
   */
  public constructor(linkResource: ILink, template: IIriTemplate) {
    let types = [...linkResource.type].concat([hydra.Link, hydra.TemplatedLink]);
    types =  types.filter((type, index) => types.indexOf(type) === index);
    this.baseUrl = linkResource.baseUrl;
    this.iri = linkResource.iri;
    this.target = null;
    this.type = new TypesCollection(types.filter((type, index) => types.indexOf(type) === index));
    this.template = template.template;
    this.links = new LinksCollection([]);
    this.operations = new OperationsCollection([]);
  }

  public expandTarget(templateVariables: { [name: string]: string }): ILink {
    const target = URITemplate(this.template)
      .fillFromObject(templateVariables)
      .toString();
    return {
      baseUrl: this.baseUrl,
      iri: `_:blankLink${++TemplatedLink.id}`,
      links: this.links,
      operations: this.operations,
      target: target.match(/^[a-zA-Z][a-zA-Z0-9_]*:/) ? target : new URL(target, this.baseUrl).toString(),
      type: new TypesCollection([...this.type].filter(type => type !== hydra.TemplatedLink))
    };
  }
}
