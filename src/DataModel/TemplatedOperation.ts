import { hydra } from "../namespaces";
import HeadersCollection from "./Collections/HeadersCollection";
import ResourceFilterableCollection from "./Collections/ResourceFilterableCollection";
import TypesCollection from "./Collections/TypesCollection";
import { IIriTemplate } from "./IIriTemplate";
import { IOperation } from "./IOperation";
import { IPointingResource } from "./IPointingResource";
import { IResource } from "./IResource";
import { ITemplatedOperation } from "./ITemplatedOperation";
import { IDictionary, MappingBuilder } from "./ITemplatedResource";
import TemplatedResource from "./TemplatedResource";

/**
 * Provides a default implementation of the {@link ITemplatedOperation} interface.
 * @class
 */
export default class TemplatedOperation extends TemplatedResource<IOperation> implements ITemplatedOperation {
  private static id = 0;

  public readonly method: string;

  public readonly expects: ResourceFilterableCollection<IResource>;

  public readonly returns: ResourceFilterableCollection<IResource>;

  public readonly expectedHeaders: HeadersCollection;

  public readonly returnedHeaders: Iterable<string>;

  /**
   * Initializes a new instance of the {@link TemplatedOperation} class.
   * @param operationResource {IOperation} Original operation to create templated one from.
   * @param template {IIriTemplate} IRI template to take template from.
   */
  public constructor(operationResource: IOperation, template: IIriTemplate) {
    super(operationResource, template, [...operationResource.type].concat([hydra.Operation, hydra.IriTemplate]));
    this.method = operationResource.method;
    this.expects = operationResource.expects;
    this.returns = operationResource.returns;
    this.expectedHeaders = operationResource.expectedHeaders;
    this.returnedHeaders = operationResource.returnedHeaders;
  }

  public expand(mappedVariables: IDictionary | MappingBuilder): IOperation {
    return this.expandHeaders(mappedVariables, super.expand(mappedVariables) as any);
  }

  protected createInstance(resource: IPointingResource): IOperation {
    const result = resource as any;
    result.expects = this.expects;
    result.method = this.method;
    result.returnedHeaders = this.returnedHeaders;
    result.type = new TypesCollection([...this.type].filter(type => type !== hydra.IriTemplate));
    return result as IOperation;
  }

  protected getNextIri(): string {
    return `_:operation${++TemplatedOperation.id}`;
  }

  private expandHeaders(mappedVariables: IDictionary | MappingBuilder, result: any): IOperation {
    const expectedHeaders = [];
    for (const expectedHeader of this.expectedHeaders) {
      if (!!(expectedHeader as any).expand) {
        expectedHeaders.push((expectedHeader as any).expand(mappedVariables));
      } else {
        expectedHeaders.push(expectedHeader);
      }
    }

    result.expectedHeaders = new HeadersCollection(expectedHeaders);
    return result;
  }
}
