[hydraclient.js](../README.md) > [HydraClient](../classes/hydraclient.md)



# Class: HydraClient


HydraClient, also known as Heracles.ts, is a generic client for Hydra-powered Web APIs.

To learn more about Hydra please refer to [https://www.hydra-cg.com/spec/latest/core/](https://www.hydra-cg.com/spec/latest/core/)

## Index

### Constructors

* [constructor](hydraclient.md#constructor)


### Properties

* [removeHypermediaFromPayload](hydraclient.md#removehypermediafrompayload)
* [apiDocumentationNotProvided](hydraclient.md#apidocumentationnotprovided)
* [hypermediaProcessors](hydraclient.md#hypermediaprocessors)
* [invalidResponse](hydraclient.md#invalidresponse)
* [noEntryPointDefined](hydraclient.md#noentrypointdefined)
* [noHypermediaProcessor](hydraclient.md#nohypermediaprocessor)
* [noUrlProvided](hydraclient.md#nourlprovided)
* [resourceEnrichmentProvider](hydraclient.md#resourceenrichmentprovider)
* [responseFormatNotSupported](hydraclient.md#responseformatnotsupported)


### Methods

* [getApiDocumentation](hydraclient.md#getapidocumentation)
* [getApiDocumentationUrl](hydraclient.md#getapidocumentationurl)
* [getHypermediaProcessor](hydraclient.md#gethypermediaprocessor)
* [getResource](hydraclient.md#getresource)
* [convertToPropertyDescriptorMap](hydraclient.md#converttopropertydescriptormap)
* [getUrl](hydraclient.md#geturl)
* [registerHypermediaProcessor](hydraclient.md#registerhypermediaprocessor)
* [registerResourceEnrichmentProvider](hydraclient.md#registerresourceenrichmentprovider)



---
## Constructors
<a id="constructor"></a>


### ⊕ **new HydraClient**(removeHypermediaFromPayload?: *`boolean`*): [HydraClient](hydraclient.md)



*Defined in [src/HydraClient.ts:29](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L29)*



Initializes a new instance of the [HydraClient](hydraclient.md) class.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| removeHypermediaFromPayload | `boolean` | Default value = false.Value indicating whether to remove hypermedia controls from the                                   resource&#x27;s payload or leave it as is. Default is true. |





**Returns:** [HydraClient](hydraclient.md)

---


## Properties
<a id="removehypermediafrompayload"></a>

###  removeHypermediaFromPayload

**●  removeHypermediaFromPayload**:  *`any`* 

*Defined in [src/HydraClient.ts:29](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L29)*





___

<a id="apidocumentationnotprovided"></a>

### «Static» apiDocumentationNotProvided

**●  apiDocumentationNotProvided**:  *`string`*  = "API documentation not provided."

*Defined in [src/HydraClient.ts:18](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L18)*





___

<a id="hypermediaprocessors"></a>

### «Static» hypermediaProcessors

**●  hypermediaProcessors**:  *[IHypermediaProcessor](../interfaces/ihypermediaprocessor.md)[]*  =  new Array<IHypermediaProcessor>()

*Defined in [src/HydraClient.ts:25](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L25)*





___

<a id="invalidresponse"></a>

### «Static» invalidResponse

**●  invalidResponse**:  *`string`*  = "Remote server responded with a status of "

*Defined in [src/HydraClient.ts:21](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L21)*





___

<a id="noentrypointdefined"></a>

### «Static» noEntryPointDefined

**●  noEntryPointDefined**:  *`string`*  = "API documentation has no entry point defined."

*Defined in [src/HydraClient.ts:19](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L19)*





___

<a id="nohypermediaprocessor"></a>

### «Static» noHypermediaProcessor

**●  noHypermediaProcessor**:  *`string`*  = "No hypermedia processor instance was provided for registration."

*Defined in [src/HydraClient.ts:20](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L20)*





___

<a id="nourlprovided"></a>

### «Static» noUrlProvided

**●  noUrlProvided**:  *`string`*  = "There was no Url provided."

*Defined in [src/HydraClient.ts:17](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L17)*





___

<a id="resourceenrichmentprovider"></a>

### «Static» resourceEnrichmentProvider

**●  resourceEnrichmentProvider**:  *object*  =  new ResourceEnrichmentProvider()

*Defined in [src/HydraClient.ts:26](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L26)*


#### Type declaration


enrichHypermedia: function
► **enrichHypermedia**(resource: *[IWebResource](../interfaces/iwebresource.md)*): [IWebResource](../interfaces/iwebresource.md)




*Defined in [src/HydraClient.ts:27](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L27)*



**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| resource | [IWebResource](../interfaces/iwebresource.md) | - |





**Returns:** [IWebResource](../interfaces/iwebresource.md)






___

<a id="responseformatnotsupported"></a>

### «Static» responseFormatNotSupported

**●  responseFormatNotSupported**:  *`string`*  = "Response format is not supported."

*Defined in [src/HydraClient.ts:22](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L22)*





___


## Methods
<a id="getapidocumentation"></a>

###  getApiDocumentation

► **getApiDocumentation**(urlOrResource: *`string`⎮[IResource](../interfaces/iresource.md)*): `Promise`<[IApiDocumentation](../interfaces/iapidocumentation.md)>




*Defined in [src/HydraClient.ts:90](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L90)*



Obtains an API documentation.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| urlOrResource | `string`⎮[IResource](../interfaces/iresource.md) | URL or object with an iri property from which to obtain an API                     documentation. |





**Returns:** `Promise`<[IApiDocumentation](../interfaces/iapidocumentation.md)>





___

<a id="getapidocumentationurl"></a>

### «Private» getApiDocumentationUrl

► **getApiDocumentationUrl**(url: *`string`*): `Promise`<`string`>




*Defined in [src/HydraClient.ts:138](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L138)*



**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| url | `string` | - |





**Returns:** `Promise`<`string`>





___

<a id="gethypermediaprocessor"></a>

###  getHypermediaProcessor

► **getHypermediaProcessor**(response: *`Response`*): [IHypermediaProcessor](../interfaces/ihypermediaprocessor.md)




*Defined in [src/HydraClient.ts:74](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L74)*



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




*Defined in [src/HydraClient.ts:117](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L117)*



Obtains a representation of a resource.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| urlOrResource | `string`⎮[IResource](../interfaces/iresource.md) | URL or a {@link IResource} carrying an IRI of the resource to be obtained. |





**Returns:** `Promise`<[IWebResource](../interfaces/iwebresource.md)>





___

<a id="converttopropertydescriptormap"></a>

### «Static»«Private» convertToPropertyDescriptorMap

► **convertToPropertyDescriptorMap**(instance: *`any`*): `PropertyDescriptorMap`




*Defined in [src/HydraClient.ts:172](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L172)*



**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| instance | `any` | - |





**Returns:** `PropertyDescriptorMap`





___

<a id="geturl"></a>

### «Static»«Private» getUrl

► **getUrl**(urlOrResource: *`string`⎮[IResource](../interfaces/iresource.md)*): `string`




*Defined in [src/HydraClient.ts:162](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L162)*



**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| urlOrResource | `string`⎮[IResource](../interfaces/iresource.md) | - |





**Returns:** `string`





___

<a id="registerhypermediaprocessor"></a>

### «Static» registerHypermediaProcessor

► **registerHypermediaProcessor**(hypermediaProcessor: *[IHypermediaProcessor](../interfaces/ihypermediaprocessor.md)*): `void`




*Defined in [src/HydraClient.ts:59](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L59)*



Registers a hypermedia processor.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| hypermediaProcessor | [IHypermediaProcessor](../interfaces/ihypermediaprocessor.md) | Hypermedia processor to be registered. |





**Returns:** `void`





___

<a id="registerresourceenrichmentprovider"></a>

### «Static» registerResourceEnrichmentProvider

► **registerResourceEnrichmentProvider**(resourceEnrichmentProvider: *object*): `void`




*Defined in [src/HydraClient.ts:46](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L46)*



Registers a custom resource enrichment provider.


**Parameters:**

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| resourceEnrichmentProvider | object | Component to be registered. |





**Returns:** `void`





___


