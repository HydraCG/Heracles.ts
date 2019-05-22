[@hydra-cg/heracles.ts](../README.md) > [ILink](../interfaces/ilink.md)

# Interface: ILink

Describes a link to another resource.

*__interface__*: 

## Hierarchy

↳  [IHydraResource](ihydraresource.md)

**↳ ILink**

↳  [IPartialCollectionView](ipartialcollectionview.md)

↳  [ITemplatedLink](itemplatedlink.md)

## Index

### Properties

* [baseUrl](ilink.md#baseurl)
* [collections](ilink.md#collections)
* [iri](ilink.md#iri)
* [links](ilink.md#links)
* [operations](ilink.md#operations)
* [relation](ilink.md#relation)
* [supportedOperations](ilink.md#supportedoperations)
* [target](ilink.md#target)
* [type](ilink.md#type)

---

## Properties

<a id="baseurl"></a>

###  baseUrl

**● baseUrl**: *`string`*

*Defined in [DataModel/ILink.ts:22](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/ILink.ts#L22)*

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
<a id="relation"></a>

###  relation

**● relation**: *`string`*

*Defined in [DataModel/ILink.ts:16](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/ILink.ts#L16)*

Gets a relation of the link.

*__readonly__*: 

*__returns__*: 

___
<a id="supportedoperations"></a>

###  supportedOperations

**● supportedOperations**: *[OperationsCollection](../classes/operationscollection.md)*

*Defined in [DataModel/ILink.ts:36](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/ILink.ts#L36)*

Gets a link's supported operations.

*__readonly__*: 

*__returns__*: 

___
<a id="target"></a>

###  target

**● target**: *[IResource](iresource.md)*

*Defined in [DataModel/ILink.ts:29](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/ILink.ts#L29)*

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

