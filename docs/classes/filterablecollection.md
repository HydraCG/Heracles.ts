[@hydra-cg/heracles.ts](../README.md) > [FilterableCollection](../classes/filterablecollection.md)

# Class: FilterableCollection

Provides a base functionality of a collection that filters itself with given predicates.

*__abstract__*: 

*__class__*: 

## Type parameters
#### T 
## Hierarchy

**FilterableCollection**

↳  [TypesCollection](typescollection.md)

↳  [ResourceFilterableCollection](resourcefilterablecollection.md)

## Index

### Constructors

* [constructor](filterablecollection.md#constructor)

### Properties

* [filters](filterablecollection.md#filters)
* [items](filterablecollection.md#items)

### Accessors

* [length](filterablecollection.md#length)

### Methods

* [__@iterator](filterablecollection.md#___iterator)
* [any](filterablecollection.md#any)
* [createInstance](filterablecollection.md#createinstance)
* [first](filterablecollection.md#first)
* [last](filterablecollection.md#last)
* [narrowFiltersWith](filterablecollection.md#narrowfilterswith)
* [toArray](filterablecollection.md#toarray)
* [where](filterablecollection.md#where)

---

## Constructors

<a id="constructor"></a>

### `<Protected>` constructor

⊕ **new FilterableCollection**(items?: *`Iterable`<`T`>*): [FilterableCollection](filterablecollection.md)

*Defined in [DataModel/Collections/FilterableCollection.ts:13](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L13)*

Initializes a new instance of the {@link FilterableCollection} class with initial collections of items to filter.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` items | `Iterable`<`T`> |

**Returns:** [FilterableCollection](filterablecollection.md)

___

## Properties

<a id="filters"></a>

### `<Private>` filters

**● filters**: *[IDictionary](../interfaces/idictionary.md)<`any`>*

*Defined in [DataModel/Collections/FilterableCollection.ts:13](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L13)*

___
<a id="items"></a>

### `<Private>` items

**● items**: *`Iterable`<`T`>*

*Defined in [DataModel/Collections/FilterableCollection.ts:12](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L12)*

___

## Accessors

<a id="length"></a>

###  length

**get length**(): `number`

*Defined in [DataModel/Collections/FilterableCollection.ts:38](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L38)*

Gets the number of items in this collection.

*__readonly__*: 

**Returns:** `number`

___

## Methods

<a id="___iterator"></a>

###  __@iterator

▸ **__@iterator**(): `Iterator`<`T`>

*Defined in [DataModel/Collections/FilterableCollection.ts:111](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L111)*

*__inheritdoc__*: 

**Returns:** `Iterator`<`T`>

___
<a id="any"></a>

###  any

▸ **any**(): `boolean`

*Defined in [DataModel/Collections/FilterableCollection.ts:52](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L52)*

Checks whether this collection has any items fitlered.

**Returns:** `boolean`

___
<a id="createinstance"></a>

### `<Protected>``<Abstract>` createInstance

▸ **createInstance**(items: *`Iterable`<`T`>*): [FilterableCollection](filterablecollection.md)<`T`>

*Defined in [DataModel/Collections/FilterableCollection.ts:121](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L121)*

Creates a new instance of the collection.

*__abstract__*: 

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| items | `Iterable`<`T`> |  Initial collection of items to filter. |

**Returns:** [FilterableCollection](filterablecollection.md)<`T`>

___
<a id="first"></a>

###  first

▸ **first**(): `T`

*Defined in [DataModel/Collections/FilterableCollection.ts:60](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L60)*

Gets the first item of the collection or null if there are no items matching the criteria.

**Returns:** `T`

___
<a id="last"></a>

###  last

▸ **last**(): `T`

*Defined in [DataModel/Collections/FilterableCollection.ts:69](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L69)*

Gets the last item of the collection or null if there are no items matching the criteria.

**Returns:** `T`

___
<a id="narrowfilterswith"></a>

### `<Protected>` narrowFiltersWith

▸ **narrowFiltersWith**<`TValue`>(predicate: *`string`*, matchEvaluator: *`function`*): [FilterableCollection](filterablecollection.md)<`T`>

▸ **narrowFiltersWith**(predicate: *`string`*, value: *`string` \| `RegExp`*): [FilterableCollection](filterablecollection.md)<`T`>

*Defined in [DataModel/Collections/FilterableCollection.ts:129](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L129)*

Creates a new instance of the [FilterableCollection](filterablecollection.md) with filter made narrower with given predicate.

**Type parameters:**

#### TValue 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| predicate | `string` |  Predicate of the filter. |
| matchEvaluator | `function` |  Match evaluator of the predicate to filter. |

**Returns:** [FilterableCollection](filterablecollection.md)<`T`>

*Defined in [DataModel/Collections/FilterableCollection.ts:140](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L140)*

Creates a new instance of the [FilterableCollection](filterablecollection.md) with filter made narrower with given predicate.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| predicate | `string` |  Predicate of the filter. |
| value | `string` \| `RegExp` |  Either value or regular expression to match the value of the predicate to filter. |

**Returns:** [FilterableCollection](filterablecollection.md)<`T`>

___
<a id="toarray"></a>

###  toArray

▸ **toArray**(): `T`[]

*Defined in [DataModel/Collections/FilterableCollection.ts:101](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L101)*

Flattens this collection to a standard array.

**Returns:** `T`[]

___
<a id="where"></a>

###  where

▸ **where**(matchEvaluator: *`function`*): [FilterableCollection](filterablecollection.md)<`T`>

*Defined in [DataModel/Collections/FilterableCollection.ts:83](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L83)*

Filters the collection with a generic match evaluator.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| matchEvaluator | `function` |  Match evaluation delegate. |

**Returns:** [FilterableCollection](filterablecollection.md)<`T`>

___

