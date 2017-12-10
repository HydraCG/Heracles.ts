import { IWebResource } from "./DataModel/IWebResource";
import HydraClient from "./HydraClient";

/**
 * Describes an abstract meta-data providing facility which translates from a raw {@link Response}
 * to an abstract data model.
 * @interface
 */
export interface IHypermediaProcessor {
  /**
   * Gets supported media types.
   * @readonly
   * @returns {Iterable<string>}
   */
  readonly supportedMediaTypes: Iterable<string>;

  /**
   * Parses a given raw response.
   * @param {Response} response Raw fetch response holding data to be parsed.
   * @param client {HydraClient} Hydra client.
   * @returns {Promise<IWebResource>}
   */
  process(response: Response, client: HydraClient): Promise<IWebResource>;
}
