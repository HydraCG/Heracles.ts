import * as URITemplate from "uri-templates";
import { hydra } from "../namespaces";
import LinksCollection from "./Collections/LinksCollection";
import OperationsCollection from "./Collections/OperationsCollection";
import TypesCollection from "./Collections/TypesCollection";
import { IIriTemplate } from "./IIriTemplate";
import { ILink } from "./ILink";
import { IResource } from "./IResource";
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

  public readonly relation: string;

  public readonly target: IResource;

  public readonly type: TypesCollection;

  public readonly operations: OperationsCollection;

  public readonly links: LinksCollection;

  /**
   * Initializes a new instance of the {@link TemplatedLink} class.
   * @param linkResource {ILink} Original link to create templated one from.
   * @param template {IIriTemplate} IRI template to take template from.
   */
  public constructor(linkResource: ILink, template: IIriTemplate) {
    const types = [...linkResource.type].filter(type => type !== hydra.Link).concat([hydra.TemplatedLink]);
    this.baseUrl = linkResource.baseUrl;
    this.iri = linkResource.iri;
    this.relation = linkResource.relation;
    this.target = null;
    this.type = new TypesCollection(types.filter((type, index) => types.indexOf(type) === index));
    this.template = template.template;
    this.links = new LinksCollection([]);
    this.operations = new OperationsCollection([]);
  }

  public expandTarget(templateVariables: { [name: string]: string }): ILink {
    const targetUri = URITemplate(this.template)
      .fillFromObject(templateVariables)
      .toString();
    const target = targetUri.match(/^[a-zA-Z][a-zA-Z0-9_]*:/) ? targetUri : new URL(targetUri, this.baseUrl).toString();
    return {
      baseUrl: this.baseUrl,
      iri: `_:blankLink${++TemplatedLink.id}`,
      links: this.links,
      operations: this.operations,
      relation: this.relation,
      target: { iri: target, type: new TypesCollection([]) },
      type: new TypesCollection([...this.type].filter(type => type !== hydra.TemplatedLink).concat([hydra.Link]))
    };
  }
}
