import { ApiDocumentationPolicy } from "./ApiDocumentationPolicy";
import { IApiDocumentation } from "./DataModel/IApiDocumentation";
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
   * Gets a policy defining how API documentations should be handled when obtaining resources.
   * @readonly
   * @returns {ApiDocumentationPolicy}
   */
  readonly apiDocumentationPolicy: ApiDocumentationPolicy;

  /**
   * Gets an API documentations obtained.
   */
  readonly apiDocumentations: Iterable<IApiDocumentation>;

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
