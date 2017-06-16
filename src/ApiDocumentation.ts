import {IApiDocumentation} from "./DataModel/IApiDocumentation";
import {IData} from "./DataModel/IData";
import {IClass} from "./DataModel/IClass";
import {IOperation} from "./DataModel/IOperation";
import HydraClient from "./HydraClient";

export default class ApiDocumentation implements IApiDocumentation
{
    public supportedClasses: Array<IClass>;
    public supportedOperations: Array<IOperation>;
    public client: HydraClient;
    public entryPoint: string;

    public async getEntryPoint(): Promise<IData>
    {
        let response = await window.fetch(this.entryPoint);
        if (response.status !== 200)
        {
            throw new Error(HydraClient.invalidResponse + response.status);
        }

        let metadataProvider = this.client.getMetadataProvider(response);
        if (!metadataProvider)
        {
            throw new Error(HydraClient.responseFormatNotSupported);
        }

        return await metadataProvider.parse(response, true);
    }
}