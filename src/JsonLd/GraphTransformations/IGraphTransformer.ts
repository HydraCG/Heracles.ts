import { IHypermediaProcessingOptions } from "../../IHypermediaProcessingOptions";
import { IHypermediaProcessor } from "../../IHypermediaProcessor";

/**
 * Describes an abstract graph transforming facility.
 * @interface
 */
export interface IGraphTransformer {
  /**
   * Tranforms a given graph.
   * @param {object[]} graph Graph to be transformed.
   * @param {IHypermediaProcessor} processor Hypermedia processor requesting a graph transformation.
   * @param {IHypermediaProcessingOptions} options Additional processing options.
   * @returns {object[]}
   */
  transform(
    graph: object[],
    processor: IHypermediaProcessor,
    options?: IHypermediaProcessingOptions
  ): object[];
}
