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
  private httpCall: (url: string, options?: RequestInit) => Promise<Response> = null;

  /**
   * Starts the factory configuration.
   * @returns {HydraClientFactory}
   */
  public static configure(): HydraClientFactory {
    return new HydraClientFactory();
  }

  /**
   * Configures a future {@link IHydraClient} with {@link JsonLdHypermediaProcessor},
   * {@link BodyResourceBoundIriTemplateExpansionStrategy} and fetch components.
   * @returns {HydraClientFactory}
   */
  public withDefaults(): HydraClientFactory {
    const jsonLdHypermediaProcessor = new JsonLdHypermediaProcessor(
      new IndirectTypingProvider(new StaticOntologyProvider(hydraOntology))
    );
    return this.with(jsonLdHypermediaProcessor)
      .with(new BodyResourceBoundIriTemplateExpansionStrategy())
      .with(fetch.bind(window));
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
  /**
   * Adds HTTP requests facility component.
   * @param {(url: string, options?: RequestInit) => Promise<Response>} httpCall HTTP call facility to be used for
   *                                                                             remote server calls.
   * @returns {HydraClientFactory}
   */
  /* tslint:disable-next-line:unified-signatures */
  public with(httpCall: (url: string, options?: RequestInit) => Promise<Response>): HydraClientFactory;
  public with(component: any): HydraClientFactory {
    if (typeof component.createRequest === "function") {
      this.iriTemplateExpansionStrategy = component as IIriTemplateExpansionStrategy;
    } else if (typeof component.process === "function") {
      this.hypermediaProcessors.push(component as IHypermediaProcessor);
    } else {
      this.httpCall = component;
    }

    return this;
  }

  /**
   * Creates a new instance of the {@link IHydraClient}.
   * @returns {IHydraClient}
   */
  public andCreate(): IHydraClient {
    return new HydraClient(this.hypermediaProcessors, this.iriTemplateExpansionStrategy, this.httpCall);
  }
}
