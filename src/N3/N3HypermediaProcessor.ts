import * as N3Parser from "@rdfjs/parser-n3";
import * as SerializerJsonLd from "@rdfjs/serializer-jsonld";
import { Readable } from "stream";
import { IHypermediaProcessingOptions } from "../../src/IHypermediaProcessingOptions";
import HypermediaContainer from "../DataModel/HypermediaContainer";
import { IHypermediaContainer } from "../DataModel/IHypermediaContainer";
import { IHydraClient } from "../IHydraClient";
import { IHypermediaProcessor } from "../IHypermediaProcessor";
import { Level } from "../Level";

/**
 * Provides support for hypermedia serialized with N3 and similar.
 */
export default class N3HypermediaProcessor implements IHypermediaProcessor {
  private static turtle = "text/turtle";
  private static trig = "application/trig";
  private static nTriples = "application/n-triples";
  private static nQuads = "application/n-quads";
  private static n3 = "text/n3";
  private static mediaTypes = [
    N3HypermediaProcessor.turtle,
    N3HypermediaProcessor.trig,
    N3HypermediaProcessor.nTriples,
    N3HypermediaProcessor.nQuads,
    N3HypermediaProcessor.n3
  ];

  private readonly parser = new N3Parser();
  private readonly serializer = new SerializerJsonLd();

  /**
   * Initializes a new instance of the {@link N3HypermediaProcessor} class.
   * @param {IHypermediaProcessor} jsonLdProcessor JSON-LD processor used for hypermedia extraction.
   */
  public constructor(private jsonLdProcessor: IHypermediaProcessor) {}

  /** @inheritDoc */
  get supportedMediaTypes(): Iterable<string> {
    return N3HypermediaProcessor.mediaTypes;
  }

  /** @inheritDoc */
  public supports(response: Response): Level {
    return N3HypermediaProcessor.getSupportedMediaTypeFrom(response) !== null ? Level.FullSupport : Level.None;
  }

  /** @inheritDoc */
  public async process(
    response: Response,
    client: IHydraClient,
    options?: IHypermediaProcessingOptions
  ): Promise<IHypermediaContainer> {
    const result = [];
    const json = await new Promise<IHypermediaContainer>((success, error) => {
      const transformationOptions = { baseIRI: options.originalUrl };
      const reader = response.body.getReader();
      const stream = new Readable({
        read: async () => {
          const data = await reader.read();
          if (!data.done) {
            stream.push(data.value);
          } else {
            stream.push(null);
            return;
          }
        }
      });
      const n3 = this.parser.import(stream, transformationOptions);
      n3.on("data", _ => result.push(_));
      const jsonLd = this.serializer.import(n3, transformationOptions);
      jsonLd.on("data", _ => success(_));
      jsonLd.on("error", _ => error(_));
    });
    const jsonLdResponse = { json: () => json, headers: response.headers, url: response.url } as any;
    const jsonLdResult = await this.jsonLdProcessor.process(jsonLdResponse, client, options);
    const hypermediaContainer = new HypermediaContainer(response, jsonLdResult, jsonLdResult);
    (hypermediaContainer as any).dataset = () => result;
    return hypermediaContainer;
  }

  private static getSupportedMediaTypeFrom(response: Response) {
    let result = null;
    if (response != null) {
      for (const mediaType of N3HypermediaProcessor.mediaTypes) {
        if (response.headers.get("Content-Type").indexOf(mediaType) !== -1) {
          result = mediaType;
          break;
        }
      }
    }

    return result;
  }
}
