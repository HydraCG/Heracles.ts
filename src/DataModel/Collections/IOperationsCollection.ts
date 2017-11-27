import { IOperation } from "../IOperation";
import { ITypedResourceFilterableCollection } from "./ITypedResourceFilterableCollection";

/**
 * Provides an abstract description of the collection of {@link IOperation} that can be filtered with relevant criteria.
 * @interface
 */
export interface IOperationsCollection extends ITypedResourceFilterableCollection<IOperation> {
  /**
   * Obtains a collection of operations expecting a given type.
   * @param iri {string} Expected type.
   * @returns {IOperationsCollection}
   */
  expecting(iri: string): IOperationsCollection;

  /**
   * Obtains a collection of operations being an Hydra IriTemplate.
   * @returns {IOperationsCollection}
   */
  withTemplate(): IOperationsCollection;
}
