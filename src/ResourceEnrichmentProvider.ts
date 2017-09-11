import {IWebResource} from "./DataModel/IWebResource";
import {IHypermedia} from "./DataModel/IHypermedia";
import {IHydraResource} from "./DataModel/IHydraResource";
import {hydra} from "./namespaces";
import {IResource} from "./DataModel/IResource";

/**
 * @class @name ResourceEnrichmentProvider
 * Provides IWebResource enrichment routines.
 */
export default class ResourceEnrichmentProvider
{
    private static properties =
    {
        members: { type: hydra.Collection, propertyName: "members" }
    };

    /**
     * Enriches a given resource with IHypermediaContainer specific properties.
     * @param resource Resource to be enriched.
     * @returns {IWebResource}
     */
    public enrichHypermedia(resource: IWebResource): IWebResource
    {
        if (!resource)
        {
            return resource;
        }

        if (!resource.hypermedia)
        {
            Object.defineProperty(resource, "hypermedia", { value: new Array<IHypermedia>(), enumerable: false });
        }

        for (let propertyName of Object.keys(ResourceEnrichmentProvider.properties))
        {
            let propertyDefinition = ResourceEnrichmentProvider.properties[propertyName];
            let value = null;
            let collections = resource.hypermedia
                .filter(item =>
                    (<IHydraResource>item).isA &&
                    (<IHydraResource>item).isA.find(type => type === propertyDefinition.type));
            if (collections.length > 0)
            {
                value = Array.prototype.concat.apply(
                    new Array<IResource>(),
                    collections.map(collection => (<any>collection)[propertyDefinition.propertyName]));
            }

            Object.defineProperty(resource.hypermedia, propertyName, { value: value, enumerable: false });
        }

        return resource;
    }
}