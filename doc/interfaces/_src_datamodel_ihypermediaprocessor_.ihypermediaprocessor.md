[hydraclient.js](../index.md) > ["src/DataModel/IHypermediaProcessor"](../modules/_src_datamodel_ihypermediaprocessor_.md) > [IHypermediaProcessor](../interfaces/_src_datamodel_ihypermediaprocessor_.ihypermediaprocessor.md)



# Interface: IHypermediaProcessor

**interface**: Describes an abstract meta-data providing facility which translates from raw @link Response to an abstract data model.

## Implemented by

* [JsonLdHypermediaProcessor](../classes/_src_datamodel_jsonld_jsonldhypermediaprocessor_.jsonldhypermediaprocessor.md)


## Properties

| Name  | Type                
| ------ | ------------------- 
| supportedMediaTypes | Array<string>
## Methods
<a id="process"></a>

###  process

► **process**(response: *Response*): Promise<[IWebResource](_src_datamodel_iwebresource_.iwebresource.md)>

► **process**(response: *Response*, removeFromPayload: *boolean*): Promise<[IWebResource](_src_datamodel_iwebresource_.iwebresource.md)>



*Defined in [src/DataModel/IHypermediaProcessor.ts:19](https://github.com/alien-mcl/Heracles.ts/blob/80e3949/src/DataModel/IHypermediaProcessor.ts#L19)*

Parses a given raw response.


**Parameters:**

| Name  | Type                | Default | Description  |
| ------ | ------------------- | ------------ | ------------ |
| response  | Response | - | Raw fetch response holding data to be parsed. |





**Returns:** Promise<[IWebResource](_src_datamodel_iwebresource_.iwebresource.md)>





*Defined in [src/DataModel/IHypermediaProcessor.ts:27](https://github.com/alien-mcl/Heracles.ts/blob/80e3949/src/DataModel/IHypermediaProcessor.ts#L27)*

Parses a given raw response.


**Parameters:**

| Name  | Type                | Default | Description  |
| ------ | ------------------- | ------------ | ------------ |
| response  | Response | - | Raw fetch response holding data to be parsed. |
| removeFromPayload  | boolean | - | Instructs whether to remove the hypermedia from the response&#x27;s body or not. |





**Returns:** Promise<[IWebResource](_src_datamodel_iwebresource_.iwebresource.md)>







___



