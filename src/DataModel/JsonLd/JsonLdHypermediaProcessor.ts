import { promises as jsonLd } from "jsonld";
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
      hypermedia = await jsonLd.frame(payload, context, { embed: "@link" });
      hypermedia = JsonLdHypermediaProcessor.fixType(hypermedia["@graph"]);
    } else {
      result = await jsonLd.flatten(payload, null, { base: response.url });
      hypermedia = JsonLdHypermediaProcessor.processHypermedia(
        result,
        new Array<any>(),
        true
      );
      hypermedia = await jsonLd.frame(hypermedia, context, { embed: "@link" });
      hypermedia = JsonLdHypermediaProcessor.removeReferencesFrom(
        hypermedia["@graph"]
      );
    }

    Object.defineProperty(result, "hypermedia", {
      enumerable: false,
      value: hypermedia
    });
    return result;
  }

  private static removeReferencesFrom(result: any[]): any {
    for (let index = result.length - 1; index >= 0; index--) {
      let keys = ["iri", "isA"].concat(Object.keys(result[index]));
      keys = keys.filter((key, idx) => keys.indexOf(key) === idx);
      if (keys.length === 2) {
        result.splice(index, 1);
      } else {
        JsonLdHypermediaProcessor.fixTypeOf(result[index]);
      }
    }

    return result;
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
    for (const resource of payload) {
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

    for (const property of Object.keys(resource).filter(
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

  private static fixType(result: any[] & { [key: string]: any }) {
    for (const resource of result) {
      JsonLdHypermediaProcessor.fixTypeOf(resource);
    }

    return result;
  }

  private static fixTypeOf(resource: any) {
    if (!resource.isA) {
      resource.isA = [];
    } else if (!(resource.isA instanceof Array)) {
      resource.isA = [resource.isA];
    }
  }
}

JsonLdHypermediaProcessor.initialize();
