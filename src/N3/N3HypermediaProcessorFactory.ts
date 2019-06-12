import { HypermediaProcessorFactory } from "../HydraClientFactory";
import { IHydraClientFactory } from "../IHydraClientFactory";
import N3HypermediaProcessor from "./N3HypermediaProcessor";

/**
 * Provides a factory method to be registered with Hydra client factory.
 */
export default class N3HypermediaProcessorFactory {
  public static instance: HypermediaProcessorFactory = (context: IHydraClientFactory) => {
    return new N3HypermediaProcessor(context.createProcessorToHandle("application/ld+json"));
  }
}
