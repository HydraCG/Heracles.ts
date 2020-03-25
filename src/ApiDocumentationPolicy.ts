/**
 * Defines API documentation discovery policies.
 * @enum
 */
export enum ApiDocumentationPolicy {
  /**
   * Defines that no explicit calls for the API documentation should be invoked.
   */
  None,

  /**
   * Defines that API documentation should be fetched only, leaving responses with original hypermedia controls.
   */
  FetchOnly,

  /**
   * Defines that API documentation should be fetched and responses should be extended with additional details.
   */
  FetchAndExtend
}
