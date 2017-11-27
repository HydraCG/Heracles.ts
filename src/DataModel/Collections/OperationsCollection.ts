import { hydra } from "../../namespaces";
import { IClass } from "../IClass";
import { IOperation } from "../IOperation";
import { IOperationsCollection } from "./IOperationsCollection";
import TypedResourceFilteredCollection from "./TypedResourceFilterableCollection";

/**
 * Provides a collection of {@link IOperation} that can be filtered with relevant criteria.
 * @class
 */
export default class OperationsCollection extends TypedResourceFilteredCollection<IOperation>
  implements IOperationsCollection {
  /**
   * Initializes a new instance of the {@link OperationsCollection}
   * class with initial collections of operations to filter.
   * @param operations {Iterable<IOperation>} Initial collection of operations to filter.
   */
  public constructor(operations: Iterable<IOperation>) {
    super(operations);
  }

  public expecting(iri: string): IOperationsCollection {
    return this.narrowFiltersWith<IClass>("expects", value => value.iri === iri) as OperationsCollection;
  }

  public withTemplate(): IOperationsCollection {
    return this.ofType(hydra.IriTemplate) as OperationsCollection;
  }

  protected createInstance(items: Iterable<IOperation>): OperationsCollection {
    return new OperationsCollection(items);
  }
}
