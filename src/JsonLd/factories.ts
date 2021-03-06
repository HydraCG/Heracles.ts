import { IResource } from "../DataModel/IResource";
import { IDictionary } from "../IDictionary";
import { IHydraClient } from "../IHydraClient";
import { hydra } from "../namespaces";
import { partialCollectionIteratorFactory } from "./partialCollectionIteratorFactory";
import ProcessingState from "./ProcessingState";

type InstanceFactory = (resource: IResource, client: IHydraClient, processingState: ProcessingState) => IResource;

/**
 * Provides factory methods for strongly typed resources.
 * @const
 * @type {IDictionary<InstanceFactory>}
 */
export const factories: IDictionary<InstanceFactory> = {};

factories[hydra.ApiDocumentation] = (resource, client) => {
  const target = resource as any;
  target.getEntryPoint = () => client.getResource(target.entryPoint);
  return resource;
};

factories[hydra.Collection] = partialCollectionIteratorFactory;

factories.any = resource => {
  const someResource = resource as any;
  if (!someResource.displayName) {
    Object.defineProperty(someResource, "displayName", {
      get: () => (someResource.title || someResource.label) || ""
    });
    Object.defineProperty(someResource, "textDescription", {
      get: () => (someResource.description || someResource.comment) || ""
    });
  }

  return resource;
};