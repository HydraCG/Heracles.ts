[@hydra-cg/heracles.ts](../README.md) > [MappingsCollection](../classes/mappingscollection.md)

# Class: MappingsCollection

Provides a collection of [IIriTemplateMapping](../interfaces/iiritemplatemapping.md) that can be filtered with relevant criteria.

*__class__*: 

## Hierarchy

↳  [ResourceFilterableCollection](resourcefilterablecollection.md)<[IIriTemplateMapping](../interfaces/iiritemplatemapping.md)>

**↳ MappingsCollection**

## Index

### Constructors

* [constructor](mappingscollection.md#constructor)

### Accessors

* [length](mappingscollection.md#length)

### Methods

* [__@iterator](mappingscollection.md#___iterator)
* [any](mappingscollection.md#any)
* [createInstance](mappingscollection.md#createinstance)
* [first](mappingscollection.md#first)
* [last](mappingscollection.md#last)
* [narrowFiltersWith](mappingscollection.md#narrowfilterswith)
* [nonBlank](mappingscollection.md#nonblank)
* [ofIri](mappingscollection.md#ofiri)
* [ofProperty](mappingscollection.md#ofproperty)
* [ofType](mappingscollection.md#oftype)
* [ofVariableName](mappingscollection.md#ofvariablename)
* [toArray](mappingscollection.md#toarray)
* [where](mappingscollection.md#where)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new MappingsCollection**(mappings?: *`Iterable`<[IIriTemplateMapping](../interfaces/iiritemplatemapping.md)>*): [MappingsCollection](mappingscollection.md)

*Overrides [ResourceFilterableCollection](resourcefilterablecollection.md).[constructor](resourcefilterablecollection.md#constructor)*

*Defined in [DataModel/Collections/MappingsCollection.ts:8](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/MappingsCollection.ts#L8)*

Initializes a new instance of the [MappingsCollection](mappingscollection.md) class with initial collections of mappings to filter.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` mappings | `Iterable`<[IIriTemplateMapping](../interfaces/iiritemplatemapping.md)> |

**Returns:** [MappingsCollection](mappingscollection.md)

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

▸ **__@iterator**(): `Iterator`<[IIriTemplateMapping](../interfaces/iiritemplatemapping.md)>

*Inherited from [FilterableCollection](filterablecollection.md).[__@iterator](filterablecollection.md#___iterator)*

*Defined in [DataModel/Collections/FilterableCollection.ts:111](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L111)*

*__inheritdoc__*: 

**Returns:** `Iterator`<[IIriTemplateMapping](../interfaces/iiritemplatemapping.md)>

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

▸ **createInstance**(items: *`Iterable`<[IIriTemplateMapping](../interfaces/iiritemplatemapping.md)>*): [MappingsCollection](mappingscollection.md)

*Overrides [ResourceFilterableCollection](resourcefilterablecollection.md).[createInstance](resourcefilterablecollection.md#createinstance)*

*Defined in [DataModel/Collections/MappingsCollection.ts:49](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/MappingsCollection.ts#L49)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| items | `Iterable`<[IIriTemplateMapping](../interfaces/iiritemplatemapping.md)> |

**Returns:** [MappingsCollection](mappingscollection.md)

___
<a id="first"></a>

###  first

▸ **first**(): [IIriTemplateMapping](../interfaces/iiritemplatemapping.md)

*Inherited from [FilterableCollection](filterablecollection.md).[first](filterablecollection.md#first)*

*Defined in [DataModel/Collections/FilterableCollection.ts:60](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L60)*

Gets the first item of the collection or null if there are no items matching the criteria.

**Returns:** [IIriTemplateMapping](../interfaces/iiritemplatemapping.md)

___
<a id="last"></a>

###  last

▸ **last**(): [IIriTemplateMapping](../interfaces/iiritemplatemapping.md)

*Inherited from [FilterableCollection](filterablecollection.md).[last](filterablecollection.md#last)*

*Defined in [DataModel/Collections/FilterableCollection.ts:69](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L69)*

Gets the last item of the collection or null if there are no items matching the criteria.

**Returns:** [IIriTemplateMapping](../interfaces/iiritemplatemapping.md)

___
<a id="narrowfilterswith"></a>

### `<Protected>` narrowFiltersWith

▸ **narrowFiltersWith**<`TValue`>(predicate: *`string`*, matchEvaluator: *`function`*): [FilterableCollection](filterablecollection.md)<[IIriTemplateMapping](../interfaces/iiritemplatemapping.md)>

▸ **narrowFiltersWith**(predicate: *`string`*, value: *`string` \| `RegExp`*): [FilterableCollection](filterablecollection.md)<[IIriTemplateMapping](../interfaces/iiritemplatemapping.md)>

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

**Returns:** [FilterableCollection](filterablecollection.md)<[IIriTemplateMapping](../interfaces/iiritemplatemapping.md)>

*Inherited from [FilterableCollection](filterablecollection.md).[narrowFiltersWith](filterablecollection.md#narrowfilterswith)*

*Defined in [DataModel/Collections/FilterableCollection.ts:140](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L140)*

Creates a new instance of the [FilterableCollection](filterablecollection.md) with filter made narrower with given predicate.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| predicate | `string` |  Predicate of the filter. |
| value | `string` \| `RegExp` |  Either value or regular expression to match the value of the predicate to filter. |

**Returns:** [FilterableCollection](filterablecollection.md)<[IIriTemplateMapping](../interfaces/iiritemplatemapping.md)>

___
<a id="nonblank"></a>

###  nonBlank

▸ **nonBlank**(): [ResourceFilterableCollection](resourcefilterablecollection.md)<[IIriTemplateMapping](../interfaces/iiritemplatemapping.md)>

*Inherited from [ResourceFilterableCollection](resourcefilterablecollection.md).[nonBlank](resourcefilterablecollection.md#nonblank)*

*Defined in [DataModel/Collections/ResourceFilterableCollection.ts:50](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/ResourceFilterableCollection.ts#L50)*

Obtains a collection of resources being non blank nodes;

**Returns:** [ResourceFilterableCollection](resourcefilterablecollection.md)<[IIriTemplateMapping](../interfaces/iiritemplatemapping.md)>

___
<a id="ofiri"></a>

###  ofIri

▸ **ofIri**(iri: *`string`*): [ResourceFilterableCollection](resourcefilterablecollection.md)<[IIriTemplateMapping](../interfaces/iiritemplatemapping.md)>

*Inherited from [ResourceFilterableCollection](resourcefilterablecollection.md).[ofIri](resourcefilterablecollection.md#ofiri)*

*Defined in [DataModel/Collections/ResourceFilterableCollection.ts:37](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/ResourceFilterableCollection.ts#L37)*

Obtains a collection of resources of a given Iri;

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| iri | `string` |  Iri of the resources. |

**Returns:** [ResourceFilterableCollection](resourcefilterablecollection.md)<[IIriTemplateMapping](../interfaces/iiritemplatemapping.md)>

___
<a id="ofproperty"></a>

###  ofProperty

▸ **ofProperty**(property: *`string`*): [MappingsCollection](mappingscollection.md)

*Defined in [DataModel/Collections/MappingsCollection.ts:37](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/MappingsCollection.ts#L37)*

Obtains a collection of mappings for a given predicate.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| property | `string` |  Predicate IRI. |

**Returns:** [MappingsCollection](mappingscollection.md)

___
<a id="oftype"></a>

###  ofType

▸ **ofType**(iri: *`string`*): [ResourceFilterableCollection](resourcefilterablecollection.md)<[IIriTemplateMapping](../interfaces/iiritemplatemapping.md)>

*Inherited from [ResourceFilterableCollection](resourcefilterablecollection.md).[ofType](resourcefilterablecollection.md#oftype)*

*Defined in [DataModel/Collections/ResourceFilterableCollection.ts:23](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/ResourceFilterableCollection.ts#L23)*

Obtains a collection of resources of a given type;

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| iri | `string` |  Type of the resources. |

**Returns:** [ResourceFilterableCollection](resourcefilterablecollection.md)<[IIriTemplateMapping](../interfaces/iiritemplatemapping.md)>

___
<a id="ofvariablename"></a>

###  ofVariableName

▸ **ofVariableName**(variableName: *`string`*): [MappingsCollection](mappingscollection.md)

*Defined in [DataModel/Collections/MappingsCollection.ts:23](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/MappingsCollection.ts#L23)*

Obtains a collection of mappings for a given variable name.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| variableName | `string` |  Variable name. |

**Returns:** [MappingsCollection](mappingscollection.md)

___
<a id="toarray"></a>

###  toArray

▸ **toArray**(): [IIriTemplateMapping](../interfaces/iiritemplatemapping.md)[]

*Inherited from [FilterableCollection](filterablecollection.md).[toArray](filterablecollection.md#toarray)*

*Defined in [DataModel/Collections/FilterableCollection.ts:101](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L101)*

Flattens this collection to a standard array.

**Returns:** [IIriTemplateMapping](../interfaces/iiritemplatemapping.md)[]

___
<a id="where"></a>

###  where

▸ **where**(matchEvaluator: *`function`*): [FilterableCollection](filterablecollection.md)<[IIriTemplateMapping](../interfaces/iiritemplatemapping.md)>

*Inherited from [FilterableCollection](filterablecollection.md).[where](filterablecollection.md#where)*

*Defined in [DataModel/Collections/FilterableCollection.ts:83](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L83)*

Filters the collection with a generic match evaluator.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| matchEvaluator | `function` |  Match evaluation delegate. |

**Returns:** [FilterableCollection](filterablecollection.md)<[IIriTemplateMapping](../interfaces/iiritemplatemapping.md)>

___

