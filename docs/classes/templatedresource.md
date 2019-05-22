[@hydra-cg/heracles.ts](../README.md) > [TemplatedResource](../classes/templatedresource.md)

# Class: TemplatedResource

Provides a base functionality for resources that has expandable template.

*__class__*: 

## Type parameters
#### T :  [IPointingResource](../interfaces/ipointingresource.md)
## Hierarchy

**TemplatedResource**

↳  [TemplatedLink](templatedlink.md)

↳  [TemplatedOperation](templatedoperation.md)

## Implements

* [ITemplatedResource](../interfaces/itemplatedresource.md)<`T`>

## Index

### Constructors

* [constructor](templatedresource.md#constructor)

### Properties

* [baseUrl](templatedresource.md#baseurl)
* [collections](templatedresource.md#collections)
* [iri](templatedresource.md#iri)
* [links](templatedresource.md#links)
* [mappings](templatedresource.md#mappings)
* [operations](templatedresource.md#operations)
* [target](templatedresource.md#target)
* [template](templatedresource.md#template)
* [type](templatedresource.md#type)

### Methods

* [createInstance](templatedresource.md#createinstance)
* [expandTarget](templatedresource.md#expandtarget)
* [getNextIri](templatedresource.md#getnextiri)

---

## Constructors

<a id="constructor"></a>

### `<Protected>` constructor

⊕ **new TemplatedResource**(resource: *[IPointingResource](../interfaces/ipointingresource.md)*, template: *[IIriTemplate](../interfaces/iiritemplate.md)*, type: *`Iterable`<`string`>*): [TemplatedResource](templatedresource.md)

*Defined in [DataModel/TemplatedResource.ts:43](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedResource.ts#L43)*

Initializes a new instance of the [TemplatedOperation](templatedoperation.md) class.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| resource | [IPointingResource](../interfaces/ipointingresource.md) |  Original resource to create templated one from. |
| template | [IIriTemplate](../interfaces/iiritemplate.md) |  IRI template to take template from. |
| type | `Iterable`<`string`> |  Types of the resource. |

**Returns:** [TemplatedResource](templatedresource.md)

___

## Properties

<a id="baseurl"></a>

###  baseUrl

**● baseUrl**: *`string`*

*Implementation of [ITemplatedResource](../interfaces/itemplatedresource.md).[baseUrl](../interfaces/itemplatedresource.md#baseurl)*

*Defined in [DataModel/TemplatedResource.ts:22](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedResource.ts#L22)*

Gets a base URL that can be used to resolve target in case it is relative.

*__readonly__*: 

*__returns__*: 

___
<a id="collections"></a>

###  collections

**● collections**: *[ResourceFilterableCollection](resourcefilterablecollection.md)<[ICollection](../interfaces/icollection.md)>*

*Implementation of [ITemplatedResource](../interfaces/itemplatedresource.md).[collections](../interfaces/itemplatedresource.md#collections)*

*Defined in [DataModel/TemplatedResource.ts:40](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedResource.ts#L40)*

Gets collections exposed by that resource.

*__readonly__*: 

*__returns__*: 

___
<a id="iri"></a>

###  iri

**● iri**: *`string`*

*Implementation of [ITemplatedResource](../interfaces/itemplatedresource.md).[iri](../interfaces/itemplatedresource.md#iri)*

*Defined in [DataModel/TemplatedResource.ts:25](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedResource.ts#L25)*

Gets an Iri of a resource.

*__readonly__*: 

*__returns__*: 

___
<a id="links"></a>

###  links

**● links**: *[LinksCollection](linkscollection.md)*

*Implementation of [ITemplatedResource](../interfaces/itemplatedresource.md).[links](../interfaces/itemplatedresource.md#links)*

*Defined in [DataModel/TemplatedResource.ts:37](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedResource.ts#L37)*

Gets links related to that resource.

*__readonly__*: 

*__returns__*: 

___
<a id="mappings"></a>

### `<Private>` mappings

**● mappings**: *[MappingsCollection](mappingscollection.md)*

*Defined in [DataModel/TemplatedResource.ts:43](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedResource.ts#L43)*

___
<a id="operations"></a>

###  operations

**● operations**: *[OperationsCollection](operationscollection.md)*

*Implementation of [ITemplatedResource](../interfaces/itemplatedresource.md).[operations](../interfaces/itemplatedresource.md#operations)*

*Defined in [DataModel/TemplatedResource.ts:34](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedResource.ts#L34)*

Gets operations that can be performed on that resource.

*__readonly__*: 

*__returns__*: 

___
<a id="target"></a>

###  target

**● target**: *[IResource](../interfaces/iresource.md)*

*Implementation of [ITemplatedResource](../interfaces/itemplatedresource.md).[target](../interfaces/itemplatedresource.md#target)*

*Defined in [DataModel/TemplatedResource.ts:31](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedResource.ts#L31)*

Gets a target URL to be called.

*__readonly__*: 

*__returns__*: 

___
<a id="template"></a>

### `<Private>` template

**● template**: *`string`*

*Defined in [DataModel/TemplatedResource.ts:42](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedResource.ts#L42)*

___
<a id="type"></a>

###  type

**● type**: *[TypesCollection](typescollection.md)*

*Implementation of [ITemplatedResource](../interfaces/itemplatedresource.md).[type](../interfaces/itemplatedresource.md#type)*

*Defined in [DataModel/TemplatedResource.ts:28](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedResource.ts#L28)*

Gets classes a given resource is of.

*__readonly__*: 

*__returns__*: 

___

## Methods

<a id="createinstance"></a>

### `<Protected>``<Abstract>` createInstance

▸ **createInstance**(resource: *[IPointingResource](../interfaces/ipointingresource.md)*): `T`

*Defined in [DataModel/TemplatedResource.ts:92](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedResource.ts#L92)*

Creates a new instance of the object of type T.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| resource | [IPointingResource](../interfaces/ipointingresource.md) |  Resource to act as a bag of initial values. |

**Returns:** `T`

___
<a id="expandtarget"></a>

###  expandTarget

▸ **expandTarget**(mappedVariables: *[IDictionary](../interfaces/idictionary.md)<`string`> \| [MappingBuilder](../#mappingbuilder)*): `T`

*Implementation of [ITemplatedResource](../interfaces/itemplatedresource.md).[expandTarget](../interfaces/itemplatedresource.md#expandtarget)*

*Defined in [DataModel/TemplatedResource.ts:64](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedResource.ts#L64)*

Expands an URI template with given variables.

**Parameters:**

| Name | Type |
| ------ | ------ |
| mappedVariables | [IDictionary](../interfaces/idictionary.md)<`string`> \| [MappingBuilder](../#mappingbuilder) |

**Returns:** `T`

___
<a id="getnextiri"></a>

### `<Protected>``<Abstract>` getNextIri

▸ **getNextIri**(): `string`

*Defined in [DataModel/TemplatedResource.ts:98](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedResource.ts#L98)*

Gets a next IRI.

**Returns:** `string`

___

