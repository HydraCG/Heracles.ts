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
        let hypermedia: any = null;
        let result: any = payload;
        if (!removeFromPayload)
        {
            hypermedia = await jsonLd.frame(payload, context, { embed: "@link" });
            hypermedia = JsonLdHypermediaProcessor.fixType(hypermedia["@graph"]);
        }
        else
        {
            result = await jsonLd.flatten(payload, null, { base: response.url });
            hypermedia = JsonLdHypermediaProcessor.processHypermedia(result, new Array<any>(), true);
            hypermedia = await jsonLd.frame(hypermedia, context, { embed: "@link" });
            hypermedia = JsonLdHypermediaProcessor.removeReferencesFrom(hypermedia["@graph"]);
        }

        Object.defineProperty(result, "hypermedia", { value: hypermedia, enumerable: false });
        return result;
    }

    private static removeReferencesFrom(result: Array<any>): any
    {
        for (let index = result.length - 1; index >= 0; index--)
        {
            if ((Object.keys(result[index]).length == 1) && (result[index].iri))
            {
                result.splice(index, 1);
            }
            else
            {
                JsonLdHypermediaProcessor.fixTypeOf(result[index]);
            }
        }

        return result;
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
            if (!resource["@type"] || !!resource["@type"].find(item => item == hydra.EntryPoint) ||
                !resource["@type"].every(item => item.indexOf(hydra.namespace) === 0))
            {
                JsonLdHypermediaProcessor.processHypermedia(resource, result, removeFromPayload);
                continue;
            }

            Object.defineProperty(result, resource["@id"] || JsonLdHypermediaProcessor.generateBlankNodeId(), { enumerable: false, value: resource });
            result.push(resource);
            if (removeFromPayload)
            {
                toBeRemoved.push(resource);
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

    private static fixType(result: Array<any> & { [key: string]: any })
    {
        for (let resource of result)
        {
            JsonLdHypermediaProcessor.fixTypeOf(resource);
            if (!resource.isA)
            {
                resource.isA = [];
            }
            else if (!(resource.isA instanceof Array))
            {
                resource.isA = [resource.isA];
            }
        }

        return result;
    }

    private static fixTypeOf(resource: any)
    {
        if (!resource.isA)
        {
            resource.isA = [];
        }
        else if (!(resource.isA instanceof Array))
        {
            resource.isA = [resource.isA];
        }
    }
}

JsonLdHypermediaProcessor.initialize();