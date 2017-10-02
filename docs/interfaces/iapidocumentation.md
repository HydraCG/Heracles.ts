[hydraclient.js](../README.md) > [IApiDocumentation](../interfaces/iapidocumentation.md)



# Interface: IApiDocumentation


Represents an abstract API documentation.

## Hierarchy


 [IHypermedia](ihypermedia.md)

**↳ IApiDocumentation**







## Implemented by

* [ApiDocumentation](../classes/apidocumentation.md)


## Properties

| Name  | Type                
| ------ | ------------------- 
| client | [HydraClient](../classes/hydraclient.md)
| description | `string`
| entryPoint | `string`⎮[IResource](iresource.md)
| supportedClasses | [IClass](iclass.md)[]
| title | `string`


## Methods
<a id="getentrypoint"></a>

###  getEntryPoint

► **getEntryPoint**(): `Promise`<[IWebResource](iwebresource.md)>




*Defined in [src/DataModel/IApiDocumentation.ts:33](https://github.com/HydraCG/Heracles.ts/blob/master/src/DataModel/IApiDocumentation.ts#L33)*



Retrieves an API's entry point resource.




**Returns:** `Promise`<[IWebResource](iwebresource.md)>





___


