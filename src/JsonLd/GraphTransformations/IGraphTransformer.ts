import { IHypermediaProcessingOptions } from "../../IHypermediaProcessingOptions";
import { IHypermediaProcessor } from "../../IHypermediaProcessor";

export interface IGraphTransformer {
  /**
   * Tranforms a given graph.
   * @param {object[]} graph Graph to be transformed.
   * @param {IHypermediaProcessor} Hypermedia processor requesting a graph transformation.
   * @param {IHypermediaProcessingOptions} options Additional processing options.
   * @returns {Promise<void>}
   */
  transform(
    graph: object[],
    processor: IHypermediaProcessor,
    options?: IHypermediaProcessingOptions): Promise<object[]>;
}