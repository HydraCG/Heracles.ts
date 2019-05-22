[@hydra-cg/heracles.ts](../README.md) > [FilterableCollectionIterator](../classes/filterablecollectioniterator.md)

# Class: FilterableCollectionIterator

Provides an Iterator implementation for the [FilterableCollection](filterablecollection.md).

*__class__*: 

## Type parameters
#### T 
## Hierarchy

**FilterableCollectionIterator**

## Implements

* `Iterator`<`T`>

## Index

### Constructors

* [constructor](filterablecollectioniterator.md#constructor)

### Properties

* [filters](filterablecollectioniterator.md#filters)
* [items](filterablecollectioniterator.md#items)

### Methods

* [getNextMatchingItemFrom](filterablecollectioniterator.md#getnextmatchingitemfrom)
* [next](filterablecollectioniterator.md#next)
* [equals](filterablecollectioniterator.md#equals)
* [isInArray](filterablecollectioniterator.md#isinarray)
* [matchesRegex](filterablecollectioniterator.md#matchesregex)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new FilterableCollectionIterator**(items: *`Iterable`<`T`>*, filters: *[IDictionary](../interfaces/idictionary.md)<`any`>*): [FilterableCollectionIterator](filterablecollectioniterator.md)

*Defined in [DataModel/Collections/FilterableCollectionIterator.ts:9](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollectionIterator.ts#L9)*

Initializes a new instance of the {@link FilterableCollectionIterator} class.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| items | `Iterable`<`T`> |  Collection of items to iterate through. |
| filters | [IDictionary](../interfaces/idictionary.md)<`any`> |  Dictionary of predicate-value pairs used for filtering. |

**Returns:** [FilterableCollectionIterator](filterablecollectioniterator.md)

___

## Properties

<a id="filters"></a>

### `<Private>` filters

**● filters**: *[IDictionary](../interfaces/idictionary.md)<`any`>*

*Defined in [DataModel/Collections/FilterableCollectionIterator.ts:9](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollectionIterator.ts#L9)*

___
<a id="items"></a>

### `<Private>` items

**● items**: *`Iterator`<`T`>*

*Defined in [DataModel/Collections/FilterableCollectionIterator.ts:8](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollectionIterator.ts#L8)*

___

## Methods

<a id="getnextmatchingitemfrom"></a>

### `<Private>` getNextMatchingItemFrom

▸ **getNextMatchingItemFrom**(iterator: *`Iterator`<`T`>*): `T`

*Defined in [DataModel/Collections/FilterableCollectionIterator.ts:64](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollectionIterator.ts#L64)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| iterator | `Iterator`<`T`> |

**Returns:** `T`

___
<a id="next"></a>

###  next

▸ **next**(): `IteratorResult`<`T`>

*Defined in [DataModel/Collections/FilterableCollectionIterator.ts:22](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollectionIterator.ts#L22)*

*__inheritdoc__*: 

**Returns:** `IteratorResult`<`T`>

___
<a id="equals"></a>

### `<Static>``<Private>` equals

▸ **equals**(expectedValue: *`any`*, itemValue: *`any`*, predicate: *`any`*): `boolean`

*Defined in [DataModel/Collections/FilterableCollectionIterator.ts:53](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollectionIterator.ts#L53)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| expectedValue | `any` |
| itemValue | `any` |
| predicate | `any` |

**Returns:** `boolean`

___
<a id="isinarray"></a>

### `<Static>``<Private>` isInArray

▸ **isInArray**(expectedValue: *`any`*, itemValue: *`any`*, predicate: *`any`*): `boolean`

*Defined in [DataModel/Collections/FilterableCollectionIterator.ts:31](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollectionIterator.ts#L31)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| expectedValue | `any` |
| itemValue | `any` |
| predicate | `any` |

**Returns:** `boolean`

___
<a id="matchesregex"></a>

### `<Static>``<Private>` matchesRegex

▸ **matchesRegex**(expectedValue: *`any`*, itemValue: *`any`*, predicate: *`any`*): `boolean`

*Defined in [DataModel/Collections/FilterableCollectionIterator.ts:48](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollectionIterator.ts#L48)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| expectedValue | `any` |
| itemValue | `any` |
| predicate | `any` |

**Returns:** `boolean`

___

