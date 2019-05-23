[@hydra-cg/heracles.ts](../README.md) > [ResourceFilterableCollection](../classes/resourcefilterablecollection.md)

# Class: ResourceFilterableCollection

Provides a collection of [IResource](../interfaces/iresource.md) that can be filtered with relevant criteria.

*__class__*: 

## Type parameters
#### T :  [IResource](../interfaces/iresource.md)
## Hierarchy

 [FilterableCollection](filterablecollection.md)<`T`>

**↳ ResourceFilterableCollection**

↳  [OperationsCollection](operationscollection.md)

↳  [LinksCollection](linkscollection.md)

↳  [MappingsCollection](mappingscollection.md)

↳  [IHypermediaContainer](../interfaces/ihypermediacontainer.md)

↳  [HypermediaContainer](hypermediacontainer.md)

## Index

### Constructors

* [constructor](resourcefilterablecollection.md#constructor)

### Accessors

* [length](resourcefilterablecollection.md#length)

### Methods

* [__@iterator](resourcefilterablecollection.md#___iterator)
* [any](resourcefilterablecollection.md#any)
* [createInstance](resourcefilterablecollection.md#createinstance)
* [first](resourcefilterablecollection.md#first)
* [last](resourcefilterablecollection.md#last)
* [narrowFiltersWith](resourcefilterablecollection.md#narrowfilterswith)
* [nonBlank](resourcefilterablecollection.md#nonblank)
* [ofIri](resourcefilterablecollection.md#ofiri)
* [ofType](resourcefilterablecollection.md#oftype)
* [toArray](resourcefilterablecollection.md#toarray)
* [where](resourcefilterablecollection.md#where)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ResourceFilterableCollection**(resources?: *`Iterable`<`T`>*): [ResourceFilterableCollection](resourcefilterablecollection.md)

*Overrides [FilterableCollection](filterablecollection.md).[constructor](filterablecollection.md#constructor)*

*Defined in [DataModel/Collections/ResourceFilterableCollection.ts:8](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/ResourceFilterableCollection.ts#L8)*

Initializes a new instance of the {@link ResourceFilterableCollection} class with initial collections of resources to filter.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` resources | `Iterable`<`T`> |

**Returns:** [ResourceFilterableCollection](resourcefilterablecollection.md)

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

▸ **__@iterator**(): `Iterator`<`T`>

*Inherited from [FilterableCollection](filterablecollection.md).[__@iterator](filterablecollection.md#___iterator)*

*Defined in [DataModel/Collections/FilterableCollection.ts:111](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L111)*

*__inheritdoc__*: 

**Returns:** `Iterator`<`T`>

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

▸ **createInstance**(items: *`Iterable`<`T`>*): [ResourceFilterableCollection](resourcefilterablecollection.md)<`T`>

*Overrides [FilterableCollection](filterablecollection.md).[createInstance](filterablecollection.md#createinstance)*

*Defined in [DataModel/Collections/ResourceFilterableCollection.ts:54](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/ResourceFilterableCollection.ts#L54)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| items | `Iterable`<`T`> |

**Returns:** [ResourceFilterableCollection](resourcefilterablecollection.md)<`T`>

___
<a id="first"></a>

###  first

▸ **first**(): `T`

*Inherited from [FilterableCollection](filterablecollection.md).[first](filterablecollection.md#first)*

*Defined in [DataModel/Collections/FilterableCollection.ts:60](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L60)*

Gets the first item of the collection or null if there are no items matching the criteria.

**Returns:** `T`

___
<a id="last"></a>

###  last

▸ **last**(): `T`

*Inherited from [FilterableCollection](filterablecollection.md).[last](filterablecollection.md#last)*

*Defined in [DataModel/Collections/FilterableCollection.ts:69](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L69)*

Gets the last item of the collection or null if there are no items matching the criteria.

**Returns:** `T`

___
<a id="narrowfilterswith"></a>

### `<Protected>` narrowFiltersWith

▸ **narrowFiltersWith**<`TValue`>(predicate: *`string`*, matchEvaluator: *`function`*): [FilterableCollection](filterablecollection.md)<`T`>

▸ **narrowFiltersWith**(predicate: *`string`*, value: *`string` \| `RegExp`*): [FilterableCollection](filterablecollection.md)<`T`>

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

**Returns:** [FilterableCollection](filterablecollection.md)<`T`>

*Inherited from [FilterableCollection](filterablecollection.md).[narrowFiltersWith](filterablecollection.md#narrowfilterswith)*

*Defined in [DataModel/Collections/FilterableCollection.ts:140](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L140)*

Creates a new instance of the [FilterableCollection](filterablecollection.md) with filter made narrower with given predicate.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| predicate | `string` |  Predicate of the filter. |
| value | `string` \| `RegExp` |  Either value or regular expression to match the value of the predicate to filter. |

**Returns:** [FilterableCollection](filterablecollection.md)<`T`>

___
<a id="nonblank"></a>

###  nonBlank

▸ **nonBlank**(): [ResourceFilterableCollection](resourcefilterablecollection.md)<`T`>

*Defined in [DataModel/Collections/ResourceFilterableCollection.ts:50](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/ResourceFilterableCollection.ts#L50)*

Obtains a collection of resources being non blank nodes;

**Returns:** [ResourceFilterableCollection](resourcefilterablecollection.md)<`T`>

___
<a id="ofiri"></a>

###  ofIri

▸ **ofIri**(iri: *`string`*): [ResourceFilterableCollection](resourcefilterablecollection.md)<`T`>

*Defined in [DataModel/Collections/ResourceFilterableCollection.ts:37](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/ResourceFilterableCollection.ts#L37)*

Obtains a collection of resources of a given Iri;

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| iri | `string` |  Iri of the resources. |

**Returns:** [ResourceFilterableCollection](resourcefilterablecollection.md)<`T`>

___
<a id="oftype"></a>

###  ofType

▸ **ofType**(iri: *`string`*): [ResourceFilterableCollection](resourcefilterablecollection.md)<`T`>

*Defined in [DataModel/Collections/ResourceFilterableCollection.ts:23](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/ResourceFilterableCollection.ts#L23)*

Obtains a collection of resources of a given type;

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| iri | `string` |  Type of the resources. |

**Returns:** [ResourceFilterableCollection](resourcefilterablecollection.md)<`T`>

___
<a id="toarray"></a>

###  toArray

▸ **toArray**(): `T`[]

*Inherited from [FilterableCollection](filterablecollection.md).[toArray](filterablecollection.md#toarray)*

*Defined in [DataModel/Collections/FilterableCollection.ts:101](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L101)*

Flattens this collection to a standard array.

**Returns:** `T`[]

___
<a id="where"></a>

###  where

▸ **where**(matchEvaluator: *`function`*): [FilterableCollection](filterablecollection.md)<`T`>

*Inherited from [FilterableCollection](filterablecollection.md).[where](filterablecollection.md#where)*

*Defined in [DataModel/Collections/FilterableCollection.ts:83](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L83)*

Filters the collection with a generic match evaluator.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| matchEvaluator | `function` |  Match evaluation delegate. |

**Returns:** [FilterableCollection](filterablecollection.md)<`T`>

___

