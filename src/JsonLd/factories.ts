import { IResource } from "../DataModel/IResource";
import { IHydraClient } from "../IHydraClient";
import { hydra } from "../namespaces";
import { partialCollectionViewFactory } from "./partialCollectionViewFactory";
import ProcessingState from "./ProcessingState";

type InstanceFactory = (resource: IResource, client: IHydraClient, processingState: ProcessingState) => IResource;

/**
 * Provides factory methods for strongly typed resources.
 * @const
 * @type {{ [type: string]: InstanceFactory }}
 */
export const factories: { [type: string]: InstanceFactory } = {};

factories[hydra.ApiDocumentation] = (resource, client) => {
  const target = resource as any;
  target.getEntryPoint = () => client.getResource(target.entryPoint);
  return resource;
};

factories[hydra.Collection] = partialCollectionViewFactory;
