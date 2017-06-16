import HydraClient from "../../HydraClient";
import {IMetadataProvider} from "../IMetadataProvider";
import {IData} from "../IData";
import {hydra} from "../../namespaces";
const jsonLd = require("jsonld").promises;
const context = require("./context.json");

export default class JsonLdMetadataProvider implements IMetadataProvider
{
    private static _mediaTypes = ["application/json+ld"];
    private static _id = 0;

    static initialize()
    {
        HydraClient.registerMetadataProvider(new JsonLdMetadataProvider());
    }

    public get supportedMediaTypes(): Array<string>
    {
        return JsonLdMetadataProvider._mediaTypes;
    }

    public async parse(response: Response, removeFromPayload: boolean = false): Promise<IData>
    {
        let payload = await response.json();
        let expanded = await jsonLd.flatten(payload);
        let metadata = JsonLdMetadataProvider.parseMetadata(expanded, new Array<any>(), removeFromPayload);
        let result = await jsonLd.frame(metadata, context, { embed: "@link" });
        result = result["@graph"];
        for (let index = result.length - 1; index >=0; index--)
        {
            if ((Object.keys(result[index]).length == 1) && (result[index]["@id"]))
            {
                result.splice(index, 1);
            }
        }

        Object.defineProperty(expanded, "metadata", { value: result, enumerable: false });
        return expanded;
    }

    private static parseMetadata(payload: any, result: Array<any> & { [key: string]: any }, removeFromPayload: boolean = false): any
    {
        if (payload instanceof Array)
        {
            return JsonLdMetadataProvider.parseArray(payload, result, removeFromPayload);
        }

        if (payload["@graph"])
        {
            return JsonLdMetadataProvider.parseMetadata(payload["@graph"], result, removeFromPayload);
        }

        return JsonLdMetadataProvider.parseResource(payload, result, removeFromPayload);
    }

    private static parseArray(payload: any, result: Array<any> & { [key: string]: any }, removeFromPayload: boolean = false)
    {
        let toBeRemoved = new Array<any>();
        for (let resource of payload)
        {
            if (resource["@type"] && resource["@type"].every(item => item.indexOf(hydra.namespace) === 0))
            {
                Object.defineProperty(result, resource["@id"] || "_:bnode" + (++JsonLdMetadataProvider._id), { enumerable: false, value: resource });
                result.push(resource);
                if (removeFromPayload)
                {
                    toBeRemoved.push(resource);
                }
            }
            else
            {
                JsonLdMetadataProvider.parseMetadata(resource, result, removeFromPayload);
            }
        }

        toBeRemoved.forEach(item => payload.splice(payload.indexOf(item), 1));
        return result;
    }

    private static parseResource(resource: any, result: Array<any> & { [key: string]: any }, removeFromPayload: boolean): any
    {
        let targetResource;
        if ((resource["@id"]) && (targetResource = result[resource["@id"]]))
        {
            targetResource["@id"] = resource["@id"];
        }

        if (!targetResource)
        {
            targetResource = {};
            Object.defineProperty(result, "_:bnode" + (++JsonLdMetadataProvider._id), { enumerable: false, value: targetResource });
            result.push(targetResource);
        }

        for (let property of Object.keys(resource).filter(property => property.charAt(0) !== "@"))
        {
            if (property.indexOf(hydra.namespace) === 0)
            {
                targetResource[property] = resource[property];
                if (removeFromPayload)
                {
                    delete resource[property];
                }
            }
        }

        return result;
    }
}

JsonLdMetadataProvider.initialize();