[@hydra-cg/heracles.ts](../README.md) > [IPointingResource](../interfaces/ipointingresource.md)

# Interface: IPointingResource

Provides an abstract description of a resource that points to another one.

*__interface__*: 

## Hierarchy

↳  [IHydraResource](ihydraresource.md)

**↳ IPointingResource**

↳  [IOperation](ioperation.md)

↳  [ITemplatedResource](itemplatedresource.md)

## Index

### Properties

* [baseUrl](ipointingresource.md#baseurl)
* [collections](ipointingresource.md#collections)
* [iri](ipointingresource.md#iri)
* [links](ipointingresource.md#links)
* [operations](ipointingresource.md#operations)
* [target](ipointingresource.md#target)
* [type](ipointingresource.md#type)

---

## Properties

<a id="baseurl"></a>

###  baseUrl

**● baseUrl**: *`string`*

*Defined in [DataModel/IPointingResource.ts:14](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IPointingResource.ts#L14)*

Gets a base URL that can be used to resolve target in case it is relative.

*__readonly__*: 

*__returns__*: 

___
<a id="collections"></a>

###  collections

**● collections**: *[ResourceFilterableCollection](../classes/resourcefilterablecollection.md)<[ICollection](icollection.md)>*

*Inherited from [IHydraResource](ihydraresource.md).[collections](ihydraresource.md#collections)*

*Defined in [DataModel/IHydraResource.ts:17](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IHydraResource.ts#L17)*

Gets collections exposed by that resource.

*__readonly__*: 

*__returns__*: 

___
<a id="iri"></a>

###  iri

**● iri**: *`string`*

*Inherited from [IResource](iresource.md).[iri](iresource.md#iri)*

*Defined in [DataModel/IResource.ts:13](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IResource.ts#L13)*

Gets an Iri of a resource.

*__readonly__*: 

*__returns__*: 

___
<a id="links"></a>

###  links

**● links**: *[LinksCollection](../classes/linkscollection.md)*

*Inherited from [IHydraResource](ihydraresource.md).[links](ihydraresource.md#links)*

*Defined in [DataModel/IHydraResource.ts:31](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IHydraResource.ts#L31)*

Gets links related to that resource.

*__readonly__*: 

*__returns__*: 

___
<a id="operations"></a>

###  operations

**● operations**: *[OperationsCollection](../classes/operationscollection.md)*

*Inherited from [IHydraResource](ihydraresource.md).[operations](ihydraresource.md#operations)*

*Defined in [DataModel/IHydraResource.ts:24](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IHydraResource.ts#L24)*

Gets operations that can be performed on that resource.

*__readonly__*: 

*__returns__*: 

___
<a id="target"></a>

###  target

**● target**: *[IResource](iresource.md)*

*Defined in [DataModel/IPointingResource.ts:21](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IPointingResource.ts#L21)*

Gets a target URL to be called.

*__readonly__*: 

*__returns__*: 

___
<a id="type"></a>

###  type

**● type**: *[TypesCollection](../classes/typescollection.md)*

*Inherited from [IResource](iresource.md).[type](iresource.md#type)*

*Defined in [DataModel/IResource.ts:20](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IResource.ts#L20)*

Gets classes a given resource is of.

*__readonly__*: 

*__returns__*: 

___

