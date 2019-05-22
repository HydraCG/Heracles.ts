[@hydra-cg/heracles.ts](../README.md) > [IPartialCollectionIterator](../interfaces/ipartialcollectioniterator.md)

# Interface: IPartialCollectionIterator

Describes an abstract view of a partial collection. This is an iterator-like pattern that once obtained from it's owning [ICollection](icollection.md) should maintain it's state between consecutive next/previous page calls.

*__interface__*: 

## Hierarchy

**IPartialCollectionIterator**

## Index

### Properties

* [currentPartIri](ipartialcollectioniterator.md#currentpartiri)
* [firstPartIri](ipartialcollectioniterator.md#firstpartiri)
* [hasNextPart](ipartialcollectioniterator.md#hasnextpart)
* [hasPreviousPart](ipartialcollectioniterator.md#haspreviouspart)
* [lastPartIri](ipartialcollectioniterator.md#lastpartiri)
* [nextPartIri](ipartialcollectioniterator.md#nextpartiri)
* [previousPartIri](ipartialcollectioniterator.md#previouspartiri)

### Methods

* [getFirstPart](ipartialcollectioniterator.md#getfirstpart)
* [getLastPart](ipartialcollectioniterator.md#getlastpart)
* [getNextPart](ipartialcollectioniterator.md#getnextpart)
* [getPreviousPart](ipartialcollectioniterator.md#getpreviouspart)

---

## Properties

<a id="currentpartiri"></a>

###  currentPartIri

**● currentPartIri**: *`string`*

*Defined in [DataModel/IPartialCollectionIterator.ts:14](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IPartialCollectionIterator.ts#L14)*

Gets the IRI of current part.

*__readonly__*: 

*__returns__*: 

___
<a id="firstpartiri"></a>

###  firstPartIri

**● firstPartIri**: *`string`*

*Defined in [DataModel/IPartialCollectionIterator.ts:21](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IPartialCollectionIterator.ts#L21)*

Gets the IRI to the first part.

*__readonly__*: 

*__returns__*: 

___
<a id="hasnextpart"></a>

###  hasNextPart

**● hasNextPart**: *`boolean`*

*Defined in [DataModel/IPartialCollectionIterator.ts:49](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IPartialCollectionIterator.ts#L49)*

Gets a value indicating whether the view has a next part available.

*__readonly__*: 

*__returns__*: 

___
<a id="haspreviouspart"></a>

###  hasPreviousPart

**● hasPreviousPart**: *`boolean`*

*Defined in [DataModel/IPartialCollectionIterator.ts:56](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IPartialCollectionIterator.ts#L56)*

Gets a value indicating whether the view has a previous part available.

*__readonly__*: 

*__returns__*: 

___
<a id="lastpartiri"></a>

###  lastPartIri

**● lastPartIri**: *`string`*

*Defined in [DataModel/IPartialCollectionIterator.ts:42](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IPartialCollectionIterator.ts#L42)*

Gets the IRI to the last part.

*__readonly__*: 

*__returns__*: 

___
<a id="nextpartiri"></a>

###  nextPartIri

**● nextPartIri**: *`string`*

*Defined in [DataModel/IPartialCollectionIterator.ts:28](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IPartialCollectionIterator.ts#L28)*

Gets the IRI to the next part.

*__readonly__*: 

*__returns__*: 

___
<a id="previouspartiri"></a>

###  previousPartIri

**● previousPartIri**: *`string`*

*Defined in [DataModel/IPartialCollectionIterator.ts:35](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IPartialCollectionIterator.ts#L35)*

Gets the IRI to the previous part.

*__readonly__*: 

*__returns__*: 

___

## Methods

<a id="getfirstpart"></a>

###  getFirstPart

▸ **getFirstPart**(): `Promise`<`Iterable`<[IResource](iresource.md)>>

*Defined in [DataModel/IPartialCollectionIterator.ts:62](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IPartialCollectionIterator.ts#L62)*

Retrieves a first part of the partial collection view.

**Returns:** `Promise`<`Iterable`<[IResource](iresource.md)>>

___
<a id="getlastpart"></a>

###  getLastPart

▸ **getLastPart**(): `Promise`<`Iterable`<[IResource](iresource.md)>>

*Defined in [DataModel/IPartialCollectionIterator.ts:80](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IPartialCollectionIterator.ts#L80)*

Retrieves a last part of the partial collection view.

**Returns:** `Promise`<`Iterable`<[IResource](iresource.md)>>

___
<a id="getnextpart"></a>

###  getNextPart

▸ **getNextPart**(): `Promise`<`Iterable`<[IResource](iresource.md)>>

*Defined in [DataModel/IPartialCollectionIterator.ts:68](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IPartialCollectionIterator.ts#L68)*

Retrieves a next part of the partial collection view.

**Returns:** `Promise`<`Iterable`<[IResource](iresource.md)>>

___
<a id="getpreviouspart"></a>

###  getPreviousPart

▸ **getPreviousPart**(): `Promise`<`Iterable`<[IResource](iresource.md)>>

*Defined in [DataModel/IPartialCollectionIterator.ts:74](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IPartialCollectionIterator.ts#L74)*

Retrieves a previous part of the partial collection view.

**Returns:** `Promise`<`Iterable`<[IResource](iresource.md)>>

___

