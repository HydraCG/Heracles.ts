import { hydra } from "../namespaces";
import OperationsCollection from "./Collections/OperationsCollection";
import TypesCollection from "./Collections/TypesCollection";
import { IIriTemplate } from "./IIriTemplate";
import { ILink } from "./ILink";
import { IPointingResource } from "./IPointingResource";
import { ITemplatedLink } from "./ITemplatedLink";
import TemplatedResource from "./TemplatedResource";

/**
 * Provides a default implementation of the {@link ITemplatedLink} interface.
 * @class
 */
export default class TemplatedLink extends TemplatedResource<ILink> implements ITemplatedLink {
  private static id = 0;

  public readonly relation: string;

  public readonly supportedOperations: OperationsCollection;

  /**
   * Initializes a new instance of the {@link TemplatedLink} class.
   * @param linkResource {ILink} Original link to create templated one from.
   * @param template {IIriTemplate} IRI template to take template from.
   */
  public constructor(linkResource: ILink, template: IIriTemplate) {
    super(
      linkResource,
      template,
      [...linkResource.type].filter(type => type !== hydra.Link).concat([hydra.TemplatedLink])
    );
    this.relation = linkResource.relation;
    this.supportedOperations = linkResource.supportedOperations;
  }

  protected createInstance(resource: IPointingResource): ILink {
    const result = resource as any;
    result.relation = this.relation;
    result.supportedOperations = this.supportedOperations;
    result.type = new TypesCollection([...this.type].filter(type => type !== hydra.TemplatedLink).concat([hydra.Link]));
    return result as ILink;
  }

  protected getNextIri(): string {
    return `_:link${++TemplatedLink.id}`;
  }
}
