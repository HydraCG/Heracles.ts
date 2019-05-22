import { LinksPolicy } from "./LinksPolicy";

/**
 * Describes a {@link IHypermediaProcessor} processing options.
 */
export interface IHypermediaProcessingOptions {
  /**
   * Gets a policy defining which related resources will be added to links collection.
   * @readonly
   * @returns {LinksPolicy}
   */
  readonly linksPolicy: LinksPolicy;

  /**
   * Gets an originally requested Url. This may be different than the one provided in the Response.url after redirects.
   * @readonly
   * @returns {string}
   */
  readonly originalUrl: string;

  /**
   * Gets an auxiliary response that was used to obtain currently processed one.
   * @readonly
   * @returns {Response}
   */
  readonly auxiliaryResponse?: Response;

  /**
   * Gets an original auxiliary Url requested that was used to obtain currently processed one.
   * This property should be set in case {@link auxiliaryResponse} is also set.
   * @readonly
   * @returns {string}
   */
  readonly auxiliaryOriginalUrl?: string;
}
