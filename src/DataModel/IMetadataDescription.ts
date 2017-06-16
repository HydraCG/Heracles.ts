import {IMetadata} from "./IMetadata";
import {IClass} from "./IClass";
import {IOperation} from "./IOperation";
import HydraClient from "../HydraClient";

export interface IMetadataDescription extends IMetadata
{
    supportedClasses: Array<IClass>;

    supportedOperations: Array<IOperation>;
}