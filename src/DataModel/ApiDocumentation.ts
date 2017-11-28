import HydraClient from "../HydraClient";
import TypedResourceFilterableCollection from "./Collections/TypedResourceFilterableCollection";
import TypesCollection from "./Collections/TypesCollection";
import { IApiDocumentation } from "./IApiDocumentation";
import { IClass } from "./IClass";
import { IWebResource } from "./IWebResource";

/**
 * Provides a default implementation of the {@link IApiDocumentation} interface.
 * @class
 */
export default class ApiDocumentation implements IApiDocumentation {
  public readonly iri: string;

  public readonly type: TypesCollection;

  public readonly title?: string;

  public readonly description?: string;

  public readonly supportedClasses: TypedResourceFilterableCollection<IClass>;

  public readonly entryPoint: string;

  private readonly client: HydraClient;

  /**
   * Initializes a new instance of the {@link ApiDocumentation} class.
   * @param apiDocumentation {IApiDocumentation} Original resource to copy details from.
   * @param client {HydraClient} Hydra client instance to be used when obtaining an entry point.
   */
  public constructor(apiDocumentation: IApiDocumentation, client: HydraClient) {
    this.iri = apiDocumentation.iri;
    this.type = apiDocumentation.type;
    this.title = apiDocumentation.title || null;
    this.description = apiDocumentation.description || null;
    this.supportedClasses =
      apiDocumentation.supportedClasses instanceof TypedResourceFilterableCollection
        ? apiDocumentation.supportedClasses
        : new TypedResourceFilterableCollection<IClass>(apiDocumentation.supportedClasses || new Array<IClass>());
    this.entryPoint = apiDocumentation.entryPoint || "";
    this.client = client;
  }

  public async getEntryPoint(): Promise<IWebResource> {
    return await this.client.getResource(this.entryPoint);
  }
}
