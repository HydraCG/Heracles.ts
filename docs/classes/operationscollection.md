[@hydra-cg/heracles.ts](../README.md) > [OperationsCollection](../classes/operationscollection.md)

# Class: OperationsCollection

Provides a collection of [IOperation](../interfaces/ioperation.md) that can be filtered with relevant criteria.

*__class__*: 

## Hierarchy

↳  [ResourceFilterableCollection](resourcefilterablecollection.md)<[IOperation](../interfaces/ioperation.md)>

**↳ OperationsCollection**

## Index

### Constructors

* [constructor](operationscollection.md#constructor)

### Properties

* [empty](operationscollection.md#empty)

### Accessors

* [length](operationscollection.md#length)

### Methods

* [__@iterator](operationscollection.md#___iterator)
* [any](operationscollection.md#any)
* [createInstance](operationscollection.md#createinstance)
* [expecting](operationscollection.md#expecting)
* [first](operationscollection.md#first)
* [last](operationscollection.md#last)
* [narrowFiltersWith](operationscollection.md#narrowfilterswith)
* [nonBlank](operationscollection.md#nonblank)
* [ofIri](operationscollection.md#ofiri)
* [ofType](operationscollection.md#oftype)
* [toArray](operationscollection.md#toarray)
* [where](operationscollection.md#where)
* [withTemplate](operationscollection.md#withtemplate)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new OperationsCollection**(operations?: *`Iterable`<[IOperation](../interfaces/ioperation.md)>*): [OperationsCollection](operationscollection.md)

*Overrides [ResourceFilterableCollection](resourcefilterablecollection.md).[constructor](resourcefilterablecollection.md#constructor)*

*Defined in [DataModel/Collections/OperationsCollection.ts:15](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/OperationsCollection.ts#L15)*

Initializes a new instance of the [OperationsCollection](operationscollection.md) class with initial collections of operations to filter.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` operations | `Iterable`<[IOperation](../interfaces/ioperation.md)> |

**Returns:** [OperationsCollection](operationscollection.md)

___

## Properties

<a id="empty"></a>

### `<Static>` empty

**● empty**: *[OperationsCollection](operationscollection.md)* =  new OperationsCollection()

*Defined in [DataModel/Collections/OperationsCollection.ts:15](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/OperationsCollection.ts#L15)*

Defines an empty operations collection.

*__constant__*: {OperationsCollection}

___

## Accessors

<a id="length"></a>

###  length

**get length**(): `number`

*Inherited from [FilterableCollection](filterablecollection.md).[length](filterablecollection.md#length)*

*Defined in [DataModel/Collections/FilterableCollection.ts:38](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L38)*

Gets the number of items in this collection.

*__readonly__*: 

**Returns:** `number`

___

## Methods

<a id="___iterator"></a>

###  __@iterator

▸ **__@iterator**(): `Iterator`<[IOperation](../interfaces/ioperation.md)>

*Inherited from [FilterableCollection](filterablecollection.md).[__@iterator](filterablecollection.md#___iterator)*

*Defined in [DataModel/Collections/FilterableCollection.ts:111](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L111)*

*__inheritdoc__*: 

**Returns:** `Iterator`<[IOperation](../interfaces/ioperation.md)>

___
<a id="any"></a>

###  any

▸ **any**(): `boolean`

*Inherited from [FilterableCollection](filterablecollection.md).[any](filterablecollection.md#any)*

*Defined in [DataModel/Collections/FilterableCollection.ts:52](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L52)*

Checks whether this collection has any items fitlered.

**Returns:** `boolean`

___
<a id="createinstance"></a>

### `<Protected>` createInstance

▸ **createInstance**(items: *`Iterable`<[IOperation](../interfaces/ioperation.md)>*): [OperationsCollection](operationscollection.md)

*Overrides [ResourceFilterableCollection](resourcefilterablecollection.md).[createInstance](resourcefilterablecollection.md#createinstance)*

*Defined in [DataModel/Collections/OperationsCollection.ts:48](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/OperationsCollection.ts#L48)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| items | `Iterable`<[IOperation](../interfaces/ioperation.md)> |

**Returns:** [OperationsCollection](operationscollection.md)

___
<a id="expecting"></a>

###  expecting

▸ **expecting**(iri: *`string`*): [OperationsCollection](operationscollection.md)

*Defined in [DataModel/Collections/OperationsCollection.ts:31](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/OperationsCollection.ts#L31)*

Obtains a collection of operations expecting a given type.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| iri | `string` |  Expected type. |

**Returns:** [OperationsCollection](operationscollection.md)

___
<a id="first"></a>

###  first

▸ **first**(): [IOperation](../interfaces/ioperation.md)

*Inherited from [FilterableCollection](filterablecollection.md).[first](filterablecollection.md#first)*

*Defined in [DataModel/Collections/FilterableCollection.ts:60](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L60)*

Gets the first item of the collection or null if there are no items matching the criteria.

**Returns:** [IOperation](../interfaces/ioperation.md)

___
<a id="last"></a>

###  last

▸ **last**(): [IOperation](../interfaces/ioperation.md)

*Inherited from [FilterableCollection](filterablecollection.md).[last](filterablecollection.md#last)*

*Defined in [DataModel/Collections/FilterableCollection.ts:69](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L69)*

Gets the last item of the collection or null if there are no items matching the criteria.

**Returns:** [IOperation](../interfaces/ioperation.md)

___
<a id="narrowfilterswith"></a>

### `<Protected>` narrowFiltersWith

▸ **narrowFiltersWith**<`TValue`>(predicate: *`string`*, matchEvaluator: *`function`*): [FilterableCollection](filterablecollection.md)<[IOperation](../interfaces/ioperation.md)>

▸ **narrowFiltersWith**(predicate: *`string`*, value: *`string` \| `RegExp`*): [FilterableCollection](filterablecollection.md)<[IOperation](../interfaces/ioperation.md)>

*Inherited from [FilterableCollection](filterablecollection.md).[narrowFiltersWith](filterablecollection.md#narrowfilterswith)*

*Defined in [DataModel/Collections/FilterableCollection.ts:129](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L129)*

Creates a new instance of the [FilterableCollection](filterablecollection.md) with filter made narrower with given predicate.

**Type parameters:**

#### TValue 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| predicate | `string` |  Predicate of the filter. |
| matchEvaluator | `function` |  Match evaluator of the predicate to filter. |

**Returns:** [FilterableCollection](filterablecollection.md)<[IOperation](../interfaces/ioperation.md)>

*Inherited from [FilterableCollection](filterablecollection.md).[narrowFiltersWith](filterablecollection.md#narrowfilterswith)*

*Defined in [DataModel/Collections/FilterableCollection.ts:140](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L140)*

Creates a new instance of the [FilterableCollection](filterablecollection.md) with filter made narrower with given predicate.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| predicate | `string` |  Predicate of the filter. |
| value | `string` \| `RegExp` |  Either value or regular expression to match the value of the predicate to filter. |

**Returns:** [FilterableCollection](filterablecollection.md)<[IOperation](../interfaces/ioperation.md)>

___
<a id="nonblank"></a>

###  nonBlank

▸ **nonBlank**(): [ResourceFilterableCollection](resourcefilterablecollection.md)<[IOperation](../interfaces/ioperation.md)>

*Inherited from [ResourceFilterableCollection](resourcefilterablecollection.md).[nonBlank](resourcefilterablecollection.md#nonblank)*

*Defined in [DataModel/Collections/ResourceFilterableCollection.ts:50](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/ResourceFilterableCollection.ts#L50)*

Obtains a collection of resources being non blank nodes;

**Returns:** [ResourceFilterableCollection](resourcefilterablecollection.md)<[IOperation](../interfaces/ioperation.md)>

___
<a id="ofiri"></a>

###  ofIri

▸ **ofIri**(iri: *`string`*): [ResourceFilterableCollection](resourcefilterablecollection.md)<[IOperation](../interfaces/ioperation.md)>

*Inherited from [ResourceFilterableCollection](resourcefilterablecollection.md).[ofIri](resourcefilterablecollection.md#ofiri)*

*Defined in [DataModel/Collections/ResourceFilterableCollection.ts:37](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/ResourceFilterableCollection.ts#L37)*

Obtains a collection of resources of a given Iri;

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| iri | `string` |  Iri of the resources. |

**Returns:** [ResourceFilterableCollection](resourcefilterablecollection.md)<[IOperation](../interfaces/ioperation.md)>

___
<a id="oftype"></a>

###  ofType

▸ **ofType**(iri: *`string`*): [ResourceFilterableCollection](resourcefilterablecollection.md)<[IOperation](../interfaces/ioperation.md)>

*Inherited from [ResourceFilterableCollection](resourcefilterablecollection.md).[ofType](resourcefilterablecollection.md#oftype)*

*Defined in [DataModel/Collections/ResourceFilterableCollection.ts:23](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/ResourceFilterableCollection.ts#L23)*

Obtains a collection of resources of a given type;

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| iri | `string` |  Type of the resources. |

**Returns:** [ResourceFilterableCollection](resourcefilterablecollection.md)<[IOperation](../interfaces/ioperation.md)>

___
<a id="toarray"></a>

###  toArray

▸ **toArray**(): [IOperation](../interfaces/ioperation.md)[]

*Inherited from [FilterableCollection](filterablecollection.md).[toArray](filterablecollection.md#toarray)*

*Defined in [DataModel/Collections/FilterableCollection.ts:101](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L101)*

Flattens this collection to a standard array.

**Returns:** [IOperation](../interfaces/ioperation.md)[]

___
<a id="where"></a>

###  where

▸ **where**(matchEvaluator: *`function`*): [FilterableCollection](filterablecollection.md)<[IOperation](../interfaces/ioperation.md)>

*Inherited from [FilterableCollection](filterablecollection.md).[where](filterablecollection.md#where)*

*Defined in [DataModel/Collections/FilterableCollection.ts:83](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L83)*

Filters the collection with a generic match evaluator.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| matchEvaluator | `function` |  Match evaluation delegate. |

**Returns:** [FilterableCollection](filterablecollection.md)<[IOperation](../interfaces/ioperation.md)>

___
<a id="withtemplate"></a>

###  withTemplate

▸ **withTemplate**(): [OperationsCollection](operationscollection.md)

*Defined in [DataModel/Collections/OperationsCollection.ts:44](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/OperationsCollection.ts#L44)*

Obtains a collection of operations being an hydra:IriTemplate.

**Returns:** [OperationsCollection](operationscollection.md)

___

