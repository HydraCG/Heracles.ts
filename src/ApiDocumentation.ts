import {IApiDocumentation} from "./DataModel/IApiDocumentation";
import {IWebResource} from "./DataModel/IWebResource";
import {IClass} from "./DataModel/IClass";
import {IOperation} from "./DataModel/IOperation";
import HydraClient from "./HydraClient";

export default class ApiDocumentation implements IApiDocumentation
{
    public title?: string;

    public description?: string;

    public supportedClasses: Array<IClass>;

    public supportedOperations: Array<IOperation>;

    public entryPoint: string | { iri: string };

    public client: HydraClient;

    public ApiDocumentation()
    {
        this.supportedClasses = new Array<IClass>();
        this.supportedOperations = new Array<IOperation>();
        this.entryPoint = "";
    }

    public async getEntryPoint(): Promise<IWebResource>
    {
        return await this.client.getResource(this.entryPoint);
    }
}