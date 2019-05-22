[@hydra-cg/heracles.ts](../README.md) > [TemplatedOperation](../classes/templatedoperation.md)

# Class: TemplatedOperation

Provides a default implementation of the [ITemplatedOperation](../interfaces/itemplatedoperation.md) interface.

*__class__*: 

## Hierarchy

 [TemplatedResource](templatedresource.md)<[IOperation](../interfaces/ioperation.md)>

**↳ TemplatedOperation**

## Implements

* [ITemplatedResource](../interfaces/itemplatedresource.md)<[IOperation](../interfaces/ioperation.md)>
* [ITemplatedOperation](../interfaces/itemplatedoperation.md)

## Index

### Constructors

* [constructor](templatedoperation.md#constructor)

### Properties

* [baseUrl](templatedoperation.md#baseurl)
* [collections](templatedoperation.md#collections)
* [expectedHeaders](templatedoperation.md#expectedheaders)
* [expects](templatedoperation.md#expects)
* [iri](templatedoperation.md#iri)
* [links](templatedoperation.md#links)
* [method](templatedoperation.md#method)
* [operations](templatedoperation.md#operations)
* [returnedHeaders](templatedoperation.md#returnedheaders)
* [returns](templatedoperation.md#returns)
* [target](templatedoperation.md#target)
* [type](templatedoperation.md#type)
* [id](templatedoperation.md#id)

### Methods

* [createInstance](templatedoperation.md#createinstance)
* [expandTarget](templatedoperation.md#expandtarget)
* [getNextIri](templatedoperation.md#getnextiri)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new TemplatedOperation**(operationResource: *[IOperation](../interfaces/ioperation.md)*, template: *[IIriTemplate](../interfaces/iiritemplate.md)*): [TemplatedOperation](templatedoperation.md)

*Overrides [TemplatedResource](templatedresource.md).[constructor](templatedresource.md#constructor)*

*Defined in [DataModel/TemplatedOperation.ts:31](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedOperation.ts#L31)*

Initializes a new instance of the [TemplatedOperation](templatedoperation.md) class.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| operationResource | [IOperation](../interfaces/ioperation.md) |  Original operation to create templated one from. |
| template | [IIriTemplate](../interfaces/iiritemplate.md) |  IRI template to take template from. |

**Returns:** [TemplatedOperation](templatedoperation.md)

___

## Properties

<a id="baseurl"></a>

###  baseUrl

**● baseUrl**: *`string`*

*Implementation of [ITemplatedOperation](../interfaces/itemplatedoperation.md).[baseUrl](../interfaces/itemplatedoperation.md#baseurl)*

*Inherited from [TemplatedResource](templatedresource.md).[baseUrl](templatedresource.md#baseurl)*

*Defined in [DataModel/TemplatedResource.ts:22](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedResource.ts#L22)*

Gets a base URL that can be used to resolve target in case it is relative.

*__readonly__*: 

*__returns__*: 

___
<a id="collections"></a>

###  collections

**● collections**: *[ResourceFilterableCollection](resourcefilterablecollection.md)<[ICollection](../interfaces/icollection.md)>*

*Implementation of [ITemplatedOperation](../interfaces/itemplatedoperation.md).[collections](../interfaces/itemplatedoperation.md#collections)*

*Inherited from [TemplatedResource](templatedresource.md).[collections](templatedresource.md#collections)*

*Defined in [DataModel/TemplatedResource.ts:40](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedResource.ts#L40)*

Gets collections exposed by that resource.

*__readonly__*: 

*__returns__*: 

___
<a id="expectedheaders"></a>

###  expectedHeaders

**● expectedHeaders**: *`Iterable`<`string`>*

*Implementation of [ITemplatedOperation](../interfaces/itemplatedoperation.md).[expectedHeaders](../interfaces/itemplatedoperation.md#expectedheaders)*

*Defined in [DataModel/TemplatedOperation.ts:28](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedOperation.ts#L28)*

Gets the expected headers.

*__readonly__*: 

*__returns__*: 

___
<a id="expects"></a>

###  expects

**● expects**: *[ResourceFilterableCollection](resourcefilterablecollection.md)<[IClass](../interfaces/iclass.md)>*

*Implementation of [ITemplatedOperation](../interfaces/itemplatedoperation.md).[expects](../interfaces/itemplatedoperation.md#expects)*

*Defined in [DataModel/TemplatedOperation.ts:22](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedOperation.ts#L22)*

Gets the expected classes.

*__readonly__*: 

*__returns__*: 

___
<a id="iri"></a>

###  iri

**● iri**: *`string`*

*Implementation of [ITemplatedOperation](../interfaces/itemplatedoperation.md).[iri](../interfaces/itemplatedoperation.md#iri)*

*Inherited from [TemplatedResource](templatedresource.md).[iri](templatedresource.md#iri)*

*Defined in [DataModel/TemplatedResource.ts:25](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedResource.ts#L25)*

Gets an Iri of a resource.

*__readonly__*: 

*__returns__*: 

___
<a id="links"></a>

###  links

**● links**: *[LinksCollection](linkscollection.md)*

*Implementation of [ITemplatedOperation](../interfaces/itemplatedoperation.md).[links](../interfaces/itemplatedoperation.md#links)*

*Inherited from [TemplatedResource](templatedresource.md).[links](templatedresource.md#links)*

*Defined in [DataModel/TemplatedResource.ts:37](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedResource.ts#L37)*

Gets links related to that resource.

*__readonly__*: 

*__returns__*: 

___
<a id="method"></a>

###  method

**● method**: *`string`*

*Implementation of [ITemplatedOperation](../interfaces/itemplatedoperation.md).[method](../interfaces/itemplatedoperation.md#method)*

*Defined in [DataModel/TemplatedOperation.ts:19](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedOperation.ts#L19)*

Gets a method to be used for the call.

*__readonly__*: 

*__returns__*: 

___
<a id="operations"></a>

###  operations

**● operations**: *[OperationsCollection](operationscollection.md)*

*Implementation of [ITemplatedOperation](../interfaces/itemplatedoperation.md).[operations](../interfaces/itemplatedoperation.md#operations)*

*Inherited from [TemplatedResource](templatedresource.md).[operations](templatedresource.md#operations)*

*Defined in [DataModel/TemplatedResource.ts:34](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedResource.ts#L34)*

Gets operations that can be performed on that resource.

*__readonly__*: 

*__returns__*: 

___
<a id="returnedheaders"></a>

###  returnedHeaders

**● returnedHeaders**: *`Iterable`<`string`>*

*Implementation of [ITemplatedOperation](../interfaces/itemplatedoperation.md).[returnedHeaders](../interfaces/itemplatedoperation.md#returnedheaders)*

*Defined in [DataModel/TemplatedOperation.ts:31](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedOperation.ts#L31)*

Gets the returned headers.

*__readonly__*: 

*__returns__*: 

___
<a id="returns"></a>

###  returns

**● returns**: *[ResourceFilterableCollection](resourcefilterablecollection.md)<[IClass](../interfaces/iclass.md)>*

*Implementation of [ITemplatedOperation](../interfaces/itemplatedoperation.md).[returns](../interfaces/itemplatedoperation.md#returns)*

*Defined in [DataModel/TemplatedOperation.ts:25](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedOperation.ts#L25)*

Gets the returned classes.

*__readonly__*: 

*__returns__*: 

___
<a id="target"></a>

###  target

**● target**: *[IResource](../interfaces/iresource.md)*

*Implementation of [ITemplatedOperation](../interfaces/itemplatedoperation.md).[target](../interfaces/itemplatedoperation.md#target)*

*Inherited from [TemplatedResource](templatedresource.md).[target](templatedresource.md#target)*

*Defined in [DataModel/TemplatedResource.ts:31](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedResource.ts#L31)*

Gets a target URL to be called.

*__readonly__*: 

*__returns__*: 

___
<a id="type"></a>

###  type

**● type**: *[TypesCollection](typescollection.md)*

*Implementation of [ITemplatedOperation](../interfaces/itemplatedoperation.md).[type](../interfaces/itemplatedoperation.md#type)*

*Inherited from [TemplatedResource](templatedresource.md).[type](templatedresource.md#type)*

*Defined in [DataModel/TemplatedResource.ts:28](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedResource.ts#L28)*

Gets classes a given resource is of.

*__readonly__*: 

*__returns__*: 

___
<a id="id"></a>

### `<Static>``<Private>` id

**● id**: *`number`* = 0

*Defined in [DataModel/TemplatedOperation.ts:16](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedOperation.ts#L16)*

___

## Methods

<a id="createinstance"></a>

### `<Protected>` createInstance

▸ **createInstance**(resource: *[IPointingResource](../interfaces/ipointingresource.md)*): [IOperation](../interfaces/ioperation.md)

*Overrides [TemplatedResource](templatedresource.md).[createInstance](templatedresource.md#createinstance)*

*Defined in [DataModel/TemplatedOperation.ts:47](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedOperation.ts#L47)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| resource | [IPointingResource](../interfaces/ipointingresource.md) |

**Returns:** [IOperation](../interfaces/ioperation.md)

___
<a id="expandtarget"></a>

###  expandTarget

▸ **expandTarget**(mappedVariables: *[IDictionary](../interfaces/idictionary.md)<`string`> \| [MappingBuilder](../#mappingbuilder)*): [IOperation](../interfaces/ioperation.md)

*Implementation of [ITemplatedOperation](../interfaces/itemplatedoperation.md).[expandTarget](../interfaces/itemplatedoperation.md#expandtarget)*

*Inherited from [TemplatedResource](templatedresource.md).[expandTarget](templatedresource.md#expandtarget)*

*Defined in [DataModel/TemplatedResource.ts:64](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedResource.ts#L64)*

Expands an URI template with given variables.

**Parameters:**

| Name | Type |
| ------ | ------ |
| mappedVariables | [IDictionary](../interfaces/idictionary.md)<`string`> \| [MappingBuilder](../#mappingbuilder) |

**Returns:** [IOperation](../interfaces/ioperation.md)

___
<a id="getnextiri"></a>

### `<Protected>` getNextIri

▸ **getNextIri**(): `string`

*Overrides [TemplatedResource](templatedresource.md).[getNextIri](templatedresource.md#getnextiri)*

*Defined in [DataModel/TemplatedOperation.ts:58](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedOperation.ts#L58)*

**Returns:** `string`

___

