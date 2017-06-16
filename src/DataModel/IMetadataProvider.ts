import {IMetadataDescription} from "./IMetadataDescription";
import "whatwg-fetch";
import {IData} from "./IData";

/**
 * @interface Describes an abstract meta-data providing facility which translates from raw @link Response to an abstract data model.
 */
export interface IMetadataProvider
{
    /**
     * Gets supported media types.
     * @returns {Array<string>}
     */
    supportedMediaTypes: Array<string>;

    /**
     * Parses a given raw response.
     * @param {Response} response Raw fetch response holding data to be parsed.
     * @returns {Promise<IData>}
     */
    parse(response: Response): Promise<IData>;

    /**
     * Parses a given raw response.
     * @param {Response} response Raw fetch response holding data to be parsed.
     * @param {boolean} removeFromPayload Instructs whether to remove the metadata from the response's body or not.
     * @returns {Promise<IData>}
     */
    parse(response: Response, removeFromPayload: boolean): Promise<IData>;
}