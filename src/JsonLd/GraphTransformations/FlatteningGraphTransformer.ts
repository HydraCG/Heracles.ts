import { IHypermediaProcessingOptions } from "../../../src/IHypermediaProcessingOptions";
import { IHypermediaProcessor } from "../../IHypermediaProcessor";
import { IGraphTransformer } from "./IGraphTransformer";

/**
 * Flattens a given graph.
 */
export default class FlatteningGraphTransformer implements IGraphTransformer {
  /** @inheritDoc */
  public async transform(
    graph: object[],
    processor: IHypermediaProcessor,
    options?: IHypermediaProcessingOptions
  ): Promise<object[]> {
    let result = graph;
    if (graph.find(_ => _["@graph"])) {
      result = [].concat.apply(
        [],
        graph[0]["@graph"].map(item => (item["@id"] && item["@graph"] ? item["@graph"] : [item]))
      );
    }

    return result;
  }
}
