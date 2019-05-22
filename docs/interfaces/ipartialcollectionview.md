[@hydra-cg/heracles.ts](../README.md) > [IPartialCollectionView](../interfaces/ipartialcollectionview.md)

# Interface: IPartialCollectionView

Describes an abstract partial collection view with links to other collection parts.

*__interface__*: 

## Hierarchy

↳  [ILink](ilink.md)

**↳ IPartialCollectionView**

## Index

### Properties

* [baseUrl](ipartialcollectionview.md#baseurl)
* [collections](ipartialcollectionview.md#collections)
* [first](ipartialcollectionview.md#first)
* [iri](ipartialcollectionview.md#iri)
* [last](ipartialcollectionview.md#last)
* [links](ipartialcollectionview.md#links)
* [next](ipartialcollectionview.md#next)
* [operations](ipartialcollectionview.md#operations)
* [previous](ipartialcollectionview.md#previous)
* [relation](ipartialcollectionview.md#relation)
* [supportedOperations](ipartialcollectionview.md#supportedoperations)
* [target](ipartialcollectionview.md#target)
* [type](ipartialcollectionview.md#type)

---

## Properties

<a id="baseurl"></a>

###  baseUrl

**● baseUrl**: *`string`*

*Inherited from [ILink](ilink.md).[baseUrl](ilink.md#baseurl)*

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
<a id="first"></a>

### `<Optional>` first

**● first**: *[ILink](ilink.md)*

*Defined in [DataModel/IPartialCollectionView.ts:13](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IPartialCollectionView.ts#L13)*

Gets the link to the first part of the collection, if any.

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
<a id="last"></a>

### `<Optional>` last

**● last**: *[ILink](ilink.md)*

*Defined in [DataModel/IPartialCollectionView.ts:34](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IPartialCollectionView.ts#L34)*

Gets the link to the last part of the collection, if any.

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
<a id="next"></a>

### `<Optional>` next

**● next**: *[ILink](ilink.md)*

*Defined in [DataModel/IPartialCollectionView.ts:20](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IPartialCollectionView.ts#L20)*

Gets the link to the next part of the collection, if any.

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
<a id="previous"></a>

### `<Optional>` previous

**● previous**: *[ILink](ilink.md)*

*Defined in [DataModel/IPartialCollectionView.ts:27](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IPartialCollectionView.ts#L27)*

Gets the link to the previous part of the collection, if any.

*__readonly__*: 

*__returns__*: 

___
<a id="relation"></a>

###  relation

**● relation**: *`string`*

*Inherited from [ILink](ilink.md).[relation](ilink.md#relation)*

*Defined in [DataModel/ILink.ts:16](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/ILink.ts#L16)*

Gets a relation of the link.

*__readonly__*: 

*__returns__*: 

___
<a id="supportedoperations"></a>

###  supportedOperations

**● supportedOperations**: *[OperationsCollection](../classes/operationscollection.md)*

*Inherited from [ILink](ilink.md).[supportedOperations](ilink.md#supportedoperations)*

*Defined in [DataModel/ILink.ts:36](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/ILink.ts#L36)*

Gets a link's supported operations.

*__readonly__*: 

*__returns__*: 

___
<a id="target"></a>

###  target

**● target**: *[IResource](iresource.md)*

*Inherited from [ILink](ilink.md).[target](ilink.md#target)*

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

