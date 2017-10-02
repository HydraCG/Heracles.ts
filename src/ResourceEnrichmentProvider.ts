import { IHydraResource } from "./DataModel/IHydraResource";
import { IHypermedia } from "./DataModel/IHypermedia";
import { IResource } from "./DataModel/IResource";
import { IWebResource } from "./DataModel/IWebResource";
import { hydra } from "./namespaces";

/**
 * ResourceEnrichmentProvider
 *
 * Provides IWebResource enrichment routines.
 */
export default class ResourceEnrichmentProvider {
  private static properties = {
    members: { type: hydra.Collection, propertyName: "members" }
  };

  /**
   * Enriches a given resource with IHypermediaContainer specific properties.
   *
   * @param resource Resource to be enriched.
   */
  public enrichHypermedia(resource: IWebResource): IWebResource {
    if (!resource) {
      return resource;
    }

    if (!resource.hypermedia) {
      Object.defineProperty(resource, "hypermedia", {
        enumerable: false,
        value: new Array<IHypermedia>()
      });
    }

    for (const propertyName of Object.keys(
      ResourceEnrichmentProvider.properties
    )) {
      const propertyDefinition =
        ResourceEnrichmentProvider.properties[propertyName];
      let value = null;
      const collections = resource.hypermedia.filter(
        (item) =>
          (item as IHydraResource).isA &&
          (item as IHydraResource).isA.find(
            (type) => type === propertyDefinition.type
          )
      );
      if (collections.length > 0) {
        value = Array.prototype.concat.apply(
          new Array<IResource>(),
          collections.map(
            (collection) => (collection as any)[propertyDefinition.propertyName]
          )
        );
      }

      Object.defineProperty(resource.hypermedia, propertyName, {
        enumerable: false,
        value
      });
    }

    return resource;
  }
}
