import HydraClient from "../../HydraClient";
import {IHypermediaProcessor} from "../IHypermediaProcessor";
import {IWebResource} from "../IWebResource";
import {hydra} from "../../namespaces";
const jsonLd = require("jsonld").promises;
const context = require("./context.json");

export default class JsonLdHypermediaProcessor implements IHypermediaProcessor
{
    private static _mediaTypes = ["application/ld+json"];
    private static _id = 0;

    static initialize()
    {
        HydraClient.registerHypermediaProcessor(new JsonLdHypermediaProcessor());
    }

    public get supportedMediaTypes(): Array<string>
    {
        return JsonLdHypermediaProcessor._mediaTypes;
    }

    public async process(response: Response, removeFromPayload: boolean = false): Promise<IWebResource>
    {
        let payload = await response.json();
        let flattened = await jsonLd.flatten(payload, null, { base: response.url.match(/^[a-z][a-z0-9+\-.]*:\/\/[^/]+/)[0] });
        let hypermedia = JsonLdHypermediaProcessor.processHypermedia(flattened, new Array<any>(), removeFromPayload);
        let result = await jsonLd.frame(hypermedia, context, { embed: "@link" });
        result = result["@graph"];
        for (let index = result.length - 1; index >= 0; index--)
        {
            if ((Object.keys(result[index]).length == 1) && (result[index].iri))
            {
                result.splice(index, 1);
            }
        }

        Object.defineProperty(flattened, "hypermedia", { value: result, enumerable: false });
        return flattened;
    }

    private static generateBlankNodeId(): string
    {
        return "_:bnode" + (++JsonLdHypermediaProcessor._id);
    }

    private static processHypermedia(payload: any, result: Array<any> & { [key: string]: any }, removeFromPayload: boolean = false): any
    {
        if (payload instanceof Array)
        {
            return JsonLdHypermediaProcessor.processArray(payload, result, removeFromPayload);
        }

        if (payload["@graph"])
        {
            return JsonLdHypermediaProcessor.processHypermedia(payload["@graph"], result, removeFromPayload);
        }

        return JsonLdHypermediaProcessor.processResource(payload, result, removeFromPayload);
    }

    private static processArray(payload: any, result: Array<any> & { [key: string]: any }, removeFromPayload: boolean = false)
    {
        let toBeRemoved = new Array<any>();
        for (let resource of payload)
        {
            if (resource["@type"] && !resource["@type"].find(item => item == hydra.EntryPoint) &&
                resource["@type"].every(item => item.indexOf(hydra.namespace) === 0))
            {
                Object.defineProperty(result, resource["@id"] || JsonLdHypermediaProcessor.generateBlankNodeId(), { enumerable: false, value: resource });
                result.push(resource);
                if (removeFromPayload)
                {
                    toBeRemoved.push(resource);
                }
            }
            else
            {
                JsonLdHypermediaProcessor.processHypermedia(resource, result, removeFromPayload);
            }
        }

        toBeRemoved.forEach(item => payload.splice(payload.indexOf(item), 1));
        return result;
    }

    private static processResource(resource: any, result: Array<any> & { [key: string]: any }, removeFromPayload: boolean): any
    {
        let targetResource;
        if ((resource["@id"]) && (targetResource = result[resource["@id"]]))
        {
            targetResource["@id"] = resource["@id"];
        }

        if (!targetResource)
        {
            targetResource = {};
            Object.defineProperty(result, JsonLdHypermediaProcessor.generateBlankNodeId(), { enumerable: false, value: targetResource });
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

JsonLdHypermediaProcessor.initialize();