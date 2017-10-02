import { IWebResource } from "./IWebResource";

/**
 * Describes an abstract meta-data providing facility which translates from a raw {@link Response}
 * to an abstract data model.
 */
export interface IHypermediaProcessor {
  /**
   * Gets supported media types.
   */
  supportedMediaTypes: string[];

  /**
   * Parses a given raw response.
   *
   * @param response Raw fetch response holding data to be parsed.
   * @param removeFromPayload Instructs whether to remove the hypermedia from the response's body or not.
   */
  process(
    response: Response,
    removeFromPayload?: boolean
  ): Promise<IWebResource>;
}
