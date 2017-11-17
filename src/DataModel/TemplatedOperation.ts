import * as URITemplate from "uri-templates";
import { hydra } from "../namespaces";
import { IOperationsCollection } from "./Collections/IOperationsCollection";
import { ITypedResourceFilteredCollection } from "./Collections/ITypedResourceFilteredCollection";
import { ITypesCollection } from "./Collections/ITypesCollection";
import OperationsCollection from "./Collections/OperationsCollection";
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
  private readonly template: string;

  public readonly baseUrl: string;

  public readonly iri: string;

  public readonly is: ITypesCollection;

  public readonly target: string;

  public readonly method: string;

  public readonly expects: ITypedResourceFilteredCollection<IClass>;

  public readonly operations: IOperationsCollection;

  /**
   * Initializes a new instance of the {@link TemplatedOperation} class.
   * @param operationResource {IOperation} Original operation to create templated one from.
   * @param template {IIriTemplate} IRI template to take template from.
   */
  public constructor(operationResource: IOperation, template: IIriTemplate) {
    this.baseUrl = operationResource.baseUrl;
    this.iri = `_:b${Math.random()
      .toString()
      .substr(2)}`;
    this.is = new TypesCollection([hydra.Operation, hydra.IriTemplate]);
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
      iri:
        "_:b" +
        Math.random()
          .toString()
          .substr(2),
      is: new TypesCollection([hydra.Operation]),
      method: this.method,
      operations: this.operations,
      target: target.match(/^[a-zA-Z][a-zA-Z0-9_]*:/) ? target : new URL(target, this.baseUrl).toString()
    };
  }
}
