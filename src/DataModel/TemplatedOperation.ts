import { hydra } from "../namespaces";
import ResourceFilterableCollection from "./Collections/ResourceFilterableCollection";
import TypesCollection from "./Collections/TypesCollection";
import { IClass } from "./IClass";
import { IIriTemplate } from "./IIriTemplate";
import { IOperation } from "./IOperation";
import { IPointingResource } from "./IPointingResource";
import { ITemplatedOperation } from "./ITemplatedOperation";
import TemplatedResource from "./TemplatedResource";

/**
 * Provides a default implementation of the {@link ITemplatedOperation} interface.
 * @class
 */
export default class TemplatedOperation extends TemplatedResource<IOperation> implements ITemplatedOperation {
  private static id = 0;

  public readonly method: string;

  public readonly expects: ResourceFilterableCollection<IClass>;

  /**
   * Initializes a new instance of the {@link TemplatedOperation} class.
   * @param operationResource {IOperation} Original operation to create templated one from.
   * @param template {IIriTemplate} IRI template to take template from.
   */
  public constructor(operationResource: IOperation, template: IIriTemplate) {
    super(operationResource, template, [...operationResource.type].concat([hydra.Operation, hydra.IriTemplate]));
    this.method = operationResource.method;
    this.expects = operationResource.expects;
  }

  protected createInstance(resource: IPointingResource): IOperation {
    const result = resource as any;
    result.expects = this.expects;
    result.method = this.method;
    result.type = new TypesCollection([...this.type].filter(type => type !== hydra.IriTemplate));
    return result as IOperation;
  }

  protected getNextIri(): string {
    return `_:operation${++TemplatedOperation.id}`;
  }
}
