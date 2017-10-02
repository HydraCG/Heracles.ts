import HydraClient from "../HydraClient";

/**
 * Represents an abstract hypermedia control consumable within the Hydra client.
 */
export interface IHypermedia {
  /**
   * Gets an instance of the Hydra client that was used to obtain that hypermedia control.
   */
  client: HydraClient;
}
