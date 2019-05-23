import { IHypermediaProcessingOptions } from "../../../src/IHypermediaProcessingOptions";
import { IHypermediaProcessor } from "../../IHypermediaProcessor";
import { IGraphTransformer } from "./IGraphTransformer";

/**
 * Provides a collective wrapper over multiple {@link IGraphTransformer}s.
 */
export default class CompoundGraphTransformer implements IGraphTransformer {
  private readonly graphTransformers: Iterable<IGraphTransformer>;

  /**
   * Initializes a new instance of the {@link CompoundGraphTransformer} class.
   * @param {IGraphTransformer} graphTransformers Other graph transforming facilities to use.
   */
  public constructor(...graphTransformers: IGraphTransformer[]) {
    this.graphTransformers = graphTransformers;
  }

  /** @inheritDoc */
  public async transform(
    graph: object[],
    processor: IHypermediaProcessor,
    options?: IHypermediaProcessingOptions
  ): Promise<object[]> {
    let result = graph;
    for (const graphTransformer of this.graphTransformers) {
      result = await graphTransformer.transform(result, processor, options);
    }

    return result;
  }
}
