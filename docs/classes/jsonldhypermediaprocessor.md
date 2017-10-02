[hydraclient.js](../README.md) > [JsonLdHypermediaProcessor](../classes/jsonldhypermediaprocessor.md)



# Class: JsonLdHypermediaProcessor

## Implements

* [IHypermediaProcessor](../interfaces/ihypermediaprocessor.md)

## Index

### Accessors

* [supportedMediaTypes](jsonldhypermediaprocessor.md#supportedmediatypes)


### Methods

* [process](jsonldhypermediaprocessor.md#process)
* [fixType](jsonldhypermediaprocessor.md#fixtype)
* [fixTypeOf](jsonldhypermediaprocessor.md#fixtypeof)
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


getsupportedMediaTypes(): `string`[]


*Defined in [src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts:16](https://github.com/HydraCG/Heracles.ts/blob/master/src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts#L16)*





**Returns:** `string`[]



___


## Methods
<a id="process"></a>

###  process

► **process**(response: *`Response`*, removeFromPayload?: *`boolean`*): `Promise`<[IWebResource](../interfaces/iwebresource.md)>




*Implementation of [IHypermediaProcessor](../interfaces/ihypermediaprocessor.md).[process](../interfaces/ihypermediaprocessor.md#process)*

*Defined in [src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts:20](https://github.com/HydraCG/Heracles.ts/blob/master/src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts#L20)*



**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| response | `Response` | - |
| removeFromPayload | `boolean` | Default value = false.- |





**Returns:** `Promise`<[IWebResource](../interfaces/iwebresource.md)>





___

<a id="fixtype"></a>

### «Static»«Private» fixType

► **fixType**(result: *`any`[]object*): `any`[]object




*Defined in [src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts:168](https://github.com/HydraCG/Heracles.ts/blob/master/src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts#L168)*



**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| result | `any`[]object | - |





**Returns:** `any`[]object





___

<a id="fixtypeof"></a>

### «Static»«Private» fixTypeOf

► **fixTypeOf**(resource: *`any`*): `void`




*Defined in [src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts:176](https://github.com/HydraCG/Heracles.ts/blob/master/src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts#L176)*



**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| resource | `any` | - |





**Returns:** `void`





___

<a id="generateblanknodeid"></a>

### «Static»«Private» generateBlankNodeId

► **generateBlankNodeId**(): `string`




*Defined in [src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts:64](https://github.com/HydraCG/Heracles.ts/blob/master/src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts#L64)*





**Returns:** `string`





___

<a id="initialize"></a>

### «Static» initialize

► **initialize**(): `void`




*Defined in [src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts:12](https://github.com/HydraCG/Heracles.ts/blob/master/src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts#L12)*





**Returns:** `void`





___

<a id="processarray"></a>

### «Static»«Private» processArray

► **processArray**(payload: *`any`*, result: *`any`[]object*, removeFromPayload?: *`boolean`*): `any`[]object




*Defined in [src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts:96](https://github.com/HydraCG/Heracles.ts/blob/master/src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts#L96)*



**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| payload | `any` | - |
| result | `any`[]object | - |
| removeFromPayload | `boolean` | Default value = false.- |





**Returns:** `any`[]object





___

<a id="processhypermedia"></a>

### «Static»«Private» processHypermedia

► **processHypermedia**(payload: *`any`*, result: *`any`[]object*, removeFromPayload?: *`boolean`*): `any`




*Defined in [src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts:68](https://github.com/HydraCG/Heracles.ts/blob/master/src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts#L68)*



**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| payload | `any` | - |
| result | `any`[]object | - |
| removeFromPayload | `boolean` | Default value = false.- |





**Returns:** `any`





___

<a id="processresource"></a>

### «Static»«Private» processResource

► **processResource**(resource: *`any`*, result: *`any`[]object*, removeFromPayload: *`boolean`*): `any`




*Defined in [src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts:131](https://github.com/HydraCG/Heracles.ts/blob/master/src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts#L131)*



**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| resource | `any` | - |
| result | `any`[]object | - |
| removeFromPayload | `boolean` | - |





**Returns:** `any`





___

<a id="removereferencesfrom"></a>

### «Static»«Private» removeReferencesFrom

► **removeReferencesFrom**(result: *`any`[]*): `any`




*Defined in [src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts:50](https://github.com/HydraCG/Heracles.ts/blob/master/src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts#L50)*



**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| result | `any`[] | - |





**Returns:** `any`





___


