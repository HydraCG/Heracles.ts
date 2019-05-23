[@hydra-cg/heracles.ts](../README.md) > [ITemplatedLink](../interfaces/itemplatedlink.md)

# Interface: ITemplatedLink

Provides a link that can has an URI template.

*__interface__*: 

## Hierarchy

↳  [ILink](ilink.md)

↳  [ITemplatedResource](itemplatedresource.md)<[ILink](ilink.md)>

**↳ ITemplatedLink**

## Implemented by

* [TemplatedLink](../classes/templatedlink.md)

## Index

### Properties

* [baseUrl](itemplatedlink.md#baseurl)
* [collections](itemplatedlink.md#collections)
* [iri](itemplatedlink.md#iri)
* [links](itemplatedlink.md#links)
* [operations](itemplatedlink.md#operations)
* [relation](itemplatedlink.md#relation)
* [supportedOperations](itemplatedlink.md#supportedoperations)
* [target](itemplatedlink.md#target)
* [type](itemplatedlink.md#type)

### Methods

* [expandTarget](itemplatedlink.md#expandtarget)

---

## Properties

<a id="baseurl"></a>

###  baseUrl

**● baseUrl**: *`string`*

*Inherited from [ILink](ilink.md).[baseUrl](ilink.md#baseurl)*

*Overrides [IPointingResource](ipointingresource.md).[baseUrl](ipointingresource.md#baseurl)*

*Defined in [DataModel/ILink.ts:22](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/ILink.ts#L22)*

Gets a base URL that can be used to resolve target in case it is relative.

*__readonly__*: 

*__returns__*: 

___
<a id="collections"></a>

###  collections

**● collections**: *[ResourceFilterableCollection](../classes/resourcefilterablecollection.md)<[ICollection](icollection.md)>*

*Inherited from [IHydraResource](ihydraresource.md).[collections](ihydraresource.md#collections)*

*Overrides [IHydraResource](ihydraresource.md).[collections](ihydraresource.md#collections)*

*Defined in [DataModel/IHydraResource.ts:17](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IHydraResource.ts#L17)*

Gets collections exposed by that resource.

*__readonly__*: 

*__returns__*: 

___
<a id="iri"></a>

###  iri

**● iri**: *`string`*

*Inherited from [IResource](iresource.md).[iri](iresource.md#iri)*

*Overrides [IResource](iresource.md).[iri](iresource.md#iri)*

*Defined in [DataModel/IResource.ts:13](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IResource.ts#L13)*

Gets an Iri of a resource.

*__readonly__*: 

*__returns__*: 

___
<a id="links"></a>

###  links

**● links**: *[LinksCollection](../classes/linkscollection.md)*

*Inherited from [IHydraResource](ihydraresource.md).[links](ihydraresource.md#links)*

*Overrides [IHydraResource](ihydraresource.md).[links](ihydraresource.md#links)*

*Defined in [DataModel/IHydraResource.ts:31](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IHydraResource.ts#L31)*

Gets links related to that resource.

*__readonly__*: 

*__returns__*: 

___
<a id="operations"></a>

###  operations

**● operations**: *[OperationsCollection](../classes/operationscollection.md)*

*Inherited from [IHydraResource](ihydraresource.md).[operations](ihydraresource.md#operations)*

*Overrides [IHydraResource](ihydraresource.md).[operations](ihydraresource.md#operations)*

*Defined in [DataModel/IHydraResource.ts:24](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IHydraResource.ts#L24)*

Gets operations that can be performed on that resource.

*__readonly__*: 

*__returns__*: 

___
<a id="relation"></a>

###  relation

**● relation**: *`string`*

*Inherited from [ILink](ilink.md).[relation](ilink.md#relation)*

*Defined in [DataModel/ILink.ts:16](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/ILink.ts#L16)*

Gets a relation of the link.

*__readonly__*: 

*__returns__*: 

___
<a id="supportedoperations"></a>

###  supportedOperations

**● supportedOperations**: *[OperationsCollection](../classes/operationscollection.md)*

*Inherited from [ILink](ilink.md).[supportedOperations](ilink.md#supportedoperations)*

*Defined in [DataModel/ILink.ts:36](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/ILink.ts#L36)*

Gets a link's supported operations.

*__readonly__*: 

*__returns__*: 

___
<a id="target"></a>

###  target

**● target**: *[IResource](iresource.md)*

*Inherited from [ILink](ilink.md).[target](ilink.md#target)*

*Overrides [IPointingResource](ipointingresource.md).[target](ipointingresource.md#target)*

*Defined in [DataModel/ILink.ts:29](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/ILink.ts#L29)*

Gets a target URL to be called.

*__readonly__*: 

*__returns__*: 

___
<a id="type"></a>

###  type

**● type**: *[TypesCollection](../classes/typescollection.md)*

*Inherited from [IResource](iresource.md).[type](iresource.md#type)*

*Overrides [IResource](iresource.md).[type](iresource.md#type)*

*Defined in [DataModel/IResource.ts:20](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IResource.ts#L20)*

Gets classes a given resource is of.

*__readonly__*: 

*__returns__*: 

___

## Methods

<a id="expandtarget"></a>

###  expandTarget

▸ **expandTarget**(mappedVariables: *[IDictionary](idictionary.md)<`string`> \| [MappingBuilder](../#mappingbuilder)*): [ILink](ilink.md)

*Inherited from [ITemplatedResource](itemplatedresource.md).[expandTarget](itemplatedresource.md#expandtarget)*

*Defined in [DataModel/ITemplatedResource.ts:17](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/ITemplatedResource.ts#L17)*

Expands an URI template with given variables.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| mappedVariables | [IDictionary](idictionary.md)<`string`> \| [MappingBuilder](../#mappingbuilder) |  Template variables with values or {@link MappingsBuilder}. |

**Returns:** [ILink](ilink.md)

___

