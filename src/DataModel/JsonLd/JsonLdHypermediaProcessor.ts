import { promises as jsonLd } from "jsonLd";
import HydraClient from "../../HydraClient";
import { hydra } from "../../namespaces";
import { IHypermediaProcessor } from "../IHypermediaProcessor";
import { IWebResource } from "../IWebResource";
import * as context from "./context.json";

export default class JsonLdHypermediaProcessor implements IHypermediaProcessor {
  private static mediaTypes = ["application/ld+json"];
  private static id = 0;

  public static initialize() {
    HydraClient.registerHypermediaProcessor(new JsonLdHypermediaProcessor());
  }

  public get supportedMediaTypes(): string[] {
    return JsonLdHypermediaProcessor.mediaTypes;
  }

  public async process(
	response: Response,
	removeFromPayload: boolean = false
  ): Promise<IWebResource> {
    const payload = await response.json();
    let hypermedia: any = null;
    let result: any = payload;
    if (!removeFromPayload) {
      hypermedia = await jsonLd.flatten(payload, null, { base: response.url });
      hypermedia = await jsonLd.frame(hypermedia, context, { embed: "@link" });
    } else {
      result = await jsonLd.flatten(payload, null, { base: response.url });
      hypermedia = JsonLdHypermediaProcessor.processHypermedia(
        result,
        new Array<any>(),
        true
      );
      hypermedia = await jsonLd.frame(hypermedia, context, { embed: "@link" });
    }

    hypermedia = JsonLdHypermediaProcessor.traverseGraph(
	  hypermedia["@graph"],
	  response.url
	);
    Object.defineProperty(result, "hypermedia", {
	  enumerable: false,
	  value: hypermedia
	});
    return result;
  }

  private static traverseGraph(result: any[], resourceUrl: string): any {
    for (let index = result.length - 1; index >= 0; index--) {
      if (!JsonLdHypermediaProcessor.removeReference(result, index)) {
        JsonLdHypermediaProcessor.fixProperty(result[index], "isA");
        JsonLdHypermediaProcessor.fixProperty(result[index], "operations");
        JsonLdHypermediaProcessor.fixOperation(result[index], resourceUrl);
      }
    }

    return result;
  }

  private static removeReference(result: any[], index: number): boolean {
    let keys = ["iri", "isA"].concat(Object.keys(result[index]));
    keys = keys.filter((key, idx) => keys.indexOf(key) === idx);
    if (keys.length === 2) {
      result.splice(index, 1);
      return true;
    }

    return false;
  }

  private static fixProperty(resource: any, propertyName: string) {
    if (!resource[propertyName]) {
      resource[propertyName] = [];
    }
    else if (!(resource[propertyName] instanceof Array)) {
      resource[propertyName] = [resource[propertyName]];
    }
  }

  private static fixOperation(resource: any, resourceUrl: string) {
    if (resource.isA && resource.isA.indexOf(hydra.Operation) !== -1) {
      resource.targetUrl = (!resource.iri || resource.iri.match(/^_:/)
        ? resourceUrl
        : resource.iri);
      if (!resource.method) {
        resource.method = "GET";
      }

      if (resource.method["@value"]) {
        resource.method = resource.method["@value"];
      }
    }
  }

  private static generateBlankNodeId(): string {
    return "_:bnode" + ++JsonLdHypermediaProcessor.id;
  }

  private static processHypermedia(
    payload: any,
    result: any[] & { [key: string]: any },
    removeFromPayload: boolean = false
  ): any {
    if (payload instanceof Array) {
      return JsonLdHypermediaProcessor.processArray(
        payload,
        result,
        removeFromPayload
      );
    }

    if (payload["@graph"]) {
      return JsonLdHypermediaProcessor.processHypermedia(
        payload["@graph"],
        result,
        removeFromPayload
      );
    }

    return JsonLdHypermediaProcessor.processResource(
      payload,
      result,
      removeFromPayload
	);
  }

  private static processArray(
    payload: any,
	result: any[] & { [key: string]: any },
	removeFromPayload: boolean = false
  ) {
    const toBeRemoved = new Array<any>();
    for (let resource of payload) {
      if (
        !resource["@type"] || 
        !!resource["@type"].find((item) => item === hydra.EntryPoint) ||
        !resource["@type"].every((item) => item.indexOf(hydra.namespace) === 0)
      ) {
        JsonLdHypermediaProcessor.processHypermedia(
          resource,
          result,
          removeFromPayload
		);
        continue;
      }

      Object.defineProperty(
	    result,
	    resource["@id"] || JsonLdHypermediaProcessor.generateBlankNodeId(),
	    { enumerable: false, value: resource }
	  );
      result.push(resource);
      if (removeFromPayload) {
        toBeRemoved.push(resource);
      }
    }

    toBeRemoved.forEach((item) => payload.splice(payload.indexOf(item), 1));
    return result;
  }

  private static processResource(
    resource: any,
    result: any[] & { [key: string]: any },
    removeFromPayload: boolean
  ): any {
    let targetResource;
    if (resource["@id"]) {
      targetResource = result[resource["@id"]];
    }

    if (!targetResource) {
      targetResource = {
        "@id":
          resource["@id"] || JsonLdHypermediaProcessor.generateBlankNodeId(),
        "@type": resource["@type"] || new Array<string>()
      };
      Object.defineProperty(result, targetResource["@id"], {
        enumerable: false,
        value: targetResource
      });
      result.push(targetResource);
    }

    for (let property of Object.keys(resource).filter(
      (prop) => prop.charAt(0) !== "@"
    )) {
      if (property.indexOf(hydra.namespace) === 0) {
        targetResource[property] = resource[property];
        if (removeFromPayload) {
          delete resource[property];
        }
      }
    }

    return result;
  }
}

JsonLdHypermediaProcessor.initialize();