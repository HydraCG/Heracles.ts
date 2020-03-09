import ResourceFilterableCollection from "./Collections/ResourceFilterableCollection";
import { ICollection } from "./ICollection";
import { IHeaders } from "./IHeaders";
import { IResource } from "./IResource";

/**
 * Provides an abstraction layer over hypermedia container.
 * @interface
 */
export interface IHypermediaContainer extends ResourceFilterableCollection<IResource>, ICollection {
  /**
   * Gets response headers.
   * @readonly
   * @returns {IHeaders}
   */
  readonly headers: IHeaders;

  /**
   * Gets a response status.
   */
  readonly status: number;

  /**
   * Gets a response's URL.
   */
  readonly url: string;

  /**
   * Gets a raw response body.
   */
  readonly body: ReadableStream<Uint8Array> | null;

  /**
   * Gets a value indicating whether the body was consumed.
   */
  readonly bodyUsed: boolean;

  /**
   * Gets a raw response body as an array of bytes.
   * @returns {Promise<ArrayBuffer>}
   */
  arrayBuffer(): Promise<ArrayBuffer>;

  /**
   * Gets a raw response body as a blob.
   * @returns {Promise<Blob>}
   */
  blob(): Promise<Blob>;

  /**
   * Gets a raw response body as a JSON.
   * @returns {Promise<any>}
   */
  json(): Promise<any>;

  /**
   * Gets a raw response body as a text.
   * @returns {Promise<any>}
   */
  text(): Promise<string>;
}
