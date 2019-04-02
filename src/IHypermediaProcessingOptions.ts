import { LinksPolicy } from "./LinksPolicy";

/**
 * Describes a {@link IHypermediaProcessor} processing options.
 */
export interface IHypermediaProcessingOptions {
  /**
   * Gets a policy defining which related resources will be added to links collection.
   */
  readonly linksPolicy: LinksPolicy;

  /**
   * Gets an originally requested Url. This may be different than the one provided in the Response.url after redirects.
   */
  readonly originalUrl: string;
}
