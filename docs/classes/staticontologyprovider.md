[@hydra-cg/heracles.ts](../README.md) > [StaticOntologyProvider](../classes/staticontologyprovider.md)

# Class: StaticOntologyProvider

Provides a simple implementation of the RDF predicate range-domain provider that uses statically provided ontology.

## Hierarchy

**StaticOntologyProvider**

## Implements

* [IOntologyProvider](../interfaces/iontologyprovider.md)

## Index

### Constructors

* [constructor](staticontologyprovider.md#constructor)

### Properties

* [jsonLdOntology](staticontologyprovider.md#jsonldontology)
* [ontology](staticontologyprovider.md#ontology)

### Methods

* [ensureInitialized](staticontologyprovider.md#ensureinitialized)
* [getDomainFor](staticontologyprovider.md#getdomainfor)
* [getRangeFor](staticontologyprovider.md#getrangefor)
* [getValueOf](staticontologyprovider.md#getvalueof)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new StaticOntologyProvider**(ontology: *`object`*): [StaticOntologyProvider](staticontologyprovider.md)

*Defined in [JsonLd/StaticOntologyProvider.ts:11](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/StaticOntologyProvider.ts#L11)*

Initializes a new instance of the [StaticOntologyProvider](staticontologyprovider.md) class.

**Parameters:**

| Name | Type |
| ------ | ------ |
| ontology | `object` |

**Returns:** [StaticOntologyProvider](staticontologyprovider.md)

___

## Properties

<a id="jsonldontology"></a>

### `<Private>` jsonLdOntology

**● jsonLdOntology**: *`object`*

*Defined in [JsonLd/StaticOntologyProvider.ts:10](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/StaticOntologyProvider.ts#L10)*

___
<a id="ontology"></a>

### `<Private>` ontology

**● ontology**: *[IDictionary](../interfaces/idictionary.md)<`any`>*

*Defined in [JsonLd/StaticOntologyProvider.ts:11](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/StaticOntologyProvider.ts#L11)*

___

## Methods

<a id="ensureinitialized"></a>

### `<Private>` ensureInitialized

▸ **ensureInitialized**(): `Promise`<`void`>

*Defined in [JsonLd/StaticOntologyProvider.ts:32](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/StaticOntologyProvider.ts#L32)*

**Returns:** `Promise`<`void`>

___
<a id="getdomainfor"></a>

###  getDomainFor

▸ **getDomainFor**(predicate: *`string`*): `Promise`<`string`>

*Implementation of [IOntologyProvider](../interfaces/iontologyprovider.md).[getDomainFor](../interfaces/iontologyprovider.md#getdomainfor)*

*Defined in [JsonLd/StaticOntologyProvider.ts:23](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/StaticOntologyProvider.ts#L23)*

Gets the domain for a given property if defined; otherwise null;

**Parameters:**

| Name | Type |
| ------ | ------ |
| predicate | `string` |

**Returns:** `Promise`<`string`>

___
<a id="getrangefor"></a>

###  getRangeFor

▸ **getRangeFor**(predicate: *`string`*): `Promise`<`string`>

*Implementation of [IOntologyProvider](../interfaces/iontologyprovider.md).[getRangeFor](../interfaces/iontologyprovider.md#getrangefor)*

*Defined in [JsonLd/StaticOntologyProvider.ts:28](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/StaticOntologyProvider.ts#L28)*

Gets the range for a given property if defined; otherwise null;

**Parameters:**

| Name | Type |
| ------ | ------ |
| predicate | `string` |

**Returns:** `Promise`<`string`>

___
<a id="getvalueof"></a>

### `<Private>` getValueOf

▸ **getValueOf**(iri: *`string`*, predicate: *`string`*): `Promise`<`string`>

*Defined in [JsonLd/StaticOntologyProvider.ts:44](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/StaticOntologyProvider.ts#L44)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| iri | `string` |
| predicate | `string` |

**Returns:** `Promise`<`string`>

___

