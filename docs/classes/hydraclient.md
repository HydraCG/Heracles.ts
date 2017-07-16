[hydraclient.js](../README.md) > [HydraClient](../classes/hydraclient.md)



# Class: HydraClient

**class**: HydraClient Heracles is a generic client for Hydra-powered Web APIs.
                   To learn more about Hydra please refer to {@link https://www.hydra-cg.com/spec/latest/core/}

## Index

### Constructors

* [constructor](hydraclient.md#constructor)


### Properties

* [_removeHypermediaFromPayload](hydraclient.md#_removehypermediafrompayload)
* [_hypermediaProcessors](hydraclient.md#_hypermediaprocessors)
* [apiDocumentationNotProvided](hydraclient.md#apidocumentationnotprovided)
* [invalidResponse](hydraclient.md#invalidresponse)
* [noEntryPointDefined](hydraclient.md#noentrypointdefined)
* [noHypermediaProcessor](hydraclient.md#nohypermediaprocessor)
* [noUrlProvided](hydraclient.md#nourlprovided)
* [responseFormatNotSupported](hydraclient.md#responseformatnotsupported)


### Methods

* [getApiDocumentation](hydraclient.md#getapidocumentation)
* [getApiDocumentationUrl](hydraclient.md#getapidocumentationurl)
* [getHypermediaProcessor](hydraclient.md#gethypermediaprocessor)
* [getResource](hydraclient.md#getresource)
* [convertToPropertyDescriptorMap](hydraclient.md#converttopropertydescriptormap)
* [getUrl](hydraclient.md#geturl)
* [registerHypermediaProcessor](hydraclient.md#registerhypermediaprocessor)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new HydraClient**(removeHypermediaFromPayload?: *`boolean`*): [HydraClient](hydraclient.md)



*Defined in [src/HydraClient.ts:24](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L24)*



Initializes a new instance of the [HydraClient](hydraclient.md) class.
**constructor**: 

**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| removeHypermediaFromPayload | `boolean` | Default value = false.Value indicating whether to remove hypermedia controls from the     resource&#x27;s payload or leave it as is. Default is true. |





**Returns:** [HydraClient](hydraclient.md)

---


## Properties
<a id="_removehypermediafrompayload"></a>

### «Private» _removeHypermediaFromPayload

**●  _removeHypermediaFromPayload**:  *`any`* 

*Defined in [src/HydraClient.ts:17](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L17)*





___

<a id="_hypermediaprocessors"></a>

### «Static»«Private» _hypermediaProcessors

**●  _hypermediaProcessors**:  *[IHypermediaProcessor](../interfaces/ihypermediaprocessor.md)[]*  =  new Array<IHypermediaProcessor>()

*Defined in [src/HydraClient.ts:16](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L16)*





___

<a id="apidocumentationnotprovided"></a>

### «Static» apiDocumentationNotProvided

**●  apiDocumentationNotProvided**:  *`string`*  = "API documentation not provided."

*Defined in [src/HydraClient.ts:20](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L20)*





___

<a id="invalidresponse"></a>

### «Static» invalidResponse

**●  invalidResponse**:  *`string`*  = "Remote server responded with a status of "

*Defined in [src/HydraClient.ts:23](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L23)*





___

<a id="noentrypointdefined"></a>

### «Static» noEntryPointDefined

**●  noEntryPointDefined**:  *`string`*  = "API documentation has no entry point defined."

*Defined in [src/HydraClient.ts:21](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L21)*





___

<a id="nohypermediaprocessor"></a>

### «Static» noHypermediaProcessor

**●  noHypermediaProcessor**:  *`string`*  = "No hypermedia processor instance was provided for registration."

*Defined in [src/HydraClient.ts:22](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L22)*





___

<a id="nourlprovided"></a>

### «Static» noUrlProvided

**●  noUrlProvided**:  *`string`*  = "There was no Url provided."

*Defined in [src/HydraClient.ts:19](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L19)*





___

<a id="responseformatnotsupported"></a>

### «Static» responseFormatNotSupported

**●  responseFormatNotSupported**:  *`string`*  = "Response format is not supported."

*Defined in [src/HydraClient.ts:24](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L24)*





___


## Methods
<a id="getapidocumentation"></a>

###  getApiDocumentation

► **getApiDocumentation**(urlOrResource: *`string`⎮[IResource](../interfaces/iresource.md)*): `Promise`<[IApiDocumentation](../interfaces/iapidocumentation.md)>




*Defined in [src/HydraClient.ts:67](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L67)*



Obtains an API documentation.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| urlOrResource | `string`⎮[IResource](../interfaces/iresource.md) | Url or object with an iri property from which to obtain an API documentation. |





**Returns:** `Promise`<[IApiDocumentation](../interfaces/iapidocumentation.md)>







___

<a id="getapidocumentationurl"></a>

### «Private» getApiDocumentationUrl

► **getApiDocumentationUrl**(url: *`string`*): `Promise`<`string`>




*Defined in [src/HydraClient.ts:106](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L106)*



**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| url | `string` | - |





**Returns:** `Promise`<`string`>





___

<a id="gethypermediaprocessor"></a>

###  getHypermediaProcessor

► **getHypermediaProcessor**(response: *`Response`*): [IHypermediaProcessor](../interfaces/ihypermediaprocessor.md)




*Defined in [src/HydraClient.ts:56](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L56)*



Gets a hypermedia provider suitable for a given response.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| response | `Response` | Raw response to find hypermedia processor for. |





**Returns:** [IHypermediaProcessor](../interfaces/ihypermediaprocessor.md)







___

<a id="getresource"></a>

###  getResource

► **getResource**(urlOrResource: *`string`⎮[IResource](../interfaces/iresource.md)*): `Promise`<[IWebResource](../interfaces/iwebresource.md)>




*Defined in [src/HydraClient.ts:88](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L88)*



Obtains a representation of a resource.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| urlOrResource | `string`⎮[IResource](../interfaces/iresource.md) | Url or a {@link IResource} carrying an Iri of the resource to be obtained. |





**Returns:** `Promise`<[IWebResource](../interfaces/iwebresource.md)>







___

<a id="converttopropertydescriptormap"></a>

### «Static»«Private» convertToPropertyDescriptorMap

► **convertToPropertyDescriptorMap**(instance: *`any`*): `PropertyDescriptorMap`




*Defined in [src/HydraClient.ts:140](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L140)*



**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| instance | `any` | - |





**Returns:** `PropertyDescriptorMap`





___

<a id="geturl"></a>

### «Static»«Private» getUrl

► **getUrl**(urlOrResource: *`string`⎮[IResource](../interfaces/iresource.md)*): `string`




*Defined in [src/HydraClient.ts:129](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L129)*



**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| urlOrResource | `string`⎮[IResource](../interfaces/iresource.md) | - |





**Returns:** `string`





___

<a id="registerhypermediaprocessor"></a>

### «Static» registerHypermediaProcessor

► **registerHypermediaProcessor**(hypermediaProcessor: *[IHypermediaProcessor](../interfaces/ihypermediaprocessor.md)*): `void`




*Defined in [src/HydraClient.ts:41](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L41)*



Registers a hypermedia processor.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| hypermediaProcessor | [IHypermediaProcessor](../interfaces/ihypermediaprocessor.md) | Hypermedia processor to be registered. |





**Returns:** `void`





___


