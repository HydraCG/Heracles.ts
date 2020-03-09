import { IHypermediaProcessingOptions } from "../../../src/IHypermediaProcessingOptions";
import { IHypermediaProcessor } from "../../IHypermediaProcessor";
import { Level } from "../../Level";
import { hydra } from "../../namespaces";
import { IGraphTransformer } from "./IGraphTransformer";

/**
 * Tries to correct missing entry point in hydra:ApiDocumentation resource.
 */
export default class EntryPointCorrectingGraphTransformer implements IGraphTransformer {
  /** @inheritDoc */
  public transform(
    graph: object[],
    processor: IHypermediaProcessor,
    options?: IHypermediaProcessingOptions
  ): object[] {
    const apiDocumentation = !!graph
      ? graph.find(_ => !!_["@type"] && _["@type"].indexOf(hydra.ApiDocumentation) !== -1)
      : null;
    if (
      !!apiDocumentation &&
      !apiDocumentation[hydra.entrypoint] &&
      !!options &&
      processor.supports(options.auxiliaryResponse) !== Level.None &&
      options.auxiliaryOriginalUrl.match(/.+:\/\/[^\/]+\/?/)
    ) {
      apiDocumentation[hydra.entrypoint] = [{ "@id": options.auxiliaryOriginalUrl }];
    }

    return graph;
  }
}
