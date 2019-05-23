import { IApiDocumentation } from "./DataModel/IApiDocumentation";
import { ILink } from "./DataModel/ILink";
import { IOperation } from "./DataModel/IOperation";
import { IResource } from "./DataModel/IResource";
import { IWebResource } from "./DataModel/IWebResource";
import { IHypermediaProcessor } from "./IHypermediaProcessor";

/**
 * Provides an abstract description of the Hydra client.
 * @interface
 */
export interface IHydraClient {
  /**
   * Gets a hypermedia provider suitable for a given response.
   * @param {Response} response Raw response to find hypermedia processor for.
   */
  getHypermediaProcessor(response: Response): IHypermediaProcessor;

  /**
   * Obtains an API documentation.
   * @param {string | IResource} urlOrResource URL or object with an iri property from which to obtain an API
   *                                           documentation.
   * @returns {ApiDocumentation}
   */
  getApiDocumentation(urlOrResource: string | IResource): Promise<IApiDocumentation>;

  /**
   * Obtains a representation of a resource.
   * @param urlOrResource {string | IResource | ILink } Either URL, {@link IResource} pr {@link ILink}
   *                                                    carrying an IRI of the resource to be obtained.
   */
  getResource(urlOrResource: string | IResource | ILink): Promise<IWebResource>;

  /**
   * Invokes a given operation.
   * @param {IOperation} operation Operation descriptor to be invoked.
   * @param {IWebResource} body Optional resource to be used as a body of the operation.
   * @param {object} parameters Optional auxiliary parameters.
   * @returns {Promise<Response>}
   */
  invoke(operation: IOperation, body?: IWebResource, parameters?: object): Promise<Response>;
}
