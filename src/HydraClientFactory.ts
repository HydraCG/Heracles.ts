import BodyResourceBoundIriTemplateExpansionStrategy from "./BodyResourceBoundIriTemplateExpansionStrategy";
import HydraClient from "./HydraClient";
import { IHydraClient } from "./IHydraClient";
import { IHypermediaProcessor } from "./IHypermediaProcessor";
import { IIriTemplateExpansionStrategy } from "./IIiriTemplateExpansionStrategy";
import IndirectTypingProvider from "./JsonLd/IndirectTypingProvider";
import JsonLdHypermediaProcessor from "./JsonLd/JsonLdHypermediaProcessor";
import StaticOntologyProvider from "./JsonLd/StaticOntologyProvider";
import { LinksPolicy } from "./LinksPolicy";
/* tslint:disable:no-var-requires */
const hydraOntology = require("./JsonLd/hydra.json");

/**
 * Provides a factory of the {@link IHydraClient}s.
 */
export default class HydraClientFactory {
  private readonly hypermediaProcessors: IHypermediaProcessor[] = [];
  private iriTemplateExpansionStrategy: IIriTemplateExpansionStrategy = null;
  private linksPolicy: LinksPolicy = LinksPolicy.Strict;

  /**
   * Starts the factory configuration.
   * @returns {HydraClientFactory}
   */
  public static configure(): HydraClientFactory {
    return new HydraClientFactory();
  }

  private static createJsonLdHypermediaProcessor() {
    return new JsonLdHypermediaProcessor(
      new IndirectTypingProvider(
        new StaticOntologyProvider(hydraOntology)));
  }

  /**
   * Configures a future {@link IHydraClient} with {@link JsonLdHypermediaProcessor} and
   * {@link BodyResourceBoundIriTemplateExpansionStrategy} components.
   * @returns {HydraClientFactory}
   */
  public withDefaults(): HydraClientFactory {
    return this
      .withJsonLd()
      .with(new BodyResourceBoundIriTemplateExpansionStrategy())
      .withStrictLinks();
  }

  /**
   * Configures a factory to create a client with explicitly defined links.
   * @returns {HydraClientFactory}
   */
  public withStrictLinks(): HydraClientFactory {
    this.linksPolicy = LinksPolicy.Strict;
    return this;
  }

  /**
   * Configures a factory to create a client with links of resources from the same host and port.
   * @returns {HydraClientFactory}
   */
  public withSameRootLinks(): HydraClientFactory {
    this.linksPolicy = LinksPolicy.SameRoot;
    return this;
  }

  /**
   * Configures a factory to create a client with all resources from HTTP/HTTPS considered links.
   * @returns {HydraClientFactory}
   */
  public withAllHttpLinks(): HydraClientFactory {
    this.linksPolicy = LinksPolicy.AllHttp;
    return this;
  }

  /**
   * Configures a factory to create a client with all resources considered links.
   * @returns {HydraClientFactory}
   */
  public withAllLinks(): HydraClientFactory {
    this.linksPolicy = LinksPolicy.All;
    return this;
  }

  /**
   * Configures a factory with JSON-LD hypermedia processor.
   * @returns {HydraClientFactory}
   */
  public withJsonLd(): HydraClientFactory {
    this.with(HydraClientFactory.createJsonLdHypermediaProcessor());
    return this;
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
    return new HydraClient(this.hypermediaProcessors, this.iriTemplateExpansionStrategy, this.linksPolicy);
  }
}
