import { hydra } from "../../namespaces";
import { IClass } from "../IClass";
import { IOperation } from "../IOperation";
import TypedResourceFilterableCollection from "./TypedResourceFilterableCollection";

/**
 * Provides a collection of {@link IOperation} that can be filtered with relevant criteria.
 * @class
 */
export default class OperationsCollection extends TypedResourceFilterableCollection<IOperation> {
  /**
   * Initializes a new instance of the {@link OperationsCollection}
   * class with initial collections of operations to filter.
   * @param operations {Iterable<IOperation>} Initial collection of operations to filter.
   */
  public constructor(operations: Iterable<IOperation>) {
    super(operations);
  }

  /**
   * Obtains a collection of operations expecting a given type.
   * @param iri {string} Expected type.
   * @returns {OperationsCollection}
   */
  public expecting(iri: string): OperationsCollection {
    return this.narrowFiltersWith<IClass>("expects", value => value.iri === iri) as OperationsCollection;
  }

  /**
   * Obtains a collection of operations being an Hydra IriTemplate.
   * @returns {OperationsCollection}
   */
  public withTemplate(): OperationsCollection {
    return this.ofType(hydra.IriTemplate) as OperationsCollection;
  }

  protected createInstance(items: Iterable<IOperation>): OperationsCollection {
    return new OperationsCollection(items);
  }
}
