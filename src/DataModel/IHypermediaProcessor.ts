import { IWebResource } from "./IWebResource";

/**
 * @interface Describes an abstract meta-data providing facility which translates from raw @link
 * Response to an abstract data model.
 */
export interface IHypermediaProcessor {
  /**
   * Gets supported media types.
   * @returns {Array<string>}
   */
  supportedMediaTypes: string[];

  /**
   * Parses a given raw response.
   * @param {Response} response Raw fetch response holding data to be parsed.
   * @param {boolean} removeFromPayload Instructs whether to remove the hypermedia from the response's body or not.
   * @returns {Promise<IWebResource>}
   */
  process(
    response: Response,
    removeFromPayload?: boolean,
  ): Promise<IWebResource>;
}
