import TypesCollection from "../DataModel/Collections/TypesCollection";
import { ITypedResource } from "../DataModel/ITypedResource";

/**
 * Maintains a JSON-LD processing context.
 * @class
 */
export default class ProcessingState {
  /**
   * Gets the currently processed object.
   * @readonly
   * @returns {object}
   */
  public readonly processedObject: object;

  /**
   * Gets the hypermedia resources map.
   * @readonly
   * @returns {{ [name: string]: ITypedResource }}
   */
  public readonly resourceMap: { [name: string]: ITypedResource };

  /**
   * Gets all hypermedia discovered.
   * @readonly
   * @returns {Array<ITypedResource>}
   */
  public readonly hypermedia: ITypedResource[];

  /**
   * Gets the processed object's owning resource's IRI.
   * @readonly
   * @returns {string}
   */
  public readonly ownerIri: string;

  /**
   * Gets the base URL to use for relative ones.
   * @readonly
   * @returns {string}
   */
  public readonly baseUrl: string;

  /**
   * Gets the processed object's resource.
   * This is provided once the {@link ProcessingState.createResource(boolean) is called.
   * @type {ITypedResource = null}
   */
  public currentResource: ITypedResource = null;

  private readonly payload: object[];
  private readonly forbiddenHypermedia: string[];

  /**
   * Initializes a new instance of the {@link ProcessingState} class.
   * @param graphToProcess {Array<object>} Actual graph to process.
   * @param baseUrl {string} Base URL.
   */
  public constructor(graphToProcess: object[], baseUrl: string);

  /**
   * Initializes a new instance of the {@link ProcessingState} class.
   * @param objectToProcess {object} Actual object to process.
   * @param ownerIri {string} Object to process owning resource's IRI.
   * @param parentContext {ProcessingState} Parent context to obtain more details from.
   */
  public constructor(objectToProcess: object, ownerIri: string, parentContext: ProcessingState);

  public constructor(objectToProcess: object | object[], ownerIri: string, parentContext: ProcessingState = null) {
    if (arguments.length === 2) {
      this.resourceMap = {};
      this.hypermedia = [];
      this.payload = objectToProcess as object[];
      this.forbiddenHypermedia = [];
      this.baseUrl = ownerIri;
    } else {
      this.resourceMap = parentContext.resourceMap;
      this.hypermedia = parentContext.hypermedia;
      this.payload = parentContext.payload;
      this.forbiddenHypermedia = parentContext.forbiddenHypermedia;
      this.baseUrl = parentContext.baseUrl;
    }

    this.processedObject = objectToProcess;
    this.ownerIri = ownerIri;
    if (Object.keys(this.processedObject).length === 1 && Object.keys(this.processedObject)[0] === "@id") {
      this.processedObject =
        this.payload.find(item => item["@id"] === this.processedObject["@id"]) || this.processedObject;
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

    return new ProcessingState(objectToProcess, ownerIri, this);
  }

  /**
   * Creates a resource representation of the object being processed.
   * @param addToHypermedia {boolean = true} Value indicating whether to add this resource to the
   *                                         {@link ProcessingState.hypermedia} collection.
   * @returns {ITypedResource}
   */
  public createResource(addToHypermedia: boolean = true): ITypedResource {
    let result: ITypedResource;
    if (this.processedObject["@id"]) {
      result = this.resourceMap[this.processedObject["@id"]];
    }

    if (!result) {
      result = {
        iri: this.processedObject["@id"],
        is: new TypesCollection(this.processedObject["@type"] || new Array<string>())
      };
      this.resourceMap[result.iri] = result;
    }

    this.adjustHypermedia(result, addToHypermedia);
    return (this.currentResource = result);
  }

  private adjustHypermedia(result: ITypedResource, addToHypermedia: boolean): void {
    if (
      addToHypermedia &&
      this.forbiddenHypermedia.indexOf(result.iri) === -1 &&
      this.hypermedia.indexOf(result) === -1
    ) {
      this.hypermedia.push(result);
    } else {
      this.forbiddenHypermedia.push(result.iri);
      const existingHypermediaIndex = this.hypermedia.indexOf(result);
      if (existingHypermediaIndex !== -1) {
        this.hypermedia.splice(existingHypermediaIndex, 1);
      }
    }
  }
}
