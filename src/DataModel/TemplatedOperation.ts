import * as URITemplate from "uri-templates";
import { hydra } from "../namespaces";
import OperationsCollection from "./Collections/OperationsCollection";
import ResourceFilterableCollection from "./Collections/ResourceFilterableCollection";
import TypesCollection from "./Collections/TypesCollection";
import { IClass } from "./IClass";
import { IIriTemplate } from "./IIriTemplate";
import { IOperation } from "./IOperation";
import { ITemplatedOperation } from "./ITemplatedOperation";

/**
 * Provides a default implementation of the {@link ITemplatedOperation} interface.
 * @class
 */
export default class TemplatedOperation implements ITemplatedOperation {
  private static id = 0;

  private readonly template: string;

  public readonly baseUrl: string;

  public readonly iri: string;

  public readonly type: TypesCollection;

  public readonly target: string;

  public readonly method: string;

  public readonly expects: ResourceFilterableCollection<IClass>;

  public readonly operations: OperationsCollection;

  /**
   * Initializes a new instance of the {@link TemplatedOperation} class.
   * @param operationResource {IOperation} Original operation to create templated one from.
   * @param template {IIriTemplate} IRI template to take template from.
   */
  public constructor(operationResource: IOperation, template: IIriTemplate) {
    const types = [...operationResource.type].concat([hydra.Operation, hydra.IriTemplate]);
    this.baseUrl = operationResource.baseUrl;
    this.iri = `_:bnode${++TemplatedOperation.id}`;
    this.type = new TypesCollection(types.filter((type, index) => types.indexOf(type) === index));
    this.method = operationResource.method;
    this.expects = operationResource.expects;
    this.target = null;
    this.template = template.template;
    this.operations = new OperationsCollection([]);
  }

  public expandTarget(templateVariables: { [name: string]: string }): IOperation {
    const target = URITemplate(this.template)
      .fillFromObject(templateVariables)
      .toString();
    return {
      baseUrl: this.baseUrl,
      expects: this.expects,
      iri: `_:bnode${++TemplatedOperation.id}`,
      method: this.method,
      operations: this.operations,
      target: target.match(/^[a-zA-Z][a-zA-Z0-9_]*:/) ? target : new URL(target, this.baseUrl).toString(),
      type: new TypesCollection([...this.type].filter(type => type !== hydra.IriTemplate))
    };
  }
}
