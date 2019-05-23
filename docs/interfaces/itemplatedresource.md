[@hydra-cg/heracles.ts](../README.md) > [ITemplatedResource](../interfaces/itemplatedresource.md)

# Interface: ITemplatedResource

Provides an abstract description of a resource with expandable template.

*__interface__*: 

## Type parameters
#### T :  [IPointingResource](ipointingresource.md)
## Hierarchy

↳  [IPointingResource](ipointingresource.md)

**↳ ITemplatedResource**

↳  [ITemplatedOperation](itemplatedoperation.md)

↳  [ITemplatedLink](itemplatedlink.md)

## Implemented by

* [TemplatedLink](../classes/templatedlink.md)
* [TemplatedOperation](../classes/templatedoperation.md)
* [TemplatedResource](../classes/templatedresource.md)

## Index

### Properties

* [baseUrl](itemplatedresource.md#baseurl)
* [collections](itemplatedresource.md#collections)
* [iri](itemplatedresource.md#iri)
* [links](itemplatedresource.md#links)
* [operations](itemplatedresource.md#operations)
* [target](itemplatedresource.md#target)
* [type](itemplatedresource.md#type)

### Methods

* [expandTarget](itemplatedresource.md#expandtarget)

---

## Properties

<a id="baseurl"></a>

###  baseUrl

**● baseUrl**: *`string`*

*Inherited from [IPointingResource](ipointingresource.md).[baseUrl](ipointingresource.md#baseurl)*

*Defined in [DataModel/IPointingResource.ts:14](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IPointingResource.ts#L14)*

Gets a base URL that can be used to resolve target in case it is relative.

*__readonly__*: 

*__returns__*: 

___
<a id="collections"></a>

###  collections

**● collections**: *[ResourceFilterableCollection](../classes/resourcefilterablecollection.md)<[ICollection](icollection.md)>*

*Inherited from [IHydraResource](ihydraresource.md).[collections](ihydraresource.md#collections)*

*Defined in [DataModel/IHydraResource.ts:17](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IHydraResource.ts#L17)*

Gets collections exposed by that resource.

*__readonly__*: 

*__returns__*: 

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

*Inherited from [IHydraResource](ihydraresource.md).[links](ihydraresource.md#links)*

*Defined in [DataModel/IHydraResource.ts:31](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IHydraResource.ts#L31)*

Gets links related to that resource.

*__readonly__*: 

*__returns__*: 

___
<a id="operations"></a>

###  operations

**● operations**: *[OperationsCollection](../classes/operationscollection.md)*

*Inherited from [IHydraResource](ihydraresource.md).[operations](ihydraresource.md#operations)*

*Defined in [DataModel/IHydraResource.ts:24](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IHydraResource.ts#L24)*

Gets operations that can be performed on that resource.

*__readonly__*: 

*__returns__*: 

___
<a id="target"></a>

###  target

**● target**: *[IResource](iresource.md)*

*Inherited from [IPointingResource](ipointingresource.md).[target](ipointingresource.md#target)*

*Defined in [DataModel/IPointingResource.ts:21](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IPointingResource.ts#L21)*

Gets a target URL to be called.

*__readonly__*: 

*__returns__*: 

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

## Methods

<a id="expandtarget"></a>

###  expandTarget

▸ **expandTarget**(mappedVariables: *[IDictionary](idictionary.md)<`string`> \| [MappingBuilder](../#mappingbuilder)*): `T`

*Defined in [DataModel/ITemplatedResource.ts:17](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/ITemplatedResource.ts#L17)*

Expands an URI template with given variables.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| mappedVariables | [IDictionary](idictionary.md)<`string`> \| [MappingBuilder](../#mappingbuilder) |  Template variables with values or {@link MappingsBuilder}. |

**Returns:** `T`

___

