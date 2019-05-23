[@hydra-cg/heracles.ts](../README.md) > [HydraClient](../classes/hydraclient.md)

# Class: HydraClient

HydraClient, also known as Heracles.ts, is a generic client for Hydra-powered Web APIs.

To learn more about Hydra please refer to [https://www.hydra-cg.com/spec/latest/core/](https://www.hydra-cg.com/spec/latest/core/)

## Hierarchy

**HydraClient**

## Implements

* [IHydraClient](../interfaces/ihydraclient.md)

## Index

### Constructors

* [constructor](hydraclient.md#constructor)

### Properties

* [httpCall](hydraclient.md#httpcall)
* [hypermediaProcessors](hydraclient.md#hypermediaprocessors)
* [iriTemplateExpansionStrategy](hydraclient.md#iritemplateexpansionstrategy)
* [linksPolicy](hydraclient.md#linkspolicy)
* [apiDocumentationNotProvided](hydraclient.md#apidocumentationnotprovided)
* [invalidResponse](hydraclient.md#invalidresponse)
* [noEntryPointDefined](hydraclient.md#noentrypointdefined)
* [noHttpFacility](hydraclient.md#nohttpfacility)
* [noHypermediaProcessors](hydraclient.md#nohypermediaprocessors)
* [noIriTemplateExpansionStrategy](hydraclient.md#noiritemplateexpansionstrategy)
* [noOperationProvided](hydraclient.md#nooperationprovided)
* [noUrlProvided](hydraclient.md#nourlprovided)
* [responseFormatNotSupported](hydraclient.md#responseformatnotsupported)

### Methods

* [getApiDocumentation](hydraclient.md#getapidocumentation)
* [getApiDocumentationUrl](hydraclient.md#getapidocumentationurl)
* [getHypermediaProcessor](hydraclient.md#gethypermediaprocessor)
* [getResource](hydraclient.md#getresource)
* [getResourceFrom](hydraclient.md#getresourcefrom)
* [invoke](hydraclient.md#invoke)
* [makeRequestTo](hydraclient.md#makerequestto)
* [getUrl](hydraclient.md#geturl)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new HydraClient**(hypermediaProcessors: *`Iterable`<[IHypermediaProcessor](../interfaces/ihypermediaprocessor.md)>*, iriTemplateExpansionStrategy: *[IIriTemplateExpansionStrategy](../interfaces/iiritemplateexpansionstrategy.md)*, linksPolicy?: *[LinksPolicy](../enums/linkspolicy.md)*, httpCall: *[HttpCallFacility](../#httpcallfacility)*): [HydraClient](hydraclient.md)

*Defined in [HydraClient.ts:36](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClient.ts#L36)*

Initializes a new instance of the [HydraClient](hydraclient.md) class.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| hypermediaProcessors | `Iterable`<[IHypermediaProcessor](../interfaces/ihypermediaprocessor.md)> | - |  Hypermedia processors used for response hypermedia controls extraction. |
| iriTemplateExpansionStrategy | [IIriTemplateExpansionStrategy](../interfaces/iiritemplateexpansionstrategy.md) | - |  IRI template variable expansion strategy. |
| `Default value` linksPolicy | [LinksPolicy](../enums/linkspolicy.md) |  LinksPolicy.Strict |  Policy defining what is a considered a link. |
| httpCall | [HttpCallFacility](../#httpcallfacility) | - |  HTTP facility used to call remote server. |

**Returns:** [HydraClient](hydraclient.md)

___

## Properties

<a id="httpcall"></a>

### `<Private>` httpCall

**● httpCall**: *`function`*

*Defined in [HydraClient.ts:36](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClient.ts#L36)*

#### Type declaration
▸(url: *`string`*, options?: *`RequestInit`*): `Promise`<`Response`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| url | `string` |
| `Optional` options | `RequestInit` |

**Returns:** `Promise`<`Response`>

___
<a id="hypermediaprocessors"></a>

### `<Private>` hypermediaProcessors

**● hypermediaProcessors**: *[IHypermediaProcessor](../interfaces/ihypermediaprocessor.md)[]*

*Defined in [HydraClient.ts:33](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClient.ts#L33)*

___
<a id="iritemplateexpansionstrategy"></a>

### `<Private>` iriTemplateExpansionStrategy

**● iriTemplateExpansionStrategy**: *[IIriTemplateExpansionStrategy](../interfaces/iiritemplateexpansionstrategy.md)*

*Defined in [HydraClient.ts:34](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClient.ts#L34)*

___
<a id="linkspolicy"></a>

### `<Private>` linksPolicy

**● linksPolicy**: *[LinksPolicy](../enums/linkspolicy.md)*

*Defined in [HydraClient.ts:35](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClient.ts#L35)*

___
<a id="apidocumentationnotprovided"></a>

### `<Static>` apiDocumentationNotProvided

**● apiDocumentationNotProvided**: *`string`* = "API documentation not provided."

*Defined in [HydraClient.ts:25](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClient.ts#L25)*

___
<a id="invalidresponse"></a>

### `<Static>` invalidResponse

**● invalidResponse**: *`string`* = "Remote server responded with a status of "

*Defined in [HydraClient.ts:28](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClient.ts#L28)*

___
<a id="noentrypointdefined"></a>

### `<Static>` noEntryPointDefined

**● noEntryPointDefined**: *`string`* = "API documentation has no entry point defined."

*Defined in [HydraClient.ts:26](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClient.ts#L26)*

___
<a id="nohttpfacility"></a>

### `<Static>` noHttpFacility

**● noHttpFacility**: *`string`* = "No HTTP facility provided."

*Defined in [HydraClient.ts:31](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClient.ts#L31)*

___
<a id="nohypermediaprocessors"></a>

### `<Static>` noHypermediaProcessors

**● noHypermediaProcessors**: *`string`* = "No valid hypermedia processor instances were provided."

*Defined in [HydraClient.ts:27](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClient.ts#L27)*

___
<a id="noiritemplateexpansionstrategy"></a>

### `<Static>` noIriTemplateExpansionStrategy

**● noIriTemplateExpansionStrategy**: *`string`* = "No IRI template expansion strategy was provided."

*Defined in [HydraClient.ts:30](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClient.ts#L30)*

___
<a id="nooperationprovided"></a>

### `<Static>` noOperationProvided

**● noOperationProvided**: *`string`* = "There was no operation provided."

*Defined in [HydraClient.ts:23](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClient.ts#L23)*

___
<a id="nourlprovided"></a>

### `<Static>` noUrlProvided

**● noUrlProvided**: *`string`* = "There was no Url provided."

*Defined in [HydraClient.ts:24](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClient.ts#L24)*

___
<a id="responseformatnotsupported"></a>

### `<Static>` responseFormatNotSupported

**● responseFormatNotSupported**: *`string`* = "Response format is not supported."

*Defined in [HydraClient.ts:29](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClient.ts#L29)*

___

## Methods

<a id="getapidocumentation"></a>

###  getApiDocumentation

▸ **getApiDocumentation**(urlOrResource: *`string` \| [IResource](../interfaces/iresource.md)*): `Promise`<[IApiDocumentation](../interfaces/iapidocumentation.md)>

*Implementation of [IHydraClient](../interfaces/ihydraclient.md).[getApiDocumentation](../interfaces/ihydraclient.md#getapidocumentation)*

*Defined in [HydraClient.ts:85](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClient.ts#L85)*

Obtains an API documentation.

**Parameters:**

| Name | Type |
| ------ | ------ |
| urlOrResource | `string` \| [IResource](../interfaces/iresource.md) |

**Returns:** `Promise`<[IApiDocumentation](../interfaces/iapidocumentation.md)>

___
<a id="getapidocumentationurl"></a>

### `<Private>` getApiDocumentationUrl

▸ **getApiDocumentationUrl**(url: *`string`*): `Promise`<`object`>

*Defined in [HydraClient.ts:138](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClient.ts#L138)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| url | `string` |

**Returns:** `Promise`<`object`>

___
<a id="gethypermediaprocessor"></a>

###  getHypermediaProcessor

▸ **getHypermediaProcessor**(response: *`Response`*): [IHypermediaProcessor](../interfaces/ihypermediaprocessor.md)

*Implementation of [IHydraClient](../interfaces/ihydraclient.md).[getHypermediaProcessor](../interfaces/ihydraclient.md#gethypermediaprocessor)*

*Defined in [HydraClient.ts:71](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClient.ts#L71)*

Gets a hypermedia provider suitable for a given response.

**Parameters:**

| Name | Type |
| ------ | ------ |
| response | `Response` |

**Returns:** [IHypermediaProcessor](../interfaces/ihypermediaprocessor.md)

___
<a id="getresource"></a>

###  getResource

▸ **getResource**(urlOrResource: *`string` \| [IResource](../interfaces/iresource.md) \| [ILink](../interfaces/ilink.md)*): `Promise`<[IWebResource](../interfaces/iwebresource.md)>

*Implementation of [IHydraClient](../interfaces/ihydraclient.md).[getResource](../interfaces/ihydraclient.md#getresource)*

*Defined in [HydraClient.ts:99](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClient.ts#L99)*

Obtains a representation of a resource.

**Parameters:**

| Name | Type |
| ------ | ------ |
| urlOrResource | `string` \| [IResource](../interfaces/iresource.md) \| [ILink](../interfaces/ilink.md) |

**Returns:** `Promise`<[IWebResource](../interfaces/iwebresource.md)>

___
<a id="getresourcefrom"></a>

### `<Private>` getResourceFrom

▸ **getResourceFrom**(url: *`string`*, options: *`any`*): `Promise`<[IWebResource](../interfaces/iwebresource.md)>

*Defined in [HydraClient.ts:119](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClient.ts#L119)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| url | `string` |
| options | `any` |

**Returns:** `Promise`<[IWebResource](../interfaces/iwebresource.md)>

___
<a id="invoke"></a>

###  invoke

▸ **invoke**(operation: *[IOperation](../interfaces/ioperation.md)*, body?: *[IWebResource](../interfaces/iwebresource.md)*, parameters?: *`object`*): `Promise`<`Response`>

*Implementation of [IHydraClient](../interfaces/ihydraclient.md).[invoke](../interfaces/ihydraclient.md#invoke)*

*Defined in [HydraClient.ts:104](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClient.ts#L104)*

Invokes a given operation.

**Parameters:**

| Name | Type |
| ------ | ------ |
| operation | [IOperation](../interfaces/ioperation.md) |
| `Optional` body | [IWebResource](../interfaces/iwebresource.md) |
| `Optional` parameters | `object` |

**Returns:** `Promise`<`Response`>

___
<a id="makerequestto"></a>

### `<Private>` makeRequestTo

▸ **makeRequestTo**(url: *`string`*, options?: *`RequestInit`*): `Promise`<`Response`>

*Defined in [HydraClient.ts:169](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClient.ts#L169)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| url | `string` |
| `Optional` options | `RequestInit` |

**Returns:** `Promise`<`Response`>

___
<a id="geturl"></a>

### `<Static>``<Private>` getUrl

▸ **getUrl**(urlOrResource: *`string` \| [IResource](../interfaces/iresource.md) \| [ILink](../interfaces/ilink.md)*): `string`

*Defined in [HydraClient.ts:156](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClient.ts#L156)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| urlOrResource | `string` \| [IResource](../interfaces/iresource.md) \| [ILink](../interfaces/ilink.md) |

**Returns:** `string`

___

