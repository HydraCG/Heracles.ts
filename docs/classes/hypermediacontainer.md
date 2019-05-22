[@hydra-cg/heracles.ts](../README.md) > [HypermediaContainer](../classes/hypermediacontainer.md)

# Class: HypermediaContainer

Provides a default implementation of the [IHypermediaContainer](../interfaces/ihypermediacontainer.md) interface.

*__class__*: 

## Hierarchy

↳  [ResourceFilterableCollection](resourcefilterablecollection.md)<[IResource](../interfaces/iresource.md)>

**↳ HypermediaContainer**

## Implements

* [IHypermediaContainer](../interfaces/ihypermediacontainer.md)

## Index

### Constructors

* [constructor](hypermediacontainer.md#constructor)

### Properties

* [collections](hypermediacontainer.md#collections)
* [headers](hypermediacontainer.md#headers)
* [iri](hypermediacontainer.md#iri)
* [links](hypermediacontainer.md#links)
* [members](hypermediacontainer.md#members)
* [operations](hypermediacontainer.md#operations)
* [type](hypermediacontainer.md#type)
* [view](hypermediacontainer.md#view)

### Accessors

* [length](hypermediacontainer.md#length)

### Methods

* [__@iterator](hypermediacontainer.md#___iterator)
* [any](hypermediacontainer.md#any)
* [createInstance](hypermediacontainer.md#createinstance)
* [first](hypermediacontainer.md#first)
* [getIterator](hypermediacontainer.md#getiterator)
* [last](hypermediacontainer.md#last)
* [narrowFiltersWith](hypermediacontainer.md#narrowfilterswith)
* [nonBlank](hypermediacontainer.md#nonblank)
* [ofIri](hypermediacontainer.md#ofiri)
* [ofType](hypermediacontainer.md#oftype)
* [toArray](hypermediacontainer.md#toarray)
* [where](hypermediacontainer.md#where)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new HypermediaContainer**(headers: *[IHeaders](../interfaces/iheaders.md)*, rootResource: *[IResource](../interfaces/iresource.md)*, hypermedia: *`Iterable`<[IResource](../interfaces/iresource.md)>*): [HypermediaContainer](hypermediacontainer.md)

*Overrides [ResourceFilterableCollection](resourcefilterablecollection.md).[constructor](resourcefilterablecollection.md#constructor)*

*Defined in [DataModel/HypermediaContainer.ts:63](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/HypermediaContainer.ts#L63)*

Initializes a new instance of the [HypermediaContainer](hypermediacontainer.md) class.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| headers | [IHeaders](../interfaces/iheaders.md) |
| rootResource | [IResource](../interfaces/iresource.md) |  Main resource associated with the requested Url. |
| hypermedia | `Iterable`<[IResource](../interfaces/iresource.md)> |  Hypermedia controls to be stored within this container. |

**Returns:** [HypermediaContainer](hypermediacontainer.md)

___

## Properties

<a id="collections"></a>

###  collections

**● collections**: *[ResourceFilterableCollection](resourcefilterablecollection.md)<[ICollection](../interfaces/icollection.md)>*

*Implementation of [IHypermediaContainer](../interfaces/ihypermediacontainer.md).[collections](../interfaces/ihypermediacontainer.md#collections)*

*Defined in [DataModel/HypermediaContainer.ts:57](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/HypermediaContainer.ts#L57)*

Gets discovered collections.

___
<a id="headers"></a>

###  headers

**● headers**: *[IHeaders](../interfaces/iheaders.md)*

*Implementation of [IHypermediaContainer](../interfaces/ihypermediacontainer.md).[headers](../interfaces/ihypermediacontainer.md#headers)*

*Defined in [DataModel/HypermediaContainer.ts:42](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/HypermediaContainer.ts#L42)*

Gets response headers.

___
<a id="iri"></a>

###  iri

**● iri**: *`string`*

*Implementation of [IHypermediaContainer](../interfaces/ihypermediacontainer.md).[iri](../interfaces/ihypermediacontainer.md#iri)*

*Defined in [DataModel/HypermediaContainer.ts:45](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/HypermediaContainer.ts#L45)*

Gets an Iri of a resource.

*__readonly__*: 

*__returns__*: 

___
<a id="links"></a>

###  links

**● links**: *[LinksCollection](linkscollection.md)*

*Implementation of [IHypermediaContainer](../interfaces/ihypermediacontainer.md).[links](../interfaces/ihypermediacontainer.md#links)*

*Defined in [DataModel/HypermediaContainer.ts:63](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/HypermediaContainer.ts#L63)*

Gets a collection of links.

___
<a id="members"></a>

### `<Optional>` members

**● members**: *[ResourceFilterableCollection](resourcefilterablecollection.md)<[IResource](../interfaces/iresource.md)>*

*Implementation of [IHypermediaContainer](../interfaces/ihypermediacontainer.md).[members](../interfaces/ihypermediacontainer.md#members)*

*Defined in [DataModel/HypermediaContainer.ts:54](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/HypermediaContainer.ts#L54)*

Gets a collection members. This may be null if the resource owning this container is not a hydra:Collection.

___
<a id="operations"></a>

###  operations

**● operations**: *[OperationsCollection](operationscollection.md)*

*Implementation of [IHypermediaContainer](../interfaces/ihypermediacontainer.md).[operations](../interfaces/ihypermediacontainer.md#operations)*

*Defined in [DataModel/HypermediaContainer.ts:60](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/HypermediaContainer.ts#L60)*

Gets possible operations.

___
<a id="type"></a>

###  type

**● type**: *[TypesCollection](typescollection.md)*

*Implementation of [IHypermediaContainer](../interfaces/ihypermediacontainer.md).[type](../interfaces/ihypermediacontainer.md#type)*

*Defined in [DataModel/HypermediaContainer.ts:48](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/HypermediaContainer.ts#L48)*

Gets classes a given resource is of.

*__readonly__*: 

*__returns__*: 

___
<a id="view"></a>

### `<Optional>` view

**● view**: *[IHydraResource](../interfaces/ihydraresource.md)*

*Implementation of [IHypermediaContainer](../interfaces/ihypermediacontainer.md).[view](../interfaces/ihypermediacontainer.md#view)*

*Defined in [DataModel/HypermediaContainer.ts:51](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/HypermediaContainer.ts#L51)*

Gets a partial collection view. This may be null if the resource owning this container is not a hydra:Collection with hydra:view.

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

▸ **__@iterator**(): `Iterator`<[IResource](../interfaces/iresource.md)>

*Implementation of [IHypermediaContainer](../interfaces/ihypermediacontainer.md).[__@iterator](../interfaces/ihypermediacontainer.md#___iterator)*

*Inherited from [FilterableCollection](filterablecollection.md).[__@iterator](filterablecollection.md#___iterator)*

*Defined in [DataModel/Collections/FilterableCollection.ts:111](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L111)*

*__inheritdoc__*: 

**Returns:** `Iterator`<[IResource](../interfaces/iresource.md)>

___
<a id="any"></a>

###  any

▸ **any**(): `boolean`

*Implementation of [IHypermediaContainer](../interfaces/ihypermediacontainer.md).[any](../interfaces/ihypermediacontainer.md#any)*

*Inherited from [FilterableCollection](filterablecollection.md).[any](filterablecollection.md#any)*

*Defined in [DataModel/Collections/FilterableCollection.ts:52](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L52)*

Checks whether this collection has any items fitlered.

**Returns:** `boolean`

___
<a id="createinstance"></a>

### `<Protected>` createInstance

▸ **createInstance**(items: *`Iterable`<[IResource](../interfaces/iresource.md)>*): [ResourceFilterableCollection](resourcefilterablecollection.md)<[IResource](../interfaces/iresource.md)>

*Implementation of [IHypermediaContainer](../interfaces/ihypermediacontainer.md).[createInstance](../interfaces/ihypermediacontainer.md#createinstance)*

*Inherited from [ResourceFilterableCollection](resourcefilterablecollection.md).[createInstance](resourcefilterablecollection.md#createinstance)*

*Overrides [FilterableCollection](filterablecollection.md).[createInstance](filterablecollection.md#createinstance)*

*Defined in [DataModel/Collections/ResourceFilterableCollection.ts:54](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/ResourceFilterableCollection.ts#L54)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| items | `Iterable`<[IResource](../interfaces/iresource.md)> |

**Returns:** [ResourceFilterableCollection](resourcefilterablecollection.md)<[IResource](../interfaces/iresource.md)>

___
<a id="first"></a>

###  first

▸ **first**(): [IResource](../interfaces/iresource.md)

*Implementation of [IHypermediaContainer](../interfaces/ihypermediacontainer.md).[first](../interfaces/ihypermediacontainer.md#first)*

*Inherited from [FilterableCollection](filterablecollection.md).[first](filterablecollection.md#first)*

*Defined in [DataModel/Collections/FilterableCollection.ts:60](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L60)*

Gets the first item of the collection or null if there are no items matching the criteria.

**Returns:** [IResource](../interfaces/iresource.md)

___
<a id="getiterator"></a>

### `<Optional>` getIterator

▸ **getIterator**(): [IPartialCollectionIterator](../interfaces/ipartialcollectioniterator.md)

*Implementation of [IHypermediaContainer](../interfaces/ihypermediacontainer.md).[getIterator](../interfaces/ihypermediacontainer.md#getiterator)*

*Defined in [DataModel/HypermediaContainer.ts:87](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/HypermediaContainer.ts#L87)*

Gets a part iterator associated with the collection. This may be null if the resource owning this container is not a hydra:Collection with hydra:view.

**Returns:** [IPartialCollectionIterator](../interfaces/ipartialcollectioniterator.md)

___
<a id="last"></a>

###  last

▸ **last**(): [IResource](../interfaces/iresource.md)

*Implementation of [IHypermediaContainer](../interfaces/ihypermediacontainer.md).[last](../interfaces/ihypermediacontainer.md#last)*

*Inherited from [FilterableCollection](filterablecollection.md).[last](filterablecollection.md#last)*

*Defined in [DataModel/Collections/FilterableCollection.ts:69](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L69)*

Gets the last item of the collection or null if there are no items matching the criteria.

**Returns:** [IResource](../interfaces/iresource.md)

___
<a id="narrowfilterswith"></a>

### `<Protected>` narrowFiltersWith

▸ **narrowFiltersWith**<`TValue`>(predicate: *`string`*, matchEvaluator: *`function`*): [FilterableCollection](filterablecollection.md)<[IResource](../interfaces/iresource.md)>

▸ **narrowFiltersWith**(predicate: *`string`*, value: *`string` \| `RegExp`*): [FilterableCollection](filterablecollection.md)<[IResource](../interfaces/iresource.md)>

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

**Returns:** [FilterableCollection](filterablecollection.md)<[IResource](../interfaces/iresource.md)>

*Implementation of [IHypermediaContainer](../interfaces/ihypermediacontainer.md).[narrowFiltersWith](../interfaces/ihypermediacontainer.md#narrowfilterswith)*

*Inherited from [FilterableCollection](filterablecollection.md).[narrowFiltersWith](filterablecollection.md#narrowfilterswith)*

*Defined in [DataModel/Collections/FilterableCollection.ts:140](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L140)*

Creates a new instance of the [FilterableCollection](filterablecollection.md) with filter made narrower with given predicate.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| predicate | `string` |  Predicate of the filter. |
| value | `string` \| `RegExp` |  Either value or regular expression to match the value of the predicate to filter. |

**Returns:** [FilterableCollection](filterablecollection.md)<[IResource](../interfaces/iresource.md)>

___
<a id="nonblank"></a>

###  nonBlank

▸ **nonBlank**(): [ResourceFilterableCollection](resourcefilterablecollection.md)<[IResource](../interfaces/iresource.md)>

*Implementation of [IHypermediaContainer](../interfaces/ihypermediacontainer.md).[nonBlank](../interfaces/ihypermediacontainer.md#nonblank)*

*Inherited from [ResourceFilterableCollection](resourcefilterablecollection.md).[nonBlank](resourcefilterablecollection.md#nonblank)*

*Defined in [DataModel/Collections/ResourceFilterableCollection.ts:50](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/ResourceFilterableCollection.ts#L50)*

Obtains a collection of resources being non blank nodes;

**Returns:** [ResourceFilterableCollection](resourcefilterablecollection.md)<[IResource](../interfaces/iresource.md)>

___
<a id="ofiri"></a>

###  ofIri

▸ **ofIri**(iri: *`string`*): [ResourceFilterableCollection](resourcefilterablecollection.md)<[IResource](../interfaces/iresource.md)>

*Implementation of [IHypermediaContainer](../interfaces/ihypermediacontainer.md).[ofIri](../interfaces/ihypermediacontainer.md#ofiri)*

*Inherited from [ResourceFilterableCollection](resourcefilterablecollection.md).[ofIri](resourcefilterablecollection.md#ofiri)*

*Defined in [DataModel/Collections/ResourceFilterableCollection.ts:37](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/ResourceFilterableCollection.ts#L37)*

Obtains a collection of resources of a given Iri;

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| iri | `string` |  Iri of the resources. |

**Returns:** [ResourceFilterableCollection](resourcefilterablecollection.md)<[IResource](../interfaces/iresource.md)>

___
<a id="oftype"></a>

###  ofType

▸ **ofType**(iri: *`string`*): [ResourceFilterableCollection](resourcefilterablecollection.md)<[IResource](../interfaces/iresource.md)>

*Implementation of [IHypermediaContainer](../interfaces/ihypermediacontainer.md).[ofType](../interfaces/ihypermediacontainer.md#oftype)*

*Inherited from [ResourceFilterableCollection](resourcefilterablecollection.md).[ofType](resourcefilterablecollection.md#oftype)*

*Defined in [DataModel/Collections/ResourceFilterableCollection.ts:23](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/ResourceFilterableCollection.ts#L23)*

Obtains a collection of resources of a given type;

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| iri | `string` |  Type of the resources. |

**Returns:** [ResourceFilterableCollection](resourcefilterablecollection.md)<[IResource](../interfaces/iresource.md)>

___
<a id="toarray"></a>

###  toArray

▸ **toArray**(): [IResource](../interfaces/iresource.md)[]

*Implementation of [IHypermediaContainer](../interfaces/ihypermediacontainer.md).[toArray](../interfaces/ihypermediacontainer.md#toarray)*

*Inherited from [FilterableCollection](filterablecollection.md).[toArray](filterablecollection.md#toarray)*

*Defined in [DataModel/Collections/FilterableCollection.ts:101](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L101)*

Flattens this collection to a standard array.

**Returns:** [IResource](../interfaces/iresource.md)[]

___
<a id="where"></a>

###  where

▸ **where**(matchEvaluator: *`function`*): [FilterableCollection](filterablecollection.md)<[IResource](../interfaces/iresource.md)>

*Inherited from [FilterableCollection](filterablecollection.md).[where](filterablecollection.md#where)*

*Defined in [DataModel/Collections/FilterableCollection.ts:83](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L83)*

Filters the collection with a generic match evaluator.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| matchEvaluator | `function` |  Match evaluation delegate. |

**Returns:** [FilterableCollection](filterablecollection.md)<[IResource](../interfaces/iresource.md)>

___

