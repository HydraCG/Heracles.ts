import TypesCollection from "../DataModel/Collections/TypesCollection";
import { IResource } from "../DataModel/IResource";
import { IHydraClient } from "../IHydraClient";
import { LinksPolicy } from "../LinksPolicy";
import { factories } from "./factories";

/**
 * Maintains a JSON-LD processing context.
 * @class
 */
export default class ProcessingState {
  private finalHypermedia: IResource[] = null;

  /**
   * Gets the currently processed object.
   * @readonly
   * @returns {object}
   */
  public readonly processedObject: object;

  /**
   * Gets the hypermedia resources map.
   * @readonly
   * @returns {{ [name: string]: IResource }}
   */
  public readonly resourceMap: { [name: string]: IResource };

  /**
   * Gets all hypermedia discovered.
   * @readonly
   * @returns {Array<IResource>}
   */
  public get hypermedia(): IResource[] {
    if (this.finalHypermedia === null) {
      this.finalHypermedia = [];
      for (const resource of this.allHypermedia) {
        if (this.forbiddenHypermedia.indexOf(resource.iri) === -1) {
          this.finalHypermedia.push(resource);
        }
      }
    }

    return this.finalHypermedia;
  }

  /**
   * Gets the processed object's owning resource's IRI. This owning resource may not be a direct parent.
   * @readonly
   * @returns {string}
   */
  public readonly ownerIri: string;

  /**
   * Gets the processed object's parent resource's IRI.
   * @readonly
   * @returns {string}
   */
  public readonly parentIri: string;

  /**
   * Gets the base URL to use for relative ones.
   * @readonly
   * @returns {string}
   */
  public readonly baseUrl: string;

  /**
   * Gets the protocol, host and port of the {@link baseUrl};
   * @readonly
   * @returns {string}
   */
  public readonly rootUrl: string;

  /**
   * Gets the original payload.
   * @type {object[]}
   */
  public readonly payload: object[];

  /**
   * Gets the current links policy.
   */
  public readonly linksPolicy: LinksPolicy;

  /**
   * Gets the processed object's resource.
   * This is provided once the {@link ProcessingState.createResource(boolean) is called.
   * @type {IResource = null}
   */
  public currentResource: IResource = null;

  private readonly forbiddenHypermedia: string[];

  private readonly allHypermedia: IResource[];

  private readonly client: IHydraClient;

  /**
   * Initializes a new instance of the {@link ProcessingState} class.
   * @param graphToProcess {Array<object>} Actual graph to process.
   * @param baseUrl {string} Base URL.
   * @param client {IHydraClient} Hydra client instance.
   * @param linksPolicy {LinksPolicy} Policy defining what is considered a link.
   */
  public constructor(graphToProcess: object[], baseUrl: string, client: IHydraClient, linksPolicy: LinksPolicy);

  /**
   * Initializes a new instance of the {@link ProcessingState} class.
   * @param objectToProcess {object} Actual object to process.
   * @param ownerIri {string} Object to process owning resource's IRI.
   * @param parentIri {string} Object to process parent resource's IRI.
   * @param parentState {ProcessingState} Parent processing state to obtain more details from.
   */
  public constructor(objectToProcess: object, ownerIri: string, parentIri: string, parentState: ProcessingState);

  public constructor(
    objectToProcess: object | object[],
    baseUrlOrOwnerIri: string,
    clientOrParentIri: IHydraClient | string = null,
    parentContextOrLinksPolicy: any = null
  ) {
    if (arguments[3] instanceof ProcessingState) {
      const parentState = parentContextOrLinksPolicy as ProcessingState;
      this.resourceMap = parentState.resourceMap;
      this.allHypermedia = parentState.allHypermedia;
      this.payload = parentState.payload;
      this.forbiddenHypermedia = parentState.forbiddenHypermedia;
      this.baseUrl = parentState.baseUrl;
      this.parentIri = clientOrParentIri as string;
      this.client = parentState.client;
      this.linksPolicy = parentState.linksPolicy;
    } else {
      this.resourceMap = {};
      this.allHypermedia = [];
      this.payload = objectToProcess as object[];
      this.forbiddenHypermedia = [];
      this.baseUrl = baseUrlOrOwnerIri;
      this.parentIri = baseUrlOrOwnerIri;
      this.client = clientOrParentIri as IHydraClient;
      this.linksPolicy = parentContextOrLinksPolicy as LinksPolicy;
    }

    const baseUrl = new URL(this.baseUrl);
    this.rootUrl = `${baseUrl.protocol}//${baseUrl.host}/`;
    this.processedObject = objectToProcess;
    this.ownerIri = baseUrlOrOwnerIri;
    if (Object.keys(this.processedObject).length === 1 && Object.keys(this.processedObject)[0] === "@id") {
      this.processedObject =
        this.payload.find(item => item["@id"] === this.processedObject["@id"]) || this.processedObject;
    }
  }

  /**
   * Marks as owned hypermedia, this the given iri won't be available as a standalone hypermedia control.
   * @param {string} iri Iri to be marked.
   */
  public markAsOwned(iri: string) {
    if (this.forbiddenHypermedia.indexOf(iri) === -1) {
      this.forbiddenHypermedia.push(iri);
    }
  }

  /**
   * Creates a child processing context.
   * @param objectToProcess {object} Nested object to be processed.
   * @returns {ProcessingState}
   */
  public copyFor(objectToProcess: object): ProcessingState {
    let ownerIri = this.ownerIri;
    if (this.currentResource !== null) {
      ownerIri = this.currentResource.iri;
    }

    let parentIri: string = ownerIri;
    if (this.processedObject !== this.payload) {
      parentIri = this.processedObject["@id"];
    } else {
      const parentResource = this.payload.find(
        resource =>
          !!Object.keys(resource)
            .filter(predicate => predicate.charAt(0) !== "@")
            .find(predicate => !!resource[predicate].find(value => value["@id"] === objectToProcess["@id"]))
      );
      parentIri = !!parentResource ? parentResource["@id"] : parentIri;
    }

    return new ProcessingState(objectToProcess, ownerIri, parentIri, this);
  }

  /**
   * Creates a resource representation of the object being processed.
   * @param addToHypermedia {boolean = true} Value indicating whether to add this resource to the
   *                                         {@link ProcessingState.hypermedia} collection.
   * @returns {IResource}
   */
  public createResource(addToHypermedia: boolean = true): IResource {
    let result: IResource;
    if (this.processedObject["@id"]) {
      result = this.resourceMap[this.processedObject["@id"]];
    }

    if (!result) {
      result = {
        iri: this.processedObject["@id"],
        type: new TypesCollection(this.processedObject["@type"] || new Array<string>())
      };
      for (const expectedType of Object.keys(factories)) {
        if (result.type.contains(expectedType)) {
          result = factories[expectedType](result, this.client, this);
        }
      }

      this.resourceMap[result.iri] = result;
    }

    if (addToHypermedia) {
      this.allHypermedia.push(result);
    } else {
      this.forbiddenHypermedia.push(result.iri);
    }

    return (this.currentResource = result);
  }
}
