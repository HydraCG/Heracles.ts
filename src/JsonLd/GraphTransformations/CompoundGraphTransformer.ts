import { IHypermediaProcessingOptions } from "../../../src/IHypermediaProcessingOptions";
import { IHypermediaProcessor } from "../../IHypermediaProcessor";
import { IGraphTransformer } from "./IGraphTransformer";

/**
 * Provides a collective wapper over multiple {@link IGraphTransformer}s.
 */
export default class CompoundGraphTransformer implements IGraphTransformer {
  private readonly graphTransformers: Iterable<IGraphTransformer>;

  public constructor(...graphTransformers: IGraphTransformer[]) {
    this.graphTransformers = graphTransformers;
  }

  public async transform(
    graph: object[],
    processor: IHypermediaProcessor,
    options?: IHypermediaProcessingOptions): Promise<object[]> {
    let result = graph;
    for (const graphTransformer of this.graphTransformers) {
      result = await graphTransformer.transform(result, processor, options);
    }

    return result;
  }
}