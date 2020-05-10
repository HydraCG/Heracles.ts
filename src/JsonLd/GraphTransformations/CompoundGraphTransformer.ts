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
  public transform(graph: object[], processor: IHypermediaProcessor, options?: IHypermediaProcessingOptions): object[] {
    let result = graph;
    for (const graphTransformer of this.graphTransformers) {
      result = graphTransformer.transform(result, processor, options);
    }

    return result;
  }
}
