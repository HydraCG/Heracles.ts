[@hydra-cg/heracles.ts](../README.md) > [IApiDocumentation](../interfaces/iapidocumentation.md)

# Interface: IApiDocumentation

Represents an abstract API documentation.

*__interface__*: 

## Hierarchy

 [IResource](iresource.md)

**↳ IApiDocumentation**

## Index

### Properties

* [description](iapidocumentation.md#description)
* [entryPoint](iapidocumentation.md#entrypoint)
* [iri](iapidocumentation.md#iri)
* [supportedClasses](iapidocumentation.md#supportedclasses)
* [title](iapidocumentation.md#title)
* [type](iapidocumentation.md#type)

### Methods

* [getEntryPoint](iapidocumentation.md#getentrypoint)

---

## Properties

<a id="description"></a>

### `<Optional>` description

**● description**: *`string`*

*Defined in [DataModel/IApiDocumentation.ts:23](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IApiDocumentation.ts#L23)*

Gets a description of this API documentation.

*__readonly__*: 

*__returns__*: 

___
<a id="entrypoint"></a>

###  entryPoint

**● entryPoint**: *`string`*

*Defined in [DataModel/IApiDocumentation.ts:37](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IApiDocumentation.ts#L37)*

Gets the Url of the entry point of the API.

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
<a id="supportedclasses"></a>

###  supportedClasses

**● supportedClasses**: *[ResourceFilterableCollection](../classes/resourcefilterablecollection.md)<[IClass](iclass.md)>*

*Defined in [DataModel/IApiDocumentation.ts:30](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IApiDocumentation.ts#L30)*

Gets the supported classes by this API.

*__readonly__*: 

*__returns__*: 

___
<a id="title"></a>

### `<Optional>` title

**● title**: *`string`*

*Defined in [DataModel/IApiDocumentation.ts:16](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IApiDocumentation.ts#L16)*

Gets a title of this API documentation.

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

<a id="getentrypoint"></a>

###  getEntryPoint

▸ **getEntryPoint**(): `Promise`<[IWebResource](iwebresource.md)>

*Defined in [DataModel/IApiDocumentation.ts:44](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IApiDocumentation.ts#L44)*

Retrieves an API's entry point resource.

*__readonly__*: 

**Returns:** `Promise`<[IWebResource](iwebresource.md)>

___

