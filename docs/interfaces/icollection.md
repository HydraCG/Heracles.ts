[@hydra-cg/heracles.ts](../README.md) > [ICollection](../interfaces/icollection.md)

# Interface: ICollection

Describes an abstract Hydra collection.

*__interface__*: 

## Hierarchy

↳  [IHydraResource](ihydraresource.md)

**↳ ICollection**

## Index

### Properties

* [collections](icollection.md#collections)
* [iri](icollection.md#iri)
* [links](icollection.md#links)
* [members](icollection.md#members)
* [operations](icollection.md#operations)
* [totalItems](icollection.md#totalitems)
* [type](icollection.md#type)
* [view](icollection.md#view)

### Methods

* [getIterator](icollection.md#getiterator)

---

## Properties

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
<a id="members"></a>

###  members

**● members**: *[ResourceFilterableCollection](../classes/resourcefilterablecollection.md)<[IResource](iresource.md)>*

*Defined in [DataModel/ICollection.ts:17](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/ICollection.ts#L17)*

Gets the collection's member resources.

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
<a id="totalitems"></a>

###  totalItems

**● totalItems**: *`number`*

*Defined in [DataModel/ICollection.ts:24](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/ICollection.ts#L24)*

Gets the total items in the collection.

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
<a id="view"></a>

### `<Optional>` view

**● view**: *[IPartialCollectionView](ipartialcollectionview.md)*

*Defined in [DataModel/ICollection.ts:31](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/ICollection.ts#L31)*

Gets the optional partial collection view.

*__readonly__*: 

*__returns__*: 

___

## Methods

<a id="getiterator"></a>

###  getIterator

▸ **getIterator**(): [IPartialCollectionIterator](ipartialcollectioniterator.md)

*Defined in [DataModel/ICollection.ts:37](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/ICollection.ts#L37)*

Gets a partial collection iterator associated in case it is a partial one.

**Returns:** [IPartialCollectionIterator](ipartialcollectioniterator.md)

___

