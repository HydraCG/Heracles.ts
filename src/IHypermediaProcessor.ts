import { IWebResource } from "./DataModel/IWebResource";
import { IHydraClient } from "./IHydraClient";
import { IHypermediaProcessingOptions } from "./IHypermediaProcessingOptions";
import { Level } from "./Level";

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
   * Determines level of support of a this {@link IHypermediaProcessor} for given response.
   * @param {Response} response Response to check support for.
   * @returns {Level}
   */
  supports(response: Response): Level;

  /**
   * Parses a given raw response.
   * @param {Response} response Raw fetch response holding data to be parsed.
   * @param {IHydraClient} client Hydra client.
   * @param {IHypermediaProcessingOptions} options Optional additional processing options.
   * @returns {Promise<IWebResource>}
   */
  process(response: Response, client: IHydraClient, options?: IHypermediaProcessingOptions): Promise<IWebResource>;
}
