import {IMetadataDescription} from "./IMetadataDescription";
import {IData} from "./IData";

export interface IApiDocumentation extends IMetadataDescription
{
    entryPoint: string;

    getEntryPoint(): Promise<IData>;
}