import { promises as jsonLd } from "jsonld";
import ApiDocumentation from "../DataModel/ApiDocumentation";
import LinksCollection from "../DataModel/Collections/LinksCollection";
import OperationsCollection from "../DataModel/Collections/OperationsCollection";
import TypesCollection from "../DataModel/Collections/TypesCollection";
import HypermediaContainer from "../DataModel/HypermediaContainer";
import { IApiDocumentation } from "../DataModel/IApiDocumentation";
import { ICollection } from "../DataModel/ICollection";
import { IHydraResource } from "../DataModel/IHydraResource";
import { IWebResource } from "../DataModel/IWebResource";
import HydraClient from "../HydraClient";
import { IHypermediaProcessor } from "../IHypermediaProcessor";
import { hydra } from "../namespaces";
import isOfType from "./isOfType";
import { mappings } from "./mappings";
import ProcessingContext from "./ProcessingState";

const literals = ["string", "number", "boolean"];

/**
 * Provides a JSON-LD based implementation of the {@link IHypermediaProcessor} interface.
 * @class
 */
export default class JsonLdHypermediaProcessor implements IHypermediaProcessor {
  private static mediaTypes = ["application/ld+json"];

  public get supportedMediaTypes(): Iterable<string> {
    return JsonLdHypermediaProcessor.mediaTypes;
  }

  public async process(response: Response, client: HydraClient): Promise<IWebResource> {
    const payload = await response.json();
    const result: any = payload;
    let flattenPayload = await jsonLd.flatten(payload, null, { base: response.url, embed: "@link" });
    flattenPayload = JsonLdHypermediaProcessor.flattenGraphs(flattenPayload);
    const context = JsonLdHypermediaProcessor.processHypermedia(new ProcessingContext(flattenPayload, response.url));
    const hypermedia = context.hypermedia;
    for (let index = hypermedia.length - 1; index >= 0; index--) {
      JsonLdHypermediaProcessor.tryRemoveReferenceFrom(hypermedia, index);
    }

    let rootResource = context.resourceMap[response.url];
    if (!rootResource) {
      hypermedia.push(
        (rootResource = {
          iri: response.url,
          links: new LinksCollection([]),
          operations: new OperationsCollection([]),
          type: new TypesCollection([])
        } as IHydraResource)
      );
    }

    const apiDocumentation = hypermedia.find(item => item.type.contains(hydra.ApiDocumentation));
    if (apiDocumentation) {
      hypermedia[hypermedia.indexOf(apiDocumentation)] = new ApiDocumentation(
        (apiDocumentation as any) as IApiDocumentation,
        client
      );
    }

    const hypermediaContainer = new HypermediaContainer(
      hypermedia,
      (rootResource as IHydraResource).operations,
      (rootResource as IHydraResource).links,
      (rootResource as ICollection).members
    );
    Object.defineProperty(result, "hypermedia", {
      enumerable: false,
      value: hypermediaContainer
    });
    return result;
  }

  private static tryRemoveReferenceFrom(graph: object[], index: number): boolean {
    const resource = graph[index];
    let keys = ["iri", "is"].concat(Object.keys(resource));
    keys = keys.filter((key, idx) => keys.indexOf(key) === idx);
    if (keys.length === 2) {
      graph.splice(index, 1);
      return true;
    }

    return false;
  }

  private static flattenGraphs(payload: object[]): object[] {
    if (!payload.find(item => item["@graph"])) {
      return payload;
    }

    return [].concat.apply(
      [],
      payload[0]["@graph"].map(item => (item["@id"] && item["@graph"] ? item["@graph"] : [item]))
    );
  }

  private static processHypermedia(context: ProcessingContext): ProcessingContext {
    if (context.processedObject instanceof Array) {
      return JsonLdHypermediaProcessor.processArray(context);
    }

    JsonLdHypermediaProcessor.processResource(context);
    return context;
  }

  private static processArray(context: ProcessingContext): ProcessingContext {
    for (const resource of context.processedObject as Iterable<object>) {
      JsonLdHypermediaProcessor.processHypermedia(context.copyFor(resource));
    }

    return context;
  }

  private static processResource(context: ProcessingContext, isOwnedHypermedia = false): object {
    const addToHypermedia =
      !isOwnedHypermedia &&
      ((!!context.processedObject["@id"] && !context.processedObject["@id"].match(/^_:/)) ||
        (!!context.processedObject["@type"] &&
          !!context.processedObject["@type"].find(type => type.indexOf(hydra.namespace) !== -1)));
    const targetResource = context.createResource(addToHypermedia);
    const validPredicates = Object.keys(mappings).filter(
      iri => !mappings[iri].type || !!mappings[iri].type.find(type => isOfType(type, context))
    );
    for (const predicate of validPredicates) {
      JsonLdHypermediaProcessor.setupProperty(targetResource, context, predicate);
    }

    return targetResource;
  }

  private static gatherPropertyValues(context: ProcessingContext, predicate: string): any[] {
    if (!context.processedObject[predicate]) {
      return null;
    }

    const values = new Array<any>();
    for (const originalValue of context.processedObject[predicate]) {
      const value =
        literals.indexOf(typeof originalValue["@value"]) !== -1
          ? originalValue["@value"]
          : JsonLdHypermediaProcessor.processResource(
              context.copyFor(originalValue),
              predicate.indexOf(hydra.namespace) !== -1
            );
      if (value) {
        values.push(value);
      }
    }

    return values;
  }

  private static setupProperty(targetResource: object, context: ProcessingContext, predicate: string): void {
    const propertyDefinition = mappings[predicate];
    let value = JsonLdHypermediaProcessor.gatherPropertyValues(context, predicate);
    if (value === null) {
      if (propertyDefinition.required) {
        value = new Array<any>();
      } else {
        return;
      }
    }

    if (literals.indexOf(typeof propertyDefinition.default) !== -1) {
      targetResource[propertyDefinition.propertyName] = value[0] || propertyDefinition.default;
    } else if (typeof propertyDefinition.default === "function") {
      targetResource[propertyDefinition.propertyName] = propertyDefinition.default(value, context);
    }
  }
}
