import BodyResourceBoundIriTemplateExpansionStrategy from "./BodyResourceBoundIriTemplateExpansionStrategy";
import HydraClient from "./HydraClient";
import { IHydraClient } from "./IHydraClient";
import { IHydraClientFactory } from "./IHydraClientFactory";
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
export type HypermediaProcessorFactory = (context: IHydraClientFactory) => IHypermediaProcessor;

/**
 * Provides a factory of the {@link IHydraClient}s.
 */
export default class HydraClientFactory implements IHydraClientFactory {
  private readonly hypermediaProcessorFactories: HypermediaProcessorFactory[];
  private iriTemplateExpansionStrategy: IIriTemplateExpansionStrategy;
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

  private constructor(
    hypermediaProcessorFactories?: HypermediaProcessorFactory[],
    iriTemplateExpansionStrategy?: IIriTemplateExpansionStrategy,
    linksPolicy?: LinksPolicy,
    httpCall?: HttpCallFacility
  ) {
    this.hypermediaProcessorFactories = hypermediaProcessorFactories || [];
    this.iriTemplateExpansionStrategy = iriTemplateExpansionStrategy || null;
    this.linksPolicy = linksPolicy || LinksPolicy.Strict;
    this.httpCall = httpCall || null;
  }

  /** @inheritDoc */
  public get currentHttpCall(): HttpCallFacility {
    return this.httpCall;
  }

  /** @inheritDoc */
  public get currentLinksPolicy(): LinksPolicy {
    return this.linksPolicy;
  }

  /** @inheritDoc */
  public createProcessorToHandle(mediaType: string): IHypermediaProcessor {
    if (!!mediaType) {
      for (const hypermediaProcessor of this.resolveProcessors()) {
        for (const supportedMediaType of hypermediaProcessor.supportedMediaTypes) {
          if (supportedMediaType === mediaType) {
            return hypermediaProcessor;
          }
        }
      }
    }

    throw new Error(HydraClient.noHypermediaProcessors);
  }

  /**
   * Configures a future {@link IHydraClient} with {@link JsonLdHypermediaProcessor},
   * {@link BodyResourceBoundIriTemplateExpansionStrategy} and fetch components.
   * @returns {HydraClientFactory}
   */
  public withDefaults(): HydraClientFactory {
    return this.with(new BodyResourceBoundIriTemplateExpansionStrategy())
      .withStrictLinks()
      .with(fetch.bind(window))
      .withJsonLd();
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
    this.withFactory(context => HydraClientFactory.createJsonLdHypermediaProcessor(context.currentHttpCall));
    return this;
  }

  /**
   * Adds an another {@link IHypermediaProcessor} component via it's factory method.
   * @param {HypermediaProcessorFactory} hypermediaProcessorFactory Hypermedia processor facvtory to be passed
   *                                                                to future {@link HydraClient} instances.
   * @returns {HydraClientFactory}
   */
  public withFactory(hypermediaProcessorFactory: HypermediaProcessorFactory): HydraClientFactory {
    this.hypermediaProcessorFactories.push(hypermediaProcessorFactory);
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

  /**
   * Adds HTTP requests facility component.
   * @param {HttpCallFacility} httpCall HTTP call facility to be used for remote server calls.
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
      this.resolveProcessors(),
      this.iriTemplateExpansionStrategy,
      this.linksPolicy,
      this.httpCall
    );
  }

  private resolveProcessors(): Iterable<IHypermediaProcessor> {
    const result = [];
    for (const factoryMethod of this.hypermediaProcessorFactories) {
      const factory = factoryMethod as any;
      if (typeof factory.instance === "undefined") {
        const childContext = new HydraClientFactory(
          this.hypermediaProcessorFactories.filter(_ => _ !== factoryMethod),
          this.iriTemplateExpansionStrategy,
          this.linksPolicy,
          this.httpCall
        );
        Object.defineProperty(factory, "instance", { value: factoryMethod(childContext), enumerable: false });
      }

      result.push(factory.instance);
    }

    return result;
  }
}
