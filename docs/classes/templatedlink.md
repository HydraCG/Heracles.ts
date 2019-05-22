[@hydra-cg/heracles.ts](../README.md) > [TemplatedLink](../classes/templatedlink.md)

# Class: TemplatedLink

Provides a default implementation of the [ITemplatedLink](../interfaces/itemplatedlink.md) interface.

*__class__*: 

## Hierarchy

 [TemplatedResource](templatedresource.md)<[ILink](../interfaces/ilink.md)>

**↳ TemplatedLink**

## Implements

* [ITemplatedResource](../interfaces/itemplatedresource.md)<[ILink](../interfaces/ilink.md)>
* [ITemplatedLink](../interfaces/itemplatedlink.md)

## Index

### Constructors

* [constructor](templatedlink.md#constructor)

### Properties

* [baseUrl](templatedlink.md#baseurl)
* [collections](templatedlink.md#collections)
* [iri](templatedlink.md#iri)
* [links](templatedlink.md#links)
* [operations](templatedlink.md#operations)
* [relation](templatedlink.md#relation)
* [supportedOperations](templatedlink.md#supportedoperations)
* [target](templatedlink.md#target)
* [type](templatedlink.md#type)
* [id](templatedlink.md#id)

### Methods

* [createInstance](templatedlink.md#createinstance)
* [expandTarget](templatedlink.md#expandtarget)
* [getNextIri](templatedlink.md#getnextiri)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new TemplatedLink**(linkResource: *[ILink](../interfaces/ilink.md)*, template: *[IIriTemplate](../interfaces/iiritemplate.md)*): [TemplatedLink](templatedlink.md)

*Overrides [TemplatedResource](templatedresource.md).[constructor](templatedresource.md#constructor)*

*Defined in [DataModel/TemplatedLink.ts:24](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedLink.ts#L24)*

Initializes a new instance of the [TemplatedLink](../#hydra.templatedlink) class.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| linkResource | [ILink](../interfaces/ilink.md) |  Original link to create templated one from. |
| template | [IIriTemplate](../interfaces/iiritemplate.md) |  IRI template to take template from. |

**Returns:** [TemplatedLink](templatedlink.md)

___

## Properties

<a id="baseurl"></a>

###  baseUrl

**● baseUrl**: *`string`*

*Implementation of [ITemplatedLink](../interfaces/itemplatedlink.md).[baseUrl](../interfaces/itemplatedlink.md#baseurl)*

*Inherited from [TemplatedResource](templatedresource.md).[baseUrl](templatedresource.md#baseurl)*

*Defined in [DataModel/TemplatedResource.ts:22](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedResource.ts#L22)*

Gets a base URL that can be used to resolve target in case it is relative.

*__readonly__*: 

*__returns__*: 

___
<a id="collections"></a>

###  collections

**● collections**: *[ResourceFilterableCollection](resourcefilterablecollection.md)<[ICollection](../interfaces/icollection.md)>*

*Implementation of [ITemplatedLink](../interfaces/itemplatedlink.md).[collections](../interfaces/itemplatedlink.md#collections)*

*Inherited from [TemplatedResource](templatedresource.md).[collections](templatedresource.md#collections)*

*Defined in [DataModel/TemplatedResource.ts:40](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedResource.ts#L40)*

Gets collections exposed by that resource.

*__readonly__*: 

*__returns__*: 

___
<a id="iri"></a>

###  iri

**● iri**: *`string`*

*Implementation of [ITemplatedLink](../interfaces/itemplatedlink.md).[iri](../interfaces/itemplatedlink.md#iri)*

*Inherited from [TemplatedResource](templatedresource.md).[iri](templatedresource.md#iri)*

*Defined in [DataModel/TemplatedResource.ts:25](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedResource.ts#L25)*

Gets an Iri of a resource.

*__readonly__*: 

*__returns__*: 

___
<a id="links"></a>

###  links

**● links**: *[LinksCollection](linkscollection.md)*

*Implementation of [ITemplatedLink](../interfaces/itemplatedlink.md).[links](../interfaces/itemplatedlink.md#links)*

*Inherited from [TemplatedResource](templatedresource.md).[links](templatedresource.md#links)*

*Defined in [DataModel/TemplatedResource.ts:37](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedResource.ts#L37)*

Gets links related to that resource.

*__readonly__*: 

*__returns__*: 

___
<a id="operations"></a>

###  operations

**● operations**: *[OperationsCollection](operationscollection.md)*

*Implementation of [ITemplatedLink](../interfaces/itemplatedlink.md).[operations](../interfaces/itemplatedlink.md#operations)*

*Inherited from [TemplatedResource](templatedresource.md).[operations](templatedresource.md#operations)*

*Defined in [DataModel/TemplatedResource.ts:34](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedResource.ts#L34)*

Gets operations that can be performed on that resource.

*__readonly__*: 

*__returns__*: 

___
<a id="relation"></a>

###  relation

**● relation**: *`string`*

*Implementation of [ITemplatedLink](../interfaces/itemplatedlink.md).[relation](../interfaces/itemplatedlink.md#relation)*

*Defined in [DataModel/TemplatedLink.ts:21](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedLink.ts#L21)*

Gets a relation of the link.

*__readonly__*: 

*__returns__*: 

___
<a id="supportedoperations"></a>

###  supportedOperations

**● supportedOperations**: *[OperationsCollection](operationscollection.md)*

*Implementation of [ITemplatedLink](../interfaces/itemplatedlink.md).[supportedOperations](../interfaces/itemplatedlink.md#supportedoperations)*

*Defined in [DataModel/TemplatedLink.ts:24](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedLink.ts#L24)*

Gets a link's supported operations.

*__readonly__*: 

*__returns__*: 

___
<a id="target"></a>

###  target

**● target**: *[IResource](../interfaces/iresource.md)*

*Implementation of [ITemplatedLink](../interfaces/itemplatedlink.md).[target](../interfaces/itemplatedlink.md#target)*

*Inherited from [TemplatedResource](templatedresource.md).[target](templatedresource.md#target)*

*Defined in [DataModel/TemplatedResource.ts:31](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedResource.ts#L31)*

Gets a target URL to be called.

*__readonly__*: 

*__returns__*: 

___
<a id="type"></a>

###  type

**● type**: *[TypesCollection](typescollection.md)*

*Implementation of [ITemplatedLink](../interfaces/itemplatedlink.md).[type](../interfaces/itemplatedlink.md#type)*

*Inherited from [TemplatedResource](templatedresource.md).[type](templatedresource.md#type)*

*Defined in [DataModel/TemplatedResource.ts:28](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedResource.ts#L28)*

Gets classes a given resource is of.

*__readonly__*: 

*__returns__*: 

___
<a id="id"></a>

### `<Static>``<Private>` id

**● id**: *`number`* = 0

*Defined in [DataModel/TemplatedLink.ts:18](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedLink.ts#L18)*

___

## Methods

<a id="createinstance"></a>

### `<Protected>` createInstance

▸ **createInstance**(resource: *[IPointingResource](../interfaces/ipointingresource.md)*): [ILink](../interfaces/ilink.md)

*Overrides [TemplatedResource](templatedresource.md).[createInstance](templatedresource.md#createinstance)*

*Defined in [DataModel/TemplatedLink.ts:44](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedLink.ts#L44)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| resource | [IPointingResource](../interfaces/ipointingresource.md) |

**Returns:** [ILink](../interfaces/ilink.md)

___
<a id="expandtarget"></a>

###  expandTarget

▸ **expandTarget**(mappedVariables: *[IDictionary](../interfaces/idictionary.md)<`string`> \| [MappingBuilder](../#mappingbuilder)*): [ILink](../interfaces/ilink.md)

*Implementation of [ITemplatedLink](../interfaces/itemplatedlink.md).[expandTarget](../interfaces/itemplatedlink.md#expandtarget)*

*Inherited from [TemplatedResource](templatedresource.md).[expandTarget](templatedresource.md#expandtarget)*

*Defined in [DataModel/TemplatedResource.ts:64](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedResource.ts#L64)*

Expands an URI template with given variables.

**Parameters:**

| Name | Type |
| ------ | ------ |
| mappedVariables | [IDictionary](../interfaces/idictionary.md)<`string`> \| [MappingBuilder](../#mappingbuilder) |

**Returns:** [ILink](../interfaces/ilink.md)

___
<a id="getnextiri"></a>

### `<Protected>` getNextIri

▸ **getNextIri**(): `string`

*Overrides [TemplatedResource](templatedresource.md).[getNextIri](templatedresource.md#getnextiri)*

*Defined in [DataModel/TemplatedLink.ts:57](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedLink.ts#L57)*

**Returns:** `string`

___

