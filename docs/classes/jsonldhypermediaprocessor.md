[@hydra-cg/heracles.ts](../README.md) > [JsonLdHypermediaProcessor](../classes/jsonldhypermediaprocessor.md)

# Class: JsonLdHypermediaProcessor

Provides a JSON-LD based implementation of the [IHypermediaProcessor](../interfaces/ihypermediaprocessor.md) interface.

*__class__*: 

## Hierarchy

**JsonLdHypermediaProcessor**

## Implements

* [IHypermediaProcessor](../interfaces/ihypermediaprocessor.md)

## Index

### Constructors

* [constructor](jsonldhypermediaprocessor.md#constructor)

### Properties

* [graphTransformer](jsonldhypermediaprocessor.md#graphtransformer)
* [httpCall](jsonldhypermediaprocessor.md#httpcall)
* [indirectTypingProvider](jsonldhypermediaprocessor.md#indirecttypingprovider)
* [exactMatchCases](jsonldhypermediaprocessor.md#exactmatchcases)
* [json](jsonldhypermediaprocessor.md#json)
* [jsonLd](jsonldhypermediaprocessor.md#jsonld)
* [mediaTypes](jsonldhypermediaprocessor.md#mediatypes)

### Accessors

* [supportedMediaTypes](jsonldhypermediaprocessor.md#supportedmediatypes)

### Methods

* [ensureJsonLd](jsonldhypermediaprocessor.md#ensurejsonld)
* [gatherPropertyValues](jsonldhypermediaprocessor.md#gatherpropertyvalues)
* [isValidPredicate](jsonldhypermediaprocessor.md#isvalidpredicate)
* [process](jsonldhypermediaprocessor.md#process)
* [processArray](jsonldhypermediaprocessor.md#processarray)
* [processHypermedia](jsonldhypermediaprocessor.md#processhypermedia)
* [processResource](jsonldhypermediaprocessor.md#processresource)
* [setupProperty](jsonldhypermediaprocessor.md#setupproperty)
* [supports](jsonldhypermediaprocessor.md#supports)
* [tryRemoveReferenceFrom](jsonldhypermediaprocessor.md#tryremovereferencefrom)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new JsonLdHypermediaProcessor**(indirectTypingProvider: *[IIndirectTypingProvider](../interfaces/iindirecttypingprovider.md)*, httpCall: *[HttpCallFacility](../#httpcallfacility)*, graphTransformer: *[IGraphTransformer](../interfaces/igraphtransformer.md)*): [JsonLdHypermediaProcessor](jsonldhypermediaprocessor.md)

*Defined in [JsonLd/JsonLdHypermediaProcessor.ts:61](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/JsonLdHypermediaProcessor.ts#L61)*

Initializes a new instance of the [JsonLdHypermediaProcessor](jsonldhypermediaprocessor.md) class.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| indirectTypingProvider | [IIndirectTypingProvider](../interfaces/iindirecttypingprovider.md) |  Facility providing information whether given resources are of given type. |
| httpCall | [HttpCallFacility](../#httpcallfacility) |  HTTP facility used to call remote server. |
| graphTransformer | [IGraphTransformer](../interfaces/igraphtransformer.md) |  Graph transformation facility. |

**Returns:** [JsonLdHypermediaProcessor](jsonldhypermediaprocessor.md)

___

## Properties

<a id="graphtransformer"></a>

### `<Private>` graphTransformer

**● graphTransformer**: *[IGraphTransformer](../interfaces/igraphtransformer.md)*

*Defined in [JsonLd/JsonLdHypermediaProcessor.ts:61](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/JsonLdHypermediaProcessor.ts#L61)*

___
<a id="httpcall"></a>

### `<Private>` httpCall

**● httpCall**: *[HttpCallFacility](../#httpcallfacility)*

*Defined in [JsonLd/JsonLdHypermediaProcessor.ts:60](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/JsonLdHypermediaProcessor.ts#L60)*

___
<a id="indirecttypingprovider"></a>

### `<Private>` indirectTypingProvider

**● indirectTypingProvider**: *[IIndirectTypingProvider](../interfaces/iindirecttypingprovider.md)*

*Defined in [JsonLd/JsonLdHypermediaProcessor.ts:59](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/JsonLdHypermediaProcessor.ts#L59)*

___
<a id="exactmatchcases"></a>

### `<Static>``<Private>` exactMatchCases

**● exactMatchCases**: *[HeaderMatcher](../#headermatcher)[][]* =  [
    [(headers: Headers) => headers.get("Content-Type").indexOf(JsonLdHypermediaProcessor.jsonLd) !== -1],
    [
      (headers: Headers) => headers.get("Content-Type").indexOf(JsonLdHypermediaProcessor.json) !== -1,
      (headers: Headers) => {
        const links = parseLinkHeader(headers.get("Link"));
        return !!links[jsonLdContext] && links[jsonLdContext].type === JsonLdHypermediaProcessor.jsonLd;
      }
    ]
  ]

*Defined in [JsonLd/JsonLdHypermediaProcessor.ts:48](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/JsonLdHypermediaProcessor.ts#L48)*

___
<a id="json"></a>

### `<Static>``<Private>` json

**● json**: *`string`* = "application/json"

*Defined in [JsonLd/JsonLdHypermediaProcessor.ts:44](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/JsonLdHypermediaProcessor.ts#L44)*

___
<a id="jsonld"></a>

### `<Static>``<Private>` jsonLd

**● jsonLd**: *`string`* = "application/ld+json"

*Defined in [JsonLd/JsonLdHypermediaProcessor.ts:45](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/JsonLdHypermediaProcessor.ts#L45)*

___
<a id="mediatypes"></a>

### `<Static>``<Private>` mediaTypes

**● mediaTypes**: *`string`[]* =  [JsonLdHypermediaProcessor.jsonLd, JsonLdHypermediaProcessor.json]

*Defined in [JsonLd/JsonLdHypermediaProcessor.ts:46](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/JsonLdHypermediaProcessor.ts#L46)*

___

## Accessors

<a id="supportedmediatypes"></a>

###  supportedMediaTypes

**get supportedMediaTypes**(): `Iterable`<`string`>

*Defined in [JsonLd/JsonLdHypermediaProcessor.ts:81](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/JsonLdHypermediaProcessor.ts#L81)*

Gets supported media types.

*__inheritdoc__*: 

**Returns:** `Iterable`<`string`>

___

## Methods

<a id="ensurejsonld"></a>

### `<Private>` ensureJsonLd

▸ **ensureJsonLd**(response: *`Response`*): `Promise`<`any`>

*Defined in [JsonLd/JsonLdHypermediaProcessor.ts:152](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/JsonLdHypermediaProcessor.ts#L152)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| response | `Response` |

**Returns:** `Promise`<`any`>

___
<a id="gatherpropertyvalues"></a>

### `<Private>` gatherPropertyValues

▸ **gatherPropertyValues**(processingState: *[ProcessingState](processingstate.md)*, predicate: *`string`*): `Promise`<`any`[]>

*Defined in [JsonLd/JsonLdHypermediaProcessor.ts:213](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/JsonLdHypermediaProcessor.ts#L213)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| processingState | [ProcessingState](processingstate.md) |
| predicate | `string` |

**Returns:** `Promise`<`any`[]>

___
<a id="isvalidpredicate"></a>

### `<Private>` isValidPredicate

▸ **isValidPredicate**(processingState: *[ProcessingState](processingstate.md)*, predicate: *`string`*): `Promise`<`boolean`>

*Defined in [JsonLd/JsonLdHypermediaProcessor.ts:183](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/JsonLdHypermediaProcessor.ts#L183)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| processingState | [ProcessingState](processingstate.md) |
| predicate | `string` |

**Returns:** `Promise`<`boolean`>

___
<a id="process"></a>

###  process

▸ **process**(response: *`Response`*, client: *[IHydraClient](../interfaces/ihydraclient.md)*, options?: *[IHypermediaProcessingOptions](../interfaces/ihypermediaprocessingoptions.md)*): `Promise`<[IWebResource](../interfaces/iwebresource.md)>

*Implementation of [IHypermediaProcessor](../interfaces/ihypermediaprocessor.md).[process](../interfaces/ihypermediaprocessor.md#process)*

*Defined in [JsonLd/JsonLdHypermediaProcessor.ts:105](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/JsonLdHypermediaProcessor.ts#L105)*

Parses a given raw response.

**Parameters:**

| Name | Type |
| ------ | ------ |
| response | `Response` |
| client | [IHydraClient](../interfaces/ihydraclient.md) |
| `Optional` options | [IHypermediaProcessingOptions](../interfaces/ihypermediaprocessingoptions.md) |

**Returns:** `Promise`<[IWebResource](../interfaces/iwebresource.md)>

___
<a id="processarray"></a>

### `<Private>` processArray

▸ **processArray**(processingState: *[ProcessingState](processingstate.md)*): `Promise`<[ProcessingState](processingstate.md)>

*Defined in [JsonLd/JsonLdHypermediaProcessor.ts:173](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/JsonLdHypermediaProcessor.ts#L173)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| processingState | [ProcessingState](processingstate.md) |

**Returns:** `Promise`<[ProcessingState](processingstate.md)>

___
<a id="processhypermedia"></a>

### `<Private>` processHypermedia

▸ **processHypermedia**(processingState: *[ProcessingState](processingstate.md)*): `Promise`<[ProcessingState](processingstate.md)>

*Defined in [JsonLd/JsonLdHypermediaProcessor.ts:164](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/JsonLdHypermediaProcessor.ts#L164)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| processingState | [ProcessingState](processingstate.md) |

**Returns:** `Promise`<[ProcessingState](processingstate.md)>

___
<a id="processresource"></a>

### `<Private>` processResource

▸ **processResource**(processingState: *[ProcessingState](processingstate.md)*, isOwnedHypermedia?: *`boolean`*): `Promise`<`object`>

*Defined in [JsonLd/JsonLdHypermediaProcessor.ts:198](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/JsonLdHypermediaProcessor.ts#L198)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| processingState | [ProcessingState](processingstate.md) | - |
| `Default value` isOwnedHypermedia | `boolean` | false |

**Returns:** `Promise`<`object`>

___
<a id="setupproperty"></a>

### `<Private>` setupProperty

▸ **setupProperty**(resource: *`object`*, processingState: *[ProcessingState](processingstate.md)*, predicate: *`string`*): `Promise`<`void`>

*Defined in [JsonLd/JsonLdHypermediaProcessor.ts:241](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/JsonLdHypermediaProcessor.ts#L241)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| resource | `object` |
| processingState | [ProcessingState](processingstate.md) |
| predicate | `string` |

**Returns:** `Promise`<`void`>

___
<a id="supports"></a>

###  supports

▸ **supports**(response: *`Response`*): [Level](../enums/level.md)

*Implementation of [IHypermediaProcessor](../interfaces/ihypermediaprocessor.md).[supports](../interfaces/ihypermediaprocessor.md#supports)*

*Defined in [JsonLd/JsonLdHypermediaProcessor.ts:86](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/JsonLdHypermediaProcessor.ts#L86)*

Determines level of support of a this [IHypermediaProcessor](../interfaces/ihypermediaprocessor.md) for given response.

**Parameters:**

| Name | Type |
| ------ | ------ |
| response | `Response` |

**Returns:** [Level](../enums/level.md)

___
<a id="tryremovereferencefrom"></a>

### `<Static>``<Private>` tryRemoveReferenceFrom

▸ **tryRemoveReferenceFrom**(graph: *`object`[]*, index: *`number`*): `boolean`

*Defined in [JsonLd/JsonLdHypermediaProcessor.ts:142](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/JsonLdHypermediaProcessor.ts#L142)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| graph | `object`[] |
| index | `number` |

**Returns:** `boolean`

___

