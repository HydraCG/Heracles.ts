[@hydra-cg/heracles.ts](../README.md) > [TypesCollection](../classes/typescollection.md)

# Class: TypesCollection

Provides a collection of types that can be filtered with relevant criteria.

*__class__*: 

## Hierarchy

 [FilterableCollection](filterablecollection.md)<`string`>

**↳ TypesCollection**

## Index

### Constructors

* [constructor](typescollection.md#constructor)

### Properties

* [empty](typescollection.md#empty)

### Accessors

* [isCollection](typescollection.md#iscollection)
* [length](typescollection.md#length)

### Methods

* [__@iterator](typescollection.md#___iterator)
* [any](typescollection.md#any)
* [contains](typescollection.md#contains)
* [createInstance](typescollection.md#createinstance)
* [except](typescollection.md#except)
* [first](typescollection.md#first)
* [last](typescollection.md#last)
* [narrowFiltersWith](typescollection.md#narrowfilterswith)
* [toArray](typescollection.md#toarray)
* [where](typescollection.md#where)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new TypesCollection**(types?: *`Iterable`<`string`>*): [TypesCollection](typescollection.md)

*Overrides [FilterableCollection](filterablecollection.md).[constructor](filterablecollection.md#constructor)*

*Defined in [DataModel/Collections/TypesCollection.ts:13](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/TypesCollection.ts#L13)*

Initializes a new instance of the [TypesCollection](typescollection.md) class with initial collections of types to filter.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` types | `Iterable`<`string`> |

**Returns:** [TypesCollection](typescollection.md)

___

## Properties

<a id="empty"></a>

### `<Static>` empty

**● empty**: *[TypesCollection](typescollection.md)* =  new TypesCollection()

*Defined in [DataModel/Collections/TypesCollection.ts:13](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/TypesCollection.ts#L13)*

Defines an empty types collection.

*__constant__*: {TypesCollection}

___

## Accessors

<a id="iscollection"></a>

###  isCollection

**get isCollection**(): `boolean`

*Defined in [DataModel/Collections/TypesCollection.ts:37](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/TypesCollection.ts#L37)*

Gets a value indicating that resource owning this type's collection has hydra:Collection type.

**Returns:** `boolean`

___
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

▸ **__@iterator**(): `Iterator`<`string`>

*Inherited from [FilterableCollection](filterablecollection.md).[__@iterator](filterablecollection.md#___iterator)*

*Defined in [DataModel/Collections/FilterableCollection.ts:111](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L111)*

*__inheritdoc__*: 

**Returns:** `Iterator`<`string`>

___
<a id="any"></a>

###  any

▸ **any**(): `boolean`

*Inherited from [FilterableCollection](filterablecollection.md).[any](filterablecollection.md#any)*

*Defined in [DataModel/Collections/FilterableCollection.ts:52](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L52)*

Checks whether this collection has any items fitlered.

**Returns:** `boolean`

___
<a id="contains"></a>

###  contains

▸ **contains**(type: *`string`*): `boolean`

*Defined in [DataModel/Collections/TypesCollection.ts:46](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/TypesCollection.ts#L46)*

Checks whether this collection has a given type.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| type | `string` |  Type to look for. |

**Returns:** `boolean`

___
<a id="createinstance"></a>

### `<Protected>` createInstance

▸ **createInstance**(items: *`Iterable`<`string`>*): [TypesCollection](typescollection.md)

*Overrides [FilterableCollection](filterablecollection.md).[createInstance](filterablecollection.md#createinstance)*

*Defined in [DataModel/Collections/TypesCollection.ts:54](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/TypesCollection.ts#L54)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| items | `Iterable`<`string`> |

**Returns:** [TypesCollection](typescollection.md)

___
<a id="except"></a>

###  except

▸ **except**(type: *`string`*): [TypesCollection](typescollection.md)

*Defined in [DataModel/Collections/TypesCollection.ts:50](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/TypesCollection.ts#L50)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| type | `string` |

**Returns:** [TypesCollection](typescollection.md)

___
<a id="first"></a>

###  first

▸ **first**(): `string`

*Inherited from [FilterableCollection](filterablecollection.md).[first](filterablecollection.md#first)*

*Defined in [DataModel/Collections/FilterableCollection.ts:60](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L60)*

Gets the first item of the collection or null if there are no items matching the criteria.

**Returns:** `string`

___
<a id="last"></a>

###  last

▸ **last**(): `string`

*Inherited from [FilterableCollection](filterablecollection.md).[last](filterablecollection.md#last)*

*Defined in [DataModel/Collections/FilterableCollection.ts:69](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L69)*

Gets the last item of the collection or null if there are no items matching the criteria.

**Returns:** `string`

___
<a id="narrowfilterswith"></a>

### `<Protected>` narrowFiltersWith

▸ **narrowFiltersWith**<`TValue`>(predicate: *`string`*, matchEvaluator: *`function`*): [FilterableCollection](filterablecollection.md)<`string`>

▸ **narrowFiltersWith**(predicate: *`string`*, value: *`string` \| `RegExp`*): [FilterableCollection](filterablecollection.md)<`string`>

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

**Returns:** [FilterableCollection](filterablecollection.md)<`string`>

*Inherited from [FilterableCollection](filterablecollection.md).[narrowFiltersWith](filterablecollection.md#narrowfilterswith)*

*Defined in [DataModel/Collections/FilterableCollection.ts:140](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L140)*

Creates a new instance of the [FilterableCollection](filterablecollection.md) with filter made narrower with given predicate.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| predicate | `string` |  Predicate of the filter. |
| value | `string` \| `RegExp` |  Either value or regular expression to match the value of the predicate to filter. |

**Returns:** [FilterableCollection](filterablecollection.md)<`string`>

___
<a id="toarray"></a>

###  toArray

▸ **toArray**(): `string`[]

*Inherited from [FilterableCollection](filterablecollection.md).[toArray](filterablecollection.md#toarray)*

*Defined in [DataModel/Collections/FilterableCollection.ts:101](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L101)*

Flattens this collection to a standard array.

**Returns:** `string`[]

___
<a id="where"></a>

###  where

▸ **where**(matchEvaluator: *`function`*): [FilterableCollection](filterablecollection.md)<`string`>

*Inherited from [FilterableCollection](filterablecollection.md).[where](filterablecollection.md#where)*

*Defined in [DataModel/Collections/FilterableCollection.ts:83](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L83)*

Filters the collection with a generic match evaluator.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| matchEvaluator | `function` |  Match evaluation delegate. |

**Returns:** [FilterableCollection](filterablecollection.md)<`string`>

___

