[hydraclient.js](../README.md) > ["src/DataModel/IApiDocumentation"](../modules/_src_datamodel_iapidocumentation_.md) > [IApiDocumentation](../interfaces/_src_datamodel_iapidocumentation_.iapidocumentation.md)



# Interface: IApiDocumentation

**interface**: Represents an abstract API documentation.

## Hierarchy


 [IHypermedia](_src_datamodel_ihypermedia_.ihypermedia.md)

**↳ IApiDocumentation**







## Implemented by

* [ApiDocumentation](../classes/_src_apidocumentation_.apidocumentation.md)


## Properties

| Name  | Type                
| ------ | ------------------- 
| client | [HydraClient](../classes/_src_hydraclient_.hydraclient.md)
| description | `string`
| entryPoint | `string`⎮[IResource](_src_datamodel_iresource_.iresource.md)
| supportedClasses | `Array`<[IClass](_src_datamodel_iclass_.iclass.md)>
| title | `string`


## Methods
<a id="getentrypoint"></a>

###  getEntryPoint

► **getEntryPoint**(): `Promise`<[IWebResource](_src_datamodel_iwebresource_.iwebresource.md)>




*Defined in [src/DataModel/IApiDocumentation.ts:35](https://github.com//HydraCG/Heracles.ts/blob/master/src/DataModel/IApiDocumentation.ts#L35)*



Retrieves an API's entry point resource.




**Returns:** `Promise`<[IWebResource](_src_datamodel_iwebresource_.iwebresource.md)>
Promise<IWebResource>






___


