[@hydra-cg/heracles.ts](../README.md) > [IOntologyProvider](../interfaces/iontologyprovider.md)

# Interface: IOntologyProvider

Provides an abstraction over ontology.

*__interface__*: 

## Hierarchy

**IOntologyProvider**

## Implemented by

* [StaticOntologyProvider](../classes/staticontologyprovider.md)

## Index

### Methods

* [getDomainFor](iontologyprovider.md#getdomainfor)
* [getRangeFor](iontologyprovider.md#getrangefor)

---

## Methods

<a id="getdomainfor"></a>

###  getDomainFor

▸ **getDomainFor**(predicate: *`string`*): `Promise`<`string`>

*Defined in [JsonLd/IOntologyProvider.ts:11](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/IOntologyProvider.ts#L11)*

Gets the domain for a given property if defined; otherwise null;

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| predicate | `string` |  IRI of the predicate for which to obtain a domain. |

**Returns:** `Promise`<`string`>

___
<a id="getrangefor"></a>

###  getRangeFor

▸ **getRangeFor**(predicate: *`string`*): `Promise`<`string`>

*Defined in [JsonLd/IOntologyProvider.ts:18](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/IOntologyProvider.ts#L18)*

Gets the range for a given property if defined; otherwise null;

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| predicate | `string` |  IRI of the predicate for which to obtain a range. |

**Returns:** `Promise`<`string`>

___

