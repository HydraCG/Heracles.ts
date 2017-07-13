[hydraclient.js](../README.md) > [JsonLdHypermediaProcessor](../classes/jsonldhypermediaprocessor.md)



# Class: JsonLdHypermediaProcessor

## Implements

* [IHypermediaProcessor](../interfaces/ihypermediaprocessor.md)

## Index

### Accessors

* [supportedMediaTypes](jsonldhypermediaprocessor.md#supportedmediatypes)


### Methods

* [process](jsonldhypermediaprocessor.md#process)
* [generateBlankNodeId](jsonldhypermediaprocessor.md#generateblanknodeid)
* [initialize](jsonldhypermediaprocessor.md#initialize)
* [processArray](jsonldhypermediaprocessor.md#processarray)
* [processHypermedia](jsonldhypermediaprocessor.md#processhypermedia)
* [processResource](jsonldhypermediaprocessor.md#processresource)
* [removeReferencesFrom](jsonldhypermediaprocessor.md#removereferencesfrom)



---

## Accessors
<a id="supportedmediatypes"></a>

###  supportedMediaTypes


getsupportedMediaTypes(): `Array`<`string`>


*Defined in [src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts:18](https://github.com/HydraCG/Heracles.ts/blob/master/src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts#L18)*





**Returns:** `Array`<`string`>



___


## Methods
<a id="process"></a>

###  process

► **process**(response: *`Response`*, removeFromPayload?: *`boolean`*): `Promise`<[IWebResource](../interfaces/iwebresource.md)>




*Implementation of [IHypermediaProcessor](../interfaces/ihypermediaprocessor.md).[process](../interfaces/ihypermediaprocessor.md#process)*

*Defined in [src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts:23](https://github.com/HydraCG/Heracles.ts/blob/master/src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts#L23)*



**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| response | `Response` | - |
| removeFromPayload | `boolean` | Default value = false.- |





**Returns:** `Promise`<[IWebResource](../interfaces/iwebresource.md)>





___

<a id="generateblanknodeid"></a>

### «Static»«Private» generateBlankNodeId

► **generateBlankNodeId**(): `string`




*Defined in [src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts:58](https://github.com/HydraCG/Heracles.ts/blob/master/src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts#L58)*





**Returns:** `string`





___

<a id="initialize"></a>

### «Static» initialize

► **initialize**(): `void`




*Defined in [src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts:13](https://github.com/HydraCG/Heracles.ts/blob/master/src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts#L13)*





**Returns:** `void`





___

<a id="processarray"></a>

### «Static»«Private» processArray

► **processArray**(payload: *`any`*, result: *`Array`<`any`>object*, removeFromPayload?: *`boolean`*): `any`[]object




*Defined in [src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts:78](https://github.com/HydraCG/Heracles.ts/blob/master/src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts#L78)*



**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| payload | `any` | - |
| result | `Array`<`any`>object | - |
| removeFromPayload | `boolean` | Default value = false.- |





**Returns:** `any`[]object





___

<a id="processhypermedia"></a>

### «Static»«Private» processHypermedia

► **processHypermedia**(payload: *`any`*, result: *`Array`<`any`>object*, removeFromPayload?: *`boolean`*): `any`




*Defined in [src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts:63](https://github.com/HydraCG/Heracles.ts/blob/master/src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts#L63)*



**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| payload | `any` | - |
| result | `Array`<`any`>object | - |
| removeFromPayload | `boolean` | Default value = false.- |





**Returns:** `any`





___

<a id="processresource"></a>

### «Static»«Private» processResource

► **processResource**(resource: *`any`*, result: *`Array`<`any`>object*, removeFromPayload: *`boolean`*): `any`




*Defined in [src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts:102](https://github.com/HydraCG/Heracles.ts/blob/master/src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts#L102)*



**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| resource | `any` | - |
| result | `Array`<`any`>object | - |
| removeFromPayload | `boolean` | - |





**Returns:** `any`





___

<a id="removereferencesfrom"></a>

### «Static»«Private» removeReferencesFrom

► **removeReferencesFrom**(result: *`Array`<`any`>*): `any`




*Defined in [src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts:45](https://github.com/HydraCG/Heracles.ts/blob/master/src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts#L45)*



**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| result | `Array`<`any`> | - |





**Returns:** `any`





___


