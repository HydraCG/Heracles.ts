[@hydra-cg/heracles.ts](../README.md) > [IHypermediaContainer](../interfaces/ihypermediacontainer.md)

# Interface: IHypermediaContainer

Provides an abstraction layer over hypermedia container.

## Hierarchy

↳  [ResourceFilterableCollection](../classes/resourcefilterablecollection.md)<[IResource](iresource.md)>

 [IResource](iresource.md)

**↳ IHypermediaContainer**

## Implemented by

* [HypermediaContainer](../classes/hypermediacontainer.md)

## Index

### Constructors

* [constructor](ihypermediacontainer.md#constructor)

### Properties

* [collections](ihypermediacontainer.md#collections)
* [headers](ihypermediacontainer.md#headers)
* [iri](ihypermediacontainer.md#iri)
* [links](ihypermediacontainer.md#links)
* [members](ihypermediacontainer.md#members)
* [operations](ihypermediacontainer.md#operations)
* [type](ihypermediacontainer.md#type)
* [view](ihypermediacontainer.md#view)

### Accessors

* [length](ihypermediacontainer.md#length)

### Methods

* [__@iterator](ihypermediacontainer.md#___iterator)
* [any](ihypermediacontainer.md#any)
* [createInstance](ihypermediacontainer.md#createinstance)
* [first](ihypermediacontainer.md#first)
* [getIterator](ihypermediacontainer.md#getiterator)
* [last](ihypermediacontainer.md#last)
* [narrowFiltersWith](ihypermediacontainer.md#narrowfilterswith)
* [nonBlank](ihypermediacontainer.md#nonblank)
* [ofIri](ihypermediacontainer.md#ofiri)
* [ofType](ihypermediacontainer.md#oftype)
* [toArray](ihypermediacontainer.md#toarray)
* [where](ihypermediacontainer.md#where)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new IHypermediaContainer**(resources?: *`Iterable`<[IResource](iresource.md)>*): [IHypermediaContainer](ihypermediacontainer.md)

*Inherited from [ResourceFilterableCollection](../classes/resourcefilterablecollection.md).[constructor](../classes/resourcefilterablecollection.md#constructor)*

*Overrides [FilterableCollection](../classes/filterablecollection.md).[constructor](../classes/filterablecollection.md#constructor)*

*Defined in [DataModel/Collections/ResourceFilterableCollection.ts:8](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/ResourceFilterableCollection.ts#L8)*

Initializes a new instance of the {@link ResourceFilterableCollection} class with initial collections of resources to filter.

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` resources | `Iterable`<[IResource](iresource.md)> |

**Returns:** [IHypermediaContainer](ihypermediacontainer.md)

___

## Properties

<a id="collections"></a>

###  collections

**● collections**: *[ResourceFilterableCollection](../classes/resourcefilterablecollection.md)<[ICollection](icollection.md)>*

*Defined in [DataModel/IHypermediaContainer.ts:27](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IHypermediaContainer.ts#L27)*

Gets discovered collections.

___
<a id="headers"></a>

###  headers

**● headers**: *[IHeaders](iheaders.md)*

*Defined in [DataModel/IHypermediaContainer.ts:44](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IHypermediaContainer.ts#L44)*

Gets response headers.

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

*Defined in [DataModel/IHypermediaContainer.ts:17](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IHypermediaContainer.ts#L17)*

Gets a collection of links.

___
<a id="members"></a>

### `<Optional>` members

**● members**: *[ResourceFilterableCollection](../classes/resourcefilterablecollection.md)<[IResource](iresource.md)>*

*Defined in [DataModel/IHypermediaContainer.ts:33](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IHypermediaContainer.ts#L33)*

Gets a collection members. This may be null if the resource owning this container is not a hydra:Collection.

___
<a id="operations"></a>

###  operations

**● operations**: *[OperationsCollection](../classes/operationscollection.md)*

*Defined in [DataModel/IHypermediaContainer.ts:22](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IHypermediaContainer.ts#L22)*

Gets possible operations.

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

**● view**: *[IHydraResource](ihydraresource.md)*

*Defined in [DataModel/IHypermediaContainer.ts:39](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IHypermediaContainer.ts#L39)*

Gets a partial collection view. This may be null if the resource owning this container is not a hydra:Collection with hydra:view.

___

## Accessors

<a id="length"></a>

###  length

**get length**(): `number`

*Inherited from [FilterableCollection](../classes/filterablecollection.md).[length](../classes/filterablecollection.md#length)*

*Defined in [DataModel/Collections/FilterableCollection.ts:38](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L38)*

Gets the number of items in this collection.

*__readonly__*: 

**Returns:** `number`

___

## Methods

<a id="___iterator"></a>

###  __@iterator

▸ **__@iterator**(): `Iterator`<[IResource](iresource.md)>

*Inherited from [FilterableCollection](../classes/filterablecollection.md).[__@iterator](../classes/filterablecollection.md#___iterator)*

*Defined in [DataModel/Collections/FilterableCollection.ts:111](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L111)*

*__inheritdoc__*: 

**Returns:** `Iterator`<[IResource](iresource.md)>

___
<a id="any"></a>

###  any

▸ **any**(): `boolean`

*Inherited from [FilterableCollection](../classes/filterablecollection.md).[any](../classes/filterablecollection.md#any)*

*Defined in [DataModel/Collections/FilterableCollection.ts:52](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L52)*

Checks whether this collection has any items fitlered.

**Returns:** `boolean`

___
<a id="createinstance"></a>

### `<Protected>` createInstance

▸ **createInstance**(items: *`Iterable`<[IResource](iresource.md)>*): [ResourceFilterableCollection](../classes/resourcefilterablecollection.md)<[IResource](iresource.md)>

*Inherited from [ResourceFilterableCollection](../classes/resourcefilterablecollection.md).[createInstance](../classes/resourcefilterablecollection.md#createinstance)*

*Overrides [FilterableCollection](../classes/filterablecollection.md).[createInstance](../classes/filterablecollection.md#createinstance)*

*Defined in [DataModel/Collections/ResourceFilterableCollection.ts:54](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/ResourceFilterableCollection.ts#L54)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| items | `Iterable`<[IResource](iresource.md)> |

**Returns:** [ResourceFilterableCollection](../classes/resourcefilterablecollection.md)<[IResource](iresource.md)>

___
<a id="first"></a>

###  first

▸ **first**(): [IResource](iresource.md)

*Inherited from [FilterableCollection](../classes/filterablecollection.md).[first](../classes/filterablecollection.md#first)*

*Defined in [DataModel/Collections/FilterableCollection.ts:60](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L60)*

Gets the first item of the collection or null if there are no items matching the criteria.

**Returns:** [IResource](iresource.md)

___
<a id="getiterator"></a>

### `<Optional>` getIterator

▸ **getIterator**(): [IPartialCollectionIterator](ipartialcollectioniterator.md)

*Defined in [DataModel/IHypermediaContainer.ts:51](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IHypermediaContainer.ts#L51)*

Gets a part iterator associated with the collection. This may be null if the resource owning this container is not a hydra:Collection with hydra:view.

**Returns:** [IPartialCollectionIterator](ipartialcollectioniterator.md)

___
<a id="last"></a>

###  last

▸ **last**(): [IResource](iresource.md)

*Inherited from [FilterableCollection](../classes/filterablecollection.md).[last](../classes/filterablecollection.md#last)*

*Defined in [DataModel/Collections/FilterableCollection.ts:69](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L69)*

Gets the last item of the collection or null if there are no items matching the criteria.

**Returns:** [IResource](iresource.md)

___
<a id="narrowfilterswith"></a>

### `<Protected>` narrowFiltersWith

▸ **narrowFiltersWith**<`TValue`>(predicate: *`string`*, matchEvaluator: *`function`*): [FilterableCollection](../classes/filterablecollection.md)<[IResource](iresource.md)>

▸ **narrowFiltersWith**(predicate: *`string`*, value: *`string` \| `RegExp`*): [FilterableCollection](../classes/filterablecollection.md)<[IResource](iresource.md)>

*Inherited from [FilterableCollection](../classes/filterablecollection.md).[narrowFiltersWith](../classes/filterablecollection.md#narrowfilterswith)*

*Defined in [DataModel/Collections/FilterableCollection.ts:129](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L129)*

Creates a new instance of the [FilterableCollection](../classes/filterablecollection.md) with filter made narrower with given predicate.

**Type parameters:**

#### TValue 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| predicate | `string` |  Predicate of the filter. |
| matchEvaluator | `function` |  Match evaluator of the predicate to filter. |

**Returns:** [FilterableCollection](../classes/filterablecollection.md)<[IResource](iresource.md)>

*Inherited from [FilterableCollection](../classes/filterablecollection.md).[narrowFiltersWith](../classes/filterablecollection.md#narrowfilterswith)*

*Defined in [DataModel/Collections/FilterableCollection.ts:140](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L140)*

Creates a new instance of the [FilterableCollection](../classes/filterablecollection.md) with filter made narrower with given predicate.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| predicate | `string` |  Predicate of the filter. |
| value | `string` \| `RegExp` |  Either value or regular expression to match the value of the predicate to filter. |

**Returns:** [FilterableCollection](../classes/filterablecollection.md)<[IResource](iresource.md)>

___
<a id="nonblank"></a>

###  nonBlank

▸ **nonBlank**(): [ResourceFilterableCollection](../classes/resourcefilterablecollection.md)<[IResource](iresource.md)>

*Inherited from [ResourceFilterableCollection](../classes/resourcefilterablecollection.md).[nonBlank](../classes/resourcefilterablecollection.md#nonblank)*

*Defined in [DataModel/Collections/ResourceFilterableCollection.ts:50](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/ResourceFilterableCollection.ts#L50)*

Obtains a collection of resources being non blank nodes;

**Returns:** [ResourceFilterableCollection](../classes/resourcefilterablecollection.md)<[IResource](iresource.md)>

___
<a id="ofiri"></a>

###  ofIri

▸ **ofIri**(iri: *`string`*): [ResourceFilterableCollection](../classes/resourcefilterablecollection.md)<[IResource](iresource.md)>

*Inherited from [ResourceFilterableCollection](../classes/resourcefilterablecollection.md).[ofIri](../classes/resourcefilterablecollection.md#ofiri)*

*Defined in [DataModel/Collections/ResourceFilterableCollection.ts:37](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/ResourceFilterableCollection.ts#L37)*

Obtains a collection of resources of a given Iri;

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| iri | `string` |  Iri of the resources. |

**Returns:** [ResourceFilterableCollection](../classes/resourcefilterablecollection.md)<[IResource](iresource.md)>

___
<a id="oftype"></a>

###  ofType

▸ **ofType**(iri: *`string`*): [ResourceFilterableCollection](../classes/resourcefilterablecollection.md)<[IResource](iresource.md)>

*Inherited from [ResourceFilterableCollection](../classes/resourcefilterablecollection.md).[ofType](../classes/resourcefilterablecollection.md#oftype)*

*Defined in [DataModel/Collections/ResourceFilterableCollection.ts:23](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/ResourceFilterableCollection.ts#L23)*

Obtains a collection of resources of a given type;

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| iri | `string` |  Type of the resources. |

**Returns:** [ResourceFilterableCollection](../classes/resourcefilterablecollection.md)<[IResource](iresource.md)>

___
<a id="toarray"></a>

###  toArray

▸ **toArray**(): [IResource](iresource.md)[]

*Inherited from [FilterableCollection](../classes/filterablecollection.md).[toArray](../classes/filterablecollection.md#toarray)*

*Defined in [DataModel/Collections/FilterableCollection.ts:101](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L101)*

Flattens this collection to a standard array.

**Returns:** [IResource](iresource.md)[]

___
<a id="where"></a>

###  where

▸ **where**(matchEvaluator: *`function`*): [FilterableCollection](../classes/filterablecollection.md)<[IResource](iresource.md)>

*Inherited from [FilterableCollection](../classes/filterablecollection.md).[where](../classes/filterablecollection.md#where)*

*Defined in [DataModel/Collections/FilterableCollection.ts:83](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L83)*

Filters the collection with a generic match evaluator.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| matchEvaluator | `function` |  Match evaluation delegate. |

**Returns:** [FilterableCollection](../classes/filterablecollection.md)<[IResource](iresource.md)>

___

