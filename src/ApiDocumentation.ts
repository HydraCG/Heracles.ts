import { IApiDocumentation } from "./DataModel/IApiDocumentation";
import { IClass } from "./DataModel/IClass";
import { IOperation } from "./DataModel/IOperation";
import { IResource } from "./DataModel/IResource";
import { IWebResource } from "./DataModel/IWebResource";
import HydraClient from "./HydraClient";

export default class ApiDocumentation implements IApiDocumentation {
  public title?: string;

  public description?: string;

  public supportedClasses: IClass[];

  public supportedOperations: IOperation[];

  public entryPoint: string | IResource;

  public client: HydraClient;

  public ApiDocumentation() {
    this.supportedClasses = new Array<IClass>();
    this.supportedOperations = new Array<IOperation>();
    this.entryPoint = "";
  }

  public async getEntryPoint(): Promise<IWebResource> {
    return await this.client.getResource(this.entryPoint);
  }
}
