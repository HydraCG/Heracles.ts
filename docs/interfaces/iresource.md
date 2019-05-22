[@hydra-cg/heracles.ts](../README.md) > [IResource](../interfaces/iresource.md)

# Interface: IResource

Describes an abstract RDF resource.

*__interface__*: 

## Hierarchy

**IResource**

↳  [IProperty](iproperty.md)

↳  [ISupportedProperty](isupportedproperty.md)

↳  [IClass](iclass.md)

↳  [IHydraResource](ihydraresource.md)

↳  [IIriTemplateMapping](iiritemplatemapping.md)

↳  [IHypermediaContainer](ihypermediacontainer.md)

↳  [IWebResource](iwebresource.md)

↳  [IApiDocumentation](iapidocumentation.md)

## Index

### Properties

* [iri](iresource.md#iri)
* [type](iresource.md#type)

---

## Properties

<a id="iri"></a>

###  iri

**● iri**: *`string`*

*Defined in [DataModel/IResource.ts:13](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IResource.ts#L13)*

Gets an Iri of a resource.

*__readonly__*: 

*__returns__*: 

___
<a id="type"></a>

###  type

**● type**: *[TypesCollection](../classes/typescollection.md)*

*Defined in [DataModel/IResource.ts:20](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IResource.ts#L20)*

Gets classes a given resource is of.

*__readonly__*: 

*__returns__*: 

___

