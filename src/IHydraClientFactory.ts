import { ApiDocumentationPolicy } from "./ApiDocumentationPolicy";
import { HttpCallFacility } from "./HydraClientFactory";
import { IHypermediaProcessor } from "./IHypermediaProcessor";
import { LinksPolicy } from "./LinksPolicy";

/**
 * Provides an abstraction over facility used for creating Hydra clients.
 */
export interface IHydraClientFactory {
  /**
   * Gets a currently configured facility for HTTP communication.
   */
  readonly currentHttpCall: HttpCallFacility;

  /**
   * Gets a currently configured {@link LinksPolicy}.
   */
  readonly currentLinksPolicy: LinksPolicy;

  /**
   * Gets a currently configured {@link ApiDocumentationPolicy}.
   */
  readonly currentApiDocumentationPolicy: ApiDocumentationPolicy;

  /**
   * Creates an instance of the {@link IHypermediaProcessor} that will be capable for working with given media type.
   * In case no processors are registered, an exception will be thrown.
   * @param {string} mediaType Media type of the RDF serialization to handle by the processor.
   * @returns {IHypermediaProcessor}
   */
  createProcessorToHandle(mediaType: string): IHypermediaProcessor;
}
