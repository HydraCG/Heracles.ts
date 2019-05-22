[@hydra-cg/heracles.ts](../README.md) > [ProcessingState](../classes/processingstate.md)

# Class: ProcessingState

Maintains a JSON-LD processing context.

*__class__*: 

## Hierarchy

**ProcessingState**

## Index

### Constructors

* [constructor](processingstate.md#constructor)

### Properties

* [allHypermedia](processingstate.md#allhypermedia)
* [baseUrl](processingstate.md#baseurl)
* [client](processingstate.md#client)
* [currentResource](processingstate.md#currentresource)
* [finalHypermedia](processingstate.md#finalhypermedia)
* [forbiddenHypermedia](processingstate.md#forbiddenhypermedia)
* [foundResources](processingstate.md#foundresources)
* [linksPolicy](processingstate.md#linkspolicy)
* [notifications](processingstate.md#notifications)
* [ownerIri](processingstate.md#owneriri)
* [parentIri](processingstate.md#parentiri)
* [payload](processingstate.md#payload)
* [processedObject](processingstate.md#processedobject)
* [resourceMap](processingstate.md#resourcemap)
* [rootUrl](processingstate.md#rooturl)

### Accessors

* [hypermedia](processingstate.md#hypermedia)

### Methods

* [copyFor](processingstate.md#copyfor)
* [createResource](processingstate.md#createresource)
* [findRawResource](processingstate.md#findrawresource)
* [getVisitedResource](processingstate.md#getvisitedresource)
* [markAsOwned](processingstate.md#markasowned)
* [notifyMaterialized](processingstate.md#notifymaterialized)
* [onMaterialized](processingstate.md#onmaterialized)
* [provideResource](processingstate.md#provideresource)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ProcessingState**(graphToProcess: *`object`[]*, baseUrl: *`string`*, client: *[IHydraClient](../interfaces/ihydraclient.md)*, linksPolicy: *[LinksPolicy](../enums/linkspolicy.md)*): [ProcessingState](processingstate.md)

⊕ **new ProcessingState**(objectToProcess: *`object`*, ownerIri: *`string`*, parentIri: *`string`*, parentState: *[ProcessingState](processingstate.md)*): [ProcessingState](processingstate.md)

*Defined in [JsonLd/ProcessingState.ts:90](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/ProcessingState.ts#L90)*

Initializes a new instance of the [ProcessingState](processingstate.md) class.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| graphToProcess | `object`[] |  Actual graph to process. |
| baseUrl | `string` |  Base URL. |
| client | [IHydraClient](../interfaces/ihydraclient.md) |  Hydra client instance. |
| linksPolicy | [LinksPolicy](../enums/linkspolicy.md) |  Policy defining what is considered a link. |

**Returns:** [ProcessingState](processingstate.md)

*Defined in [JsonLd/ProcessingState.ts:99](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/ProcessingState.ts#L99)*

Initializes a new instance of the [ProcessingState](processingstate.md) class.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| objectToProcess | `object` |  Actual object to process. |
| ownerIri | `string` |  Object to process owning resource's IRI. |
| parentIri | `string` |  Object to process parent resource's IRI. |
| parentState | [ProcessingState](processingstate.md) |  Parent processing state to obtain more details from. |

**Returns:** [ProcessingState](processingstate.md)

___

## Properties

<a id="allhypermedia"></a>

### `<Private>` allHypermedia

**● allHypermedia**: *[IResource](../interfaces/iresource.md)[]*

*Defined in [JsonLd/ProcessingState.ts:86](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/ProcessingState.ts#L86)*

___
<a id="baseurl"></a>

###  baseUrl

**● baseUrl**: *`string`*

*Defined in [JsonLd/ProcessingState.ts:61](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/ProcessingState.ts#L61)*

Gets the base URL to use for relative ones.

*__readonly__*: 

*__returns__*: 

___
<a id="client"></a>

### `<Private>` client

**● client**: *[IHydraClient](../interfaces/ihydraclient.md)*

*Defined in [JsonLd/ProcessingState.ts:87](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/ProcessingState.ts#L87)*

___
<a id="currentresource"></a>

###  currentResource

**● currentResource**: *[IResource](../interfaces/iresource.md)* =  null

*Defined in [JsonLd/ProcessingState.ts:82](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/ProcessingState.ts#L82)*

Gets the processed object's resource. This is provided once the {@link ProcessingState.provideResource(boolean) is called.

*__type__*: {IResource = null}

___
<a id="finalhypermedia"></a>

### `<Private>` finalHypermedia

**● finalHypermedia**: *[IResource](../interfaces/iresource.md)[]* =  null

*Defined in [JsonLd/ProcessingState.ts:15](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/ProcessingState.ts#L15)*

___
<a id="forbiddenhypermedia"></a>

### `<Private>` forbiddenHypermedia

**● forbiddenHypermedia**: *[IDictionary](../interfaces/idictionary.md)<`boolean`>*

*Defined in [JsonLd/ProcessingState.ts:85](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/ProcessingState.ts#L85)*

___
<a id="foundresources"></a>

### `<Private>` foundResources

**● foundResources**: *[IDictionary](../interfaces/idictionary.md)<`any`>*

*Defined in [JsonLd/ProcessingState.ts:88](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/ProcessingState.ts#L88)*

___
<a id="linkspolicy"></a>

###  linksPolicy

**● linksPolicy**: *[LinksPolicy](../enums/linkspolicy.md)*

*Defined in [JsonLd/ProcessingState.ts:75](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/ProcessingState.ts#L75)*

Gets the current links policy.

*__readonly__*: 

*__returns__*: 

___
<a id="notifications"></a>

### `<Private>` notifications

**● notifications**: *[IDictionary](../interfaces/idictionary.md)<[Notification](../#notification)[]>*

*Defined in [JsonLd/ProcessingState.ts:90](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/ProcessingState.ts#L90)*

___
<a id="owneriri"></a>

###  ownerIri

**● ownerIri**: *`string`*

*Defined in [JsonLd/ProcessingState.ts:47](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/ProcessingState.ts#L47)*

Gets the processed object's owning resource's IRI. This owning resource may not be a direct parent.

*__readonly__*: 

*__returns__*: 

___
<a id="parentiri"></a>

###  parentIri

**● parentIri**: *`string`*

*Defined in [JsonLd/ProcessingState.ts:54](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/ProcessingState.ts#L54)*

Gets the processed object's parent resource's IRI.

*__readonly__*: 

*__returns__*: 

___
<a id="payload"></a>

### `<Private>` payload

**● payload**: *`object`[]*

*Defined in [JsonLd/ProcessingState.ts:89](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/ProcessingState.ts#L89)*

___
<a id="processedobject"></a>

###  processedObject

**● processedObject**: *`object`*

*Defined in [JsonLd/ProcessingState.ts:22](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/ProcessingState.ts#L22)*

Gets the currently processed object.

*__readonly__*: 

*__returns__*: 

___
<a id="resourcemap"></a>

### `<Private>` resourceMap

**● resourceMap**: *[IDictionary](../interfaces/idictionary.md)<[IResource](../interfaces/iresource.md)>*

*Defined in [JsonLd/ProcessingState.ts:84](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/ProcessingState.ts#L84)*

___
<a id="rooturl"></a>

###  rootUrl

**● rootUrl**: *`string`*

*Defined in [JsonLd/ProcessingState.ts:68](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/ProcessingState.ts#L68)*

Gets the protocol, host and port of the [baseUrl](processingstate.md#baseurl);

*__readonly__*: 

*__returns__*: 

___

## Accessors

<a id="hypermedia"></a>

###  hypermedia

**get hypermedia**(): [IResource](../interfaces/iresource.md)[]

*Defined in [JsonLd/ProcessingState.ts:29](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/ProcessingState.ts#L29)*

Gets all hypermedia discovered.

*__readonly__*: 

**Returns:** [IResource](../interfaces/iresource.md)[]

___

## Methods

<a id="copyfor"></a>

###  copyFor

▸ **copyFor**(objectToProcess: *`object`*): [ProcessingState](processingstate.md)

*Defined in [JsonLd/ProcessingState.ts:195](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/ProcessingState.ts#L195)*

Creates a child processing context.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| objectToProcess | `object` |  Nested object to be processed. |

**Returns:** [ProcessingState](processingstate.md)

___
<a id="createresource"></a>

### `<Private>` createResource

▸ **createResource**(iri: *`string`*, types: *`string`[]*): [IResource](../interfaces/iresource.md)

*Defined in [JsonLd/ProcessingState.ts:267](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/ProcessingState.ts#L267)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| iri | `string` |
| types | `string`[] |

**Returns:** [IResource](../interfaces/iresource.md)

___
<a id="findrawresource"></a>

###  findRawResource

▸ **findRawResource**(iri: *`string`*): `any`

*Defined in [JsonLd/ProcessingState.ts:172](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/ProcessingState.ts#L172)*

Searches an original response payload for a resource of a given Iri.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| iri | `string` |  Resource's Iri to search for. |

**Returns:** `any`

___
<a id="getvisitedresource"></a>

###  getVisitedResource

▸ **getVisitedResource**(iri: *`string`*): `any`

*Defined in [JsonLd/ProcessingState.ts:186](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/ProcessingState.ts#L186)*

Gets a visited resource.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| iri | `string` |  Iri of the resource to be obtained. |

**Returns:** `any`

___
<a id="markasowned"></a>

###  markAsOwned

▸ **markAsOwned**(iri: *`string`*): `void`

*Defined in [JsonLd/ProcessingState.ts:154](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/ProcessingState.ts#L154)*

Marks as owned hypermedia, this the given iri won't be available as a standalone hypermedia control.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| iri | `string` |  Iri to be marked. |

**Returns:** `void`

___
<a id="notifymaterialized"></a>

###  notifyMaterialized

▸ **notifyMaterialized**(iri: *`string`*, notification: *[Notification](../#notification)*): `void`

*Defined in [JsonLd/ProcessingState.ts:244](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/ProcessingState.ts#L244)*

Registers a handler to be invoked once the resource of a given Iri is materialized.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| iri | `string` |  Iri of the resource that must be materialized for notification. |
| notification | [Notification](../#notification) |  Delegate used for invocation. |

**Returns:** `void`

___
<a id="onmaterialized"></a>

###  onMaterialized

▸ **onMaterialized**(resource: *[IResource](../interfaces/iresource.md)*): `void`

*Defined in [JsonLd/ProcessingState.ts:257](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/ProcessingState.ts#L257)*

Raises notifications about resource materialized.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| resource | [IResource](../interfaces/iresource.md) |  Resource that was just materialized. |

**Returns:** `void`

___
<a id="provideresource"></a>

###  provideResource

▸ **provideResource**(addToHypermedia?: *`boolean`*): [IResource](../interfaces/iresource.md)

*Defined in [JsonLd/ProcessingState.ts:223](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/ProcessingState.ts#L223)*

Creates a resource representation of the object being processed.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Default value` addToHypermedia | `boolean` | true |  Value indicating whether to add this resource to the [ProcessingState.hypermedia](processingstate.md#hypermedia) collection. |

**Returns:** [IResource](../interfaces/iresource.md)

___

