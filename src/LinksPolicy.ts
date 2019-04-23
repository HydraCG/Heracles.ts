/**
 * Defines possible links policies.
 */
export enum LinksPolicy {
  /**
   * Defines that only predicates that are marked with hydra:Link or hydra:TemplatedLink are considered a link.
   * @enum
   */
  Strict,

  /**
   * Defines that all resources in a relation pointing to the same protocol, host and port are considered a link.
   * @enum
   */
  SameRoot,

  /**
   * Defines that all non-blank HTTP/HTTPS resources in a relation are considered a link.
   * @enum
   */
  AllHttp,

  /**
   * Defines that all non-blank resources in a relation are considered a link.
   * @enum
   */
  All
}
