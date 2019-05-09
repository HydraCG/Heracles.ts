import BodyResourceBoundIriTemplateExpansionStrategy from "./BodyResourceBoundIriTemplateExpansionStrategy";
import HydraClient from "./HydraClient";
import { IHydraClient } from "./IHydraClient";
import { IHypermediaProcessor } from "./IHypermediaProcessor";
import { IIriTemplateExpansionStrategy } from "./IIriTemplateExpansionStrategy";
import CompoundGraphTransformer from "./JsonLd/GraphTransformations/CompoundGraphTransformer";
import EntryPointCorrectingGraphTransformer from "./JsonLd/GraphTransformations/EntryPointCorrectingGraphTransformer";
import FlatteningGraphTransformer from "./JsonLd/GraphTransformations/FlatteningGraphTransformer";
import IndirectTypingProvider from "./JsonLd/IndirectTypingProvider";
import JsonLdHypermediaProcessor from "./JsonLd/JsonLdHypermediaProcessor";
import StaticOntologyProvider from "./JsonLd/StaticOntologyProvider";
import { LinksPolicy } from "./LinksPolicy";
/* tslint:disable:no-var-requires */
const hydraOntology = require("./JsonLd/hydra.json");

export type HttpCallFacility = (url: string, options?: RequestInit) => Promise<Response>;
export type HypermediaProcessorFactory = () => IHypermediaProcessor;

/**
 * Provides a factory of the {@link IHydraClient}s.
 */
export default class HydraClientFactory {
  private readonly hypermediaProcessorFactories: HypermediaProcessorFactory[] = [];
  private iriTemplateExpansionStrategy: IIriTemplateExpansionStrategy = null;
  private linksPolicy: LinksPolicy = LinksPolicy.Strict;
  private httpCall: HttpCallFacility = null;

  /**
   * Starts the factory configuration.
   * @returns {HydraClientFactory}
   */
  public static configure(): HydraClientFactory {
    return new HydraClientFactory();
  }

  private static createJsonLdHypermediaProcessor(httpCall: HttpCallFacility) {
    const graphTransformer = new CompoundGraphTransformer(
      new FlatteningGraphTransformer(),
      new EntryPointCorrectingGraphTransformer()
    );
    return new JsonLdHypermediaProcessor(
      new IndirectTypingProvider(new StaticOntologyProvider(hydraOntology)),
      httpCall,
      graphTransformer
    );
  }

  /**
   * Configures a future {@link IHydraClient} with {@link JsonLdHypermediaProcessor},
   * {@link BodyResourceBoundIriTemplateExpansionStrategy} and fetch components.
   * @returns {HydraClientFactory}
   */
  public withDefaults(): HydraClientFactory {
    return this.withJsonLd()
      .with(new BodyResourceBoundIriTemplateExpansionStrategy())
      .withStrictLinks()
      .with(fetch.bind(window));
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
    this.with(() => HydraClientFactory.createJsonLdHypermediaProcessor(this.httpCall));
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
   * Adds an another {@link IHypermediaProcessor} component via it's factory method.
   * @param {HypermediaProcessorFactory} hypermediaProcessorFactory Hypermedia processor facvtory to be passed
   *                                                                to future {@link HydraClient} instances.
   * @returns {HydraClientFactory}
   */
  /* tslint:disable-next-line:unified-signatures */
  public with(hypermediaProcessorFactory: HypermediaProcessorFactory): HydraClientFactory;

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
   * @param {HttpCallFacility} httpCall HTTP call facility to be used for
   *                                                                             remote server calls.
   * @returns {HydraClientFactory}
   */
  /* tslint:disable-next-line:unified-signatures */
  public with(httpCall: HttpCallFacility): HydraClientFactory;

  /* tslint:disable:ban-types */
  public with(component: any): HydraClientFactory {
    if (typeof component.createRequest === "function") {
      this.iriTemplateExpansionStrategy = component as IIriTemplateExpansionStrategy;
    } else if (typeof component.process === "function") {
      this.hypermediaProcessorFactories.push(() => component as IHypermediaProcessor);
    } else if ((component as Function).length === 0) {
      this.hypermediaProcessorFactories.push(component as HypermediaProcessorFactory);
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
    return new HydraClient(
      this.hypermediaProcessorFactories.map(_ => _()),
      this.iriTemplateExpansionStrategy,
      this.linksPolicy,
      this.httpCall
    );
  }
}
