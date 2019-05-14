import { IHypermediaProcessingOptions } from "../../../src/IHypermediaProcessingOptions";
import { IHypermediaProcessor } from "../../IHypermediaProcessor";
import { hydra } from "../../namespaces";
import { IGraphTransformer } from "./IGraphTransformer";

/**
 * Tries to correct missing entry point in hydra:ApiDocumentation resource.
 */
export default class EntryPointCorrectingGraphTransformer implements IGraphTransformer {
  public async transform(
    graph: object[],
    processor: IHypermediaProcessor,
    options?: IHypermediaProcessingOptions
  ): Promise<object[]> {
    const apiDocumentation = graph.find(_ => !!_["@type"] && _["@type"].indexOf(hydra.ApiDocumentation) !== -1);
    if (
      !!apiDocumentation &&
      !apiDocumentation[hydra.entrypoint] &&
      !!options &&
      processor.supports(options.auxiliaryResponse) &&
      options.auxiliaryOriginalUrl.match(/.+:\/\/[^\/]+\/?/)
    ) {
      apiDocumentation[hydra.entrypoint] = [{ "@id": options.auxiliaryOriginalUrl }];
    }

    return graph;
  }
}
