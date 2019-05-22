[@hydra-cg/heracles.ts](../README.md) > [IHypermediaProcessor](../interfaces/ihypermediaprocessor.md)

# Interface: IHypermediaProcessor

Describes an abstract meta-data providing facility which translates from a raw {@link Response} to an abstract data model.

*__interface__*: 

## Hierarchy

**IHypermediaProcessor**

## Implemented by

* [JsonLdHypermediaProcessor](../classes/jsonldhypermediaprocessor.md)

## Index

### Properties

* [supportedMediaTypes](ihypermediaprocessor.md#supportedmediatypes)

### Methods

* [process](ihypermediaprocessor.md#process)
* [supports](ihypermediaprocessor.md#supports)

---

## Properties

<a id="supportedmediatypes"></a>

###  supportedMediaTypes

**● supportedMediaTypes**: *`Iterable`<`string`>*

*Defined in [IHypermediaProcessor.ts:17](https://github.com/alien-mcl/Heracles.ts/blob/master/src/IHypermediaProcessor.ts#L17)*

Gets supported media types.

*__readonly__*: 

*__returns__*: 

___

## Methods

<a id="process"></a>

###  process

▸ **process**(response: *`Response`*, client: *[IHydraClient](ihydraclient.md)*, options?: *[IHypermediaProcessingOptions](ihypermediaprocessingoptions.md)*): `Promise`<[IWebResource](iwebresource.md)>

*Defined in [IHypermediaProcessor.ts:33](https://github.com/alien-mcl/Heracles.ts/blob/master/src/IHypermediaProcessor.ts#L33)*

Parses a given raw response.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| response | `Response` |  Raw fetch response holding data to be parsed. |
| client | [IHydraClient](ihydraclient.md) |  Hydra client. |
| `Optional` options | [IHypermediaProcessingOptions](ihypermediaprocessingoptions.md) |  Optional additional processing options. |

**Returns:** `Promise`<[IWebResource](iwebresource.md)>

___
<a id="supports"></a>

###  supports

▸ **supports**(response: *`Response`*): [Level](../enums/level.md)

*Defined in [IHypermediaProcessor.ts:24](https://github.com/alien-mcl/Heracles.ts/blob/master/src/IHypermediaProcessor.ts#L24)*

Determines level of support of a this [IHypermediaProcessor](ihypermediaprocessor.md) for given response.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| response | `Response` |  Response to check support for. |

**Returns:** [Level](../enums/level.md)

___

