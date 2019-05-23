import { hydra } from "../namespaces";
import OperationsCollection from "./Collections/OperationsCollection";
import TypesCollection from "./Collections/TypesCollection";
import { IIriTemplate } from "./IIriTemplate";
import { ILink } from "./ILink";
import { IPointingResource } from "./IPointingResource";
import { ITemplatedLink } from "./ITemplatedLink";
import TemplatedResource from "./TemplatedResource";

const templatedLink = [hydra.TemplatedLink];
const link = [hydra.Link];

/**
 * Provides a default implementation of the {@link ITemplatedLink} interface.
 * @class
 */
export default class TemplatedLink extends TemplatedResource<ILink> implements ITemplatedLink {
  private static id = 0;

  /** @inheritDoc */
  public readonly relation: string;

  /** @inheritDoc */
  public readonly supportedOperations: OperationsCollection;

  /**
   * Initializes a new instance of the {@link TemplatedLink} class.
   * @param {ILink} linkResource Original link to create templated one from.
   * @param {IIriTemplate} template IRI template to take template from.
   */
  public constructor(linkResource: ILink, template: IIriTemplate) {
    super(
      linkResource,
      template,
      linkResource.type
        .except(hydra.Link)
        .toArray()
        .concat(templatedLink)
    );
    this.relation = linkResource.relation;
    this.supportedOperations = linkResource.supportedOperations;
  }

  protected createInstance(resource: IPointingResource): ILink {
    const result = resource as any;
    result.relation = this.relation;
    result.supportedOperations = this.supportedOperations;
    result.type = new TypesCollection(
      this.type
        .except(hydra.TemplatedLink)
        .toArray()
        .concat(link)
    );
    return result as ILink;
  }

  protected getNextIri(): string {
    return `_:link${++TemplatedLink.id}`;
  }
}
