import BodyResourceBoundIriTemplateExpansionStrategy from "./BodyResourceBoundIriTemplateExpansionStrategy";
import HydraClient from "./HydraClient";
import { IHydraClient } from "./IHydraClient";
import { IHypermediaProcessor } from "./IHypermediaProcessor";
import { IIriTemplateExpansionStrategy } from "./IIiriTemplateExpansionStrategy";
import IndirectTypingProvider from "./JsonLd/IndirectTypingProvider";
import JsonLdHypermediaProcessor from "./JsonLd/JsonLdHypermediaProcessor";
import StaticOntologyProvider from "./JsonLd/StaticOntologyProvider";
/* tslint:disable:no-var-requires */
const hydraOntology = require("./JsonLd/hydra.json");

/**
 * Provides a factory of the {@link IHydraClient}s.
 */
export default class HydraClientFactory {
  private readonly hypermediaProcessors: IHypermediaProcessor[] = [];
  private iriTemplateExpansionStrategy: IIriTemplateExpansionStrategy = null;

  /**
   * Starts the factory configuration.
   * @returns {HydraClientFactory}
   */
  public static configure(): HydraClientFactory {
    return new HydraClientFactory();
  }

  /**
   * Configures a future {@link IHydraClient} with {@link JsonLdHypermediaProcessor} and
   * {@link BodyResourceBoundIriTemplateExpansionStrategy} components.
   * @returns {HydraClientFactory}
   */
  public withDefaults(): HydraClientFactory {
    return this.with(
      new JsonLdHypermediaProcessor(new IndirectTypingProvider(new StaticOntologyProvider(hydraOntology)))
    ).with(new BodyResourceBoundIriTemplateExpansionStrategy());
  }
  /**
   * Adds an another {@link IHypermediaProcessor} component.
   * @param {IHypermediaProcessor} hypermediaProcessor Hypermedia processor to be passed
   *                                                   to future {@link HydraClient} instances.
   * @returns {HydraClientFactory}
   */
  public with(hypermediaProcessor: IHypermediaProcessor): HydraClientFactory;
  /**
   * Sets a {@link IIriTemplateExpansionStrategy} component.
   * @param {IIriTemplateExpansionStrategy} iriTemplateExpansionStrategy IRI template expansion strategy to be used
   *                                                                      when an IRI template is encountered.
   * @returns {HydraClientFactory}
   */
  /* tslint:disable-next-line:unified-signatures */
  public with(iriTemplateExpansionStrategy: IIriTemplateExpansionStrategy): HydraClientFactory;
  public with(component: any): HydraClientFactory {
    if (typeof component.createRequest === "function") {
      this.iriTemplateExpansionStrategy = component as IIriTemplateExpansionStrategy;
    }

    if (typeof component.process === "function") {
      this.hypermediaProcessors.push(component as IHypermediaProcessor);
    }

    return this;
  }

  /**
   * Creates a new instance of the {@link IHydraClient}.
   * @returns {IHydraClient}
   */
  public andCreate(): IHydraClient {
    return new HydraClient(this.hypermediaProcessors, this.iriTemplateExpansionStrategy);
  }
}
