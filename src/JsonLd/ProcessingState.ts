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
   * Gets all hypermedia discovered.
   * @readonly
   * @returns {Array<IResource>}
   */
  public get hypermedia(): IResource[] {
    if (this.finalHypermedia === null) {
      this.finalHypermedia = [];
      for (const resource of this.allHypermedia) {
        if (!this.forbiddenHypermedia[resource.iri]) {
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
   * Gets the current links policy.
   */
  public readonly linksPolicy: LinksPolicy;

  /**
   * Gets the processed object's resource.
   * This is provided once the {@link ProcessingState.provideResource(boolean) is called.
   * @type {IResource = null}
   */
  public currentResource: IResource = null;

  private readonly resourceMap: { [name: string]: IResource };

  private readonly forbiddenHypermedia: { [name: string]: boolean };

  private readonly allHypermedia: IResource[];

  private readonly client: IHydraClient;

  private readonly foundResources: { [iri: string]: any };

  private readonly payload: object[];

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
      this.foundResources = parentState.foundResources;
    } else {
      this.resourceMap = {};
      this.allHypermedia = [];
      this.payload = objectToProcess as object[];
      this.forbiddenHypermedia = {};
      this.baseUrl = baseUrlOrOwnerIri;
      this.parentIri = baseUrlOrOwnerIri;
      this.client = clientOrParentIri as IHydraClient;
      this.linksPolicy = parentContextOrLinksPolicy as LinksPolicy;
      this.foundResources = {};
    }

    const baseUrl = new URL(this.baseUrl);
    this.rootUrl = `${baseUrl.protocol}//${baseUrl.host}/`;
    this.processedObject = objectToProcess;
    this.ownerIri = baseUrlOrOwnerIri;
    if (Object.keys(this.processedObject).length === 1 && Object.keys(this.processedObject)[0] === "@id") {
      this.processedObject = this.findRawResource(this.processedObject["@id"]) || this.processedObject;
    }
  }

  /**
   * Marks as owned hypermedia, this the given iri won't be available as a standalone hypermedia control.
   * @param {string} iri Iri to be marked.
   */
  public markAsOwned(iri: string) {
    this.forbiddenHypermedia[iri] = true;

    if (!!this.allHypermedia[iri]) {
      this.allHypermedia.splice(this.allHypermedia[iri], 1);
      for (let index = this.allHypermedia[iri]; index < this.allHypermedia.length; index++) {
        this.allHypermedia[this.allHypermedia[index].iri] = index;
      }

      delete this.allHypermedia[iri];
    }
  }

  /**
   * Searches an original response payload for a resource of a given Iri.
   * @param {string} iri Resource's Iri to search for.
   * @returns {any}
   */
  public findRawResource(iri: string) {
    let result = !!iri ? this.foundResources[iri] : null;
    if (typeof result === "undefined") {
      this.foundResources[iri] = result = this.payload.find(_ => _["@id"] === iri) || null;
    }

    return result;
  }

  /**
   * Gets a visited resource.
   * @param {string} iri Iri of the resource to be obtained.
   * @returns {any}
   */
  public getVisitedResource(iri: string): any {
    let result = null;
    if (!!iri) {
      result = this.resourceMap[iri] || null;
    }

    return result;
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
  public provideResource(addToHypermedia: boolean = true): IResource {
    let result = this.resourceMap[this.processedObject["@id"]];
    if (!result) {
      result = this.createResource(this.processedObject["@id"], this.processedObject["@type"]);
    }

    if (addToHypermedia) {
      this.allHypermedia[result.iri] = this.allHypermedia.length;
      this.allHypermedia.push(result);
    } else {
      this.markAsOwned(result.iri);
    }

    return (this.currentResource = result);
  }

  private createResource(iri: string, type: string[]): IResource {
    let result = {
      iri,
      type: new TypesCollection(type || [])
    };

    for (const expectedType of Object.keys(factories)) {
      if (result.type.contains(expectedType)) {
        result = factories[expectedType](result, this.client, this);
      }
    }

    return (this.resourceMap[result.iri] = result);
  }
}
