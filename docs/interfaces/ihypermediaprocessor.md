[hydraclient.js](../README.md) > [IHypermediaProcessor](../interfaces/ihypermediaprocessor.md)



# Interface: IHypermediaProcessor

**interface**: Describes an abstract meta-data providing facility which translates from raw @link Response to an abstract data model.

## Implemented by

* [JsonLdHypermediaProcessor](../classes/jsonldhypermediaprocessor.md)


## Properties

| Name  | Type                
| ------ | ------------------- 
| supportedMediaTypes | `Array`<`string`>


## Methods
<a id="process"></a>

###  process

► **process**(response: *`Response`*): `Promise`<[IWebResource](iwebresource.md)>

► **process**(response: *`Response`*, removeFromPayload: *`boolean`*): `Promise`<[IWebResource](iwebresource.md)>




*Defined in [src/DataModel/IHypermediaProcessor.ts:19](https://github.com/HydraCG/Heracles.ts/blob/master/src/DataModel/IHypermediaProcessor.ts#L19)*



Parses a given raw response.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| response | `Response` | Raw fetch response holding data to be parsed. |





**Returns:** `Promise`<[IWebResource](iwebresource.md)>






*Defined in [src/DataModel/IHypermediaProcessor.ts:27](https://github.com/HydraCG/Heracles.ts/blob/master/src/DataModel/IHypermediaProcessor.ts#L27)*



Parses a given raw response.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| response | `Response` | Raw fetch response holding data to be parsed. |
| removeFromPayload | `boolean` | Instructs whether to remove the hypermedia from the response&#x27;s body or not. |





**Returns:** `Promise`<[IWebResource](iwebresource.md)>







___


