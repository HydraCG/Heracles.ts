import { hydra } from "../../namespaces";
import { IClass } from "../IClass";
import { IOperation } from "../IOperation";
import ResourceFilterableCollection from "./ResourceFilterableCollection";

/**
 * Provides a collection of {@link IOperation} that can be filtered with relevant criteria.
 * @class
 */
export default class OperationsCollection extends ResourceFilterableCollection<IOperation> {
  /**
   * Defines an empty operations collection.
   * @constant {OperationsCollection}
   */
  public static readonly empty = new OperationsCollection();

  /**
   * Initializes a new instance of the {@link OperationsCollection}
   * class with initial collections of operations to filter.
   * @param {Iterable<IOperation>} [operations] Initial collection of operations to filter.
   */
  public constructor(operations?: Iterable<IOperation>) {
    super(operations);
  }

  /**
   * Obtains a collection of operations using a given method.
   * @param {string} method Method to match.
   * @returns {OperationsCollection}
   */
  public ofMethod(method: string): OperationsCollection {
    let result: OperationsCollection = this;
    if (typeof method === "string" && method.length > 0) {
      result = this.narrowFiltersWith("method", method) as OperationsCollection;
    }

    return result;
  }

  /**
   * Obtains a collection of operations expecting a given type.
   * @param {string} iri Expected type.
   * @returns {OperationsCollection}
   */
  public expecting(iri: string): OperationsCollection {
    let result: OperationsCollection = this;
    if (typeof iri === "string" && iri.length > 0) {
      result = this.narrowFiltersWith<IClass>("expects", value => value.iri === iri) as OperationsCollection;
    }

    return result;
  }

  /**
   * Obtains a collection of operations returning a given type.
   * @param {string} iri Returned type.
   * @returns {OperationsCollection}
   */
  public returning(iri: string): OperationsCollection {
    let result: OperationsCollection = this;
    if (typeof iri === "string" && iri.length > 0) {
      result = this.narrowFiltersWith<IClass>("returns", value => value.iri === iri) as OperationsCollection;
    }

    return result;
  }

  /**
   * Obtains a collection of operations expecting a heaer.
   * @param {string} name Expected header name.
   * @returns {OperationsCollection}
   */
  public expectingHeader(name: string): OperationsCollection {
    let result: OperationsCollection = this;
    if (typeof name === "string" && name.length > 0) {
      result = this.narrowFiltersWith("expectedHeaders", name) as OperationsCollection;
    }

    return result;
  }

  /**
   * Obtains a collection of operations returning a header.
   * @param {string} name Returned header name.
   * @returns {OperationsCollection}
   */
  public returningHeader(name: string): OperationsCollection {
    let result: OperationsCollection = this;
    if (typeof name === "string" && name.length > 0) {
      result = this.narrowFiltersWith("returnedHeaders", name) as OperationsCollection;
    }

    return result;
  }

  /**
   * Obtains a collection of operations being an hydra:IriTemplate.
   * @returns {OperationsCollection}
   */
  public withTemplate(): OperationsCollection {
    return this.ofType(hydra.IriTemplate) as OperationsCollection;
  }

  /** @inheritdoc */
  protected createInstance(items: Iterable<IOperation>): OperationsCollection {
    return new OperationsCollection(items);
  }
}
