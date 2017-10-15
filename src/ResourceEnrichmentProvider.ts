import { IOperation } from "./DataModel/IOperation";
import { IResource } from "./DataModel/IResource";
import { IWebResource } from "./DataModel/IWebResource";
import HydraClient from "./HydraClient";
import { hydra, schema } from "./namespaces";

interface IPropertyDefinition {
  type: string;
  propertyName: string;
  methods: { [name: string]: Function };
}
/**
 * ResourceEnrichmentProvider
 *
 * Provides IWebResource enrichment routines.
 */
export default class ResourceEnrichmentProvider {
  private static properties = {
    members: {
      type: hydra.Collection,
      propertyName: "members",
      methods: {
        add: ResourceEnrichmentProvider.addMember
      }
    },
    operations: {
      propertyName: "operations",
      methods: {}
    }
  };

  /**
   * Enriches a given resource with IHypermediaContainer specific properties.
   *
   * @param client Hydra client that can be used for further API calls.
   * @param resource Resource to be enriched.
   */
  public enrichHypermedia(
    client: HydraClient,
    resource: IWebResource
  ): IWebResource {
    if (!resource) {
      return resource;
    }

    for (const propertyName of Object.keys(
      ResourceEnrichmentProvider.properties
    )) {
      const propertyDefinition =
        ResourceEnrichmentProvider.properties[propertyName];
      ResourceEnrichmentProvider.enrich(
        client,
        resource,
        propertyName,
        propertyDefinition
      );
    }

    return resource;
  }

  private static enrich(
    client: HydraClient,
    originatingResource: IWebResource,
    propertyName: string,
    propertyDefinition: IPropertyDefinition
  ) {
    let value = null;
    const relations = originatingResource.hypermedia.filter(
      (item: any) =>
      !propertyDefinition.type ||
      (item.isA && item.isA.find((type) => type === propertyDefinition.type))
    );
    if (relations.length > 0) {
      value = Array.prototype.concat.apply(
        new Array<IResource>(),
        relations
          .map((relation: any) => relation[propertyDefinition.propertyName])
          .filter((item) => !!item)
      );

      ResourceEnrichmentProvider.createPropertyMembers(
        client,
        propertyDefinition.methods,
        "value",
        originatingResource,
        value
      );
    }

    Object.defineProperty(originatingResource.hypermedia, propertyName, {
      enumerable: false,
      value
    });
  }

  private static createPropertyMembers(
    client: HydraClient,
    members: { [name: string]: Function },
    propertyType: string,
    originatingResource: IWebResource,
    value: any
  ) {
    for (const methodName of Object.keys(members)) {
      const method = members[methodName];
      const propertyDefinition = {};
      propertyDefinition[propertyType] = function() {
        return method.apply(
          null,
          [client, originatingResource].concat(
            Array.prototype.slice.call(arguments)
          )
        );
      };
      Object.defineProperty(value, methodName, propertyDefinition);
    }
  }

  private static resourceMeetsOperationExpectations(
    resource: IWebResource,
    operation: IOperation
  ): boolean {
    if (!operation.expects) {
      return false;
    }

    let resourceType = resource["@type"] || [];
    if (!(resourceType instanceof Array)) {
      resourceType = [resourceType];
    }

    return !!resourceType.find(
      (type) => !!operation.expects.find((expected) => expected.iri == type)
    );
  }

  private static findOperation(
    originatingResource: IWebResource,
    operationType: string,
    webResource: IWebResource
  ): IOperation {
    if (!webResource) {
      throw HydraClient.noResourceProvided;
    }

    const operation: any = originatingResource.hypermedia.operations.find(
      (item: any) => item.isA.indexOf(operationType) !== -1);
    if (!operation) {
      throw HydraClient.operationNotSupported;
    }

    if (!ResourceEnrichmentProvider.resourceMeetsOperationExpectations(webResource, operation)) {
      throw HydraClient.invalidArgument;
    }

    return operation;
  }

  private static async createResource(
    client: HydraClient,
    originatingResource: IWebResource,
    webResource: IWebResource
  ): Promise<IWebResource> {
    const operation = ResourceEnrichmentProvider.findOperation(
      originatingResource,
      schema.CreateAction,
      webResource
    );
    const response = await client.invoke(operation, webResource);
    if (response.status >= 300 || !response.headers.get("Location")) {
      throw new Error(HydraClient.invalidResponse + response.status);
    }

    Object.defineProperty(webResource, "iri", {
      enumerable: true,
      value: response.headers.get("Location")
    });
    return webResource;
  }

  private static async addMember(
    client: HydraClient,
    originatingResource: IWebResource,
    webResource: IWebResource
  ): Promise<Response> {
    const operation = ResourceEnrichmentProvider.findOperation(
      originatingResource,
      schema.AddAction,
      webResource
    );
    if (!webResource.iri && operation.isA.indexOf(schema.CreateAction) === -1) {
      webResource = await ResourceEnrichmentProvider.createResource(
        client,
        originatingResource,
        webResource
      );
      if (!webResource.iri) {
        throw new Error(HydraClient.operationNotSupported);
      }
    }

    return await client.invoke(operation, webResource);
  }
}
