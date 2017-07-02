[hydraclient.js](../index.md) > ["src/DataModel/JsonLd/JsonLdHypermediaProcessor"](../modules/_src_datamodel_jsonld_jsonldhypermediaprocessor_.md) > [JsonLdHypermediaProcessor](../classes/_src_datamodel_jsonld_jsonldhypermediaprocessor_.jsonldhypermediaprocessor.md)



# Class: JsonLdHypermediaProcessor

## Implements

* [IHypermediaProcessor](../interfaces/_src_datamodel_ihypermediaprocessor_.ihypermediaprocessor.md)

## Index

### Accessors

* [supportedMediaTypes](_src_datamodel_jsonld_jsonldhypermediaprocessor_.jsonldhypermediaprocessor.md#supportedmediatypes)


### Methods

* [process](_src_datamodel_jsonld_jsonldhypermediaprocessor_.jsonldhypermediaprocessor.md#process)
* [generateBlankNodeId](_src_datamodel_jsonld_jsonldhypermediaprocessor_.jsonldhypermediaprocessor.md#generateblanknodeid)
* [initialize](_src_datamodel_jsonld_jsonldhypermediaprocessor_.jsonldhypermediaprocessor.md#initialize)
* [processArray](_src_datamodel_jsonld_jsonldhypermediaprocessor_.jsonldhypermediaprocessor.md#processarray)
* [processHypermedia](_src_datamodel_jsonld_jsonldhypermediaprocessor_.jsonldhypermediaprocessor.md#processhypermedia)
* [processResource](_src_datamodel_jsonld_jsonldhypermediaprocessor_.jsonldhypermediaprocessor.md#processresource)




## Accessors
<a id="supportedmediatypes"></a>

###  supportedMediaTypes


getsupportedMediaTypes(): Array<string>

*Defined in [src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts:18](https://github.com/alien-mcl/Heracles.ts/blob/05f75bc/src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts#L18)*



**Returns:** Array<string>



___


## Methods
<a id="process"></a>

###  process

► **process**(response: *Response*, removeFromPayload?: *boolean*): Promise<[IWebResource](../interfaces/_src_datamodel_iwebresource_.iwebresource.md)>



*Implementation of [IHypermediaProcessor](../interfaces/_src_datamodel_ihypermediaprocessor_.ihypermediaprocessor.md).[process](../interfaces/_src_datamodel_ihypermediaprocessor_.ihypermediaprocessor.md#process)*

*Defined in [src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts:23](https://github.com/alien-mcl/Heracles.ts/blob/05f75bc/src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts#L23)*

**Parameters:**

| Name  | Type                | Default | Description  |
| ------ | ------------------- | ------------ | ------------ |
| response  | Response | - | - |
| removeFromPayload  | boolean | false | - |





**Returns:** Promise<[IWebResource](../interfaces/_src_datamodel_iwebresource_.iwebresource.md)>





___

<a id="generateblanknodeid"></a>

### «Static»«Private» generateBlankNodeId

► **generateBlankNodeId**(): string



*Defined in [src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts:42](https://github.com/alien-mcl/Heracles.ts/blob/05f75bc/src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts#L42)*



**Returns:** string





___

<a id="initialize"></a>

### «Static» initialize

► **initialize**(): void



*Defined in [src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts:13](https://github.com/alien-mcl/Heracles.ts/blob/05f75bc/src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts#L13)*



**Returns:** void





___

<a id="processarray"></a>

### «Static»«Private» processArray

► **processArray**(payload: *any*, result: *Array<any>object*, removeFromPayload?: *boolean*): any[]object



*Defined in [src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts:62](https://github.com/alien-mcl/Heracles.ts/blob/05f75bc/src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts#L62)*

**Parameters:**

| Name  | Type                | Default | Description  |
| ------ | ------------------- | ------------ | ------------ |
| payload  | any | - | - |
| result  | Array<any>object | - | - |
| removeFromPayload  | boolean | false | - |





**Returns:** any[]object





___

<a id="processhypermedia"></a>

### «Static»«Private» processHypermedia

► **processHypermedia**(payload: *any*, result: *Array<any>object*, removeFromPayload?: *boolean*): any



*Defined in [src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts:47](https://github.com/alien-mcl/Heracles.ts/blob/05f75bc/src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts#L47)*

**Parameters:**

| Name  | Type                | Default | Description  |
| ------ | ------------------- | ------------ | ------------ |
| payload  | any | - | - |
| result  | Array<any>object | - | - |
| removeFromPayload  | boolean | false | - |





**Returns:** any





___

<a id="processresource"></a>

### «Static»«Private» processResource

► **processResource**(resource: *any*, result: *Array<any>object*, removeFromPayload: *boolean*): any



*Defined in [src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts:87](https://github.com/alien-mcl/Heracles.ts/blob/05f75bc/src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts#L87)*

**Parameters:**

| Name  | Type                | Default | Description  |
| ------ | ------------------- | ------------ | ------------ |
| resource  | any | - | - |
| result  | Array<any>object | - | - |
| removeFromPayload  | boolean | - | - |





**Returns:** any





___


