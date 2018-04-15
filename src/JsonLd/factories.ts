import { ICollection } from "../DataModel/ICollection";
import { IResource } from "../DataModel/IResource";
import { IWebResource } from "../DataModel/IWebResource";
import { IHydraClient } from "../IHydraClient";
import { hydra } from "../namespaces";

/**
 * Provides factory methods for strongly typed resources.
 * @const
 * @type {{ [type: string]: (resource: IResource, client: IHydraClient) => IHydraResource }}
 */
export const factories: { [type: string]: (resource: IResource, client: IHydraClient) => IResource } = {};

factories[hydra.ApiDocumentation] = (resource, client) => {
  const target = resource as any;
  target.getEntryPoint = () => client.getResource(target.entryPoint);
  return resource;
};

factories[hydra.Collection] = (resource, client) => {
  const target = resource as any;
  const collection = resource as ICollection;
  target.getAllMembers = async () => {
    const result = [];
    let next = collection.links.withRelationOf(hydra.first).first();
    if (!next) {
      return collection.members;
    }

    let collectionPart: IWebResource = null;
    while (next) {
      collectionPart = await client.getResource(next.target);
      for (const member of collectionPart.hypermedia.members) {
        result.push(member);
      }

      next = collectionPart.hypermedia.links.withRelationOf(hydra.next).first();
    }

    return result;
  };

  return resource;
};
