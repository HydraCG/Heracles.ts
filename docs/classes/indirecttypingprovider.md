[@hydra-cg/heracles.ts](../README.md) > [IndirectTypingProvider](../classes/indirecttypingprovider.md)

# Class: IndirectTypingProvider

Provides a logic checking type of RDF resources.

## Hierarchy

**IndirectTypingProvider**

## Implements

* [IIndirectTypingProvider](../interfaces/iindirecttypingprovider.md)

## Index

### Constructors

* [constructor](indirecttypingprovider.md#constructor)

### Properties

* [ontologyProvider](indirecttypingprovider.md#ontologyprovider)

### Methods

* [isInDomainOfPredicate](indirecttypingprovider.md#isindomainofpredicate)
* [isInRangeOfPredicate](indirecttypingprovider.md#isinrangeofpredicate)
* [isOfClass](indirecttypingprovider.md#isofclass)
* [isOfType](indirecttypingprovider.md#isoftype)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new IndirectTypingProvider**(ontologyProvider: *[IOntologyProvider](../interfaces/iontologyprovider.md)*): [IndirectTypingProvider](indirecttypingprovider.md)

*Defined in [JsonLd/IndirectTypingProvider.ts:10](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/IndirectTypingProvider.ts#L10)*

Initializes a new instance of the [IndirectTypingProvider](indirecttypingprovider.md) class.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| ontologyProvider | [IOntologyProvider](../interfaces/iontologyprovider.md) |  Provider of predicate range-domain details. |

**Returns:** [IndirectTypingProvider](indirecttypingprovider.md)

___

## Properties

<a id="ontologyprovider"></a>

### `<Private>` ontologyProvider

**● ontologyProvider**: *[IOntologyProvider](../interfaces/iontologyprovider.md)*

*Defined in [JsonLd/IndirectTypingProvider.ts:10](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/IndirectTypingProvider.ts#L10)*

___

## Methods

<a id="isindomainofpredicate"></a>

### `<Private>` isInDomainOfPredicate

▸ **isInDomainOfPredicate**(expectedType: *`string`*, processingState: *[ProcessingState](processingstate.md)*): `Promise`<`boolean`>

*Defined in [JsonLd/IndirectTypingProvider.ts:41](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/IndirectTypingProvider.ts#L41)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| expectedType | `string` |
| processingState | [ProcessingState](processingstate.md) |

**Returns:** `Promise`<`boolean`>

___
<a id="isinrangeofpredicate"></a>

### `<Private>` isInRangeOfPredicate

▸ **isInRangeOfPredicate**(expectedType: *`string`*, processingState: *[ProcessingState](processingstate.md)*): `Promise`<`boolean`>

*Defined in [JsonLd/IndirectTypingProvider.ts:52](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/IndirectTypingProvider.ts#L52)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| expectedType | `string` |
| processingState | [ProcessingState](processingstate.md) |

**Returns:** `Promise`<`boolean`>

___
<a id="isofclass"></a>

### `<Private>` isOfClass

▸ **isOfClass**(expectedType: *`string`*, processingState: *[ProcessingState](processingstate.md)*): `boolean`

*Defined in [JsonLd/IndirectTypingProvider.ts:34](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/IndirectTypingProvider.ts#L34)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| expectedType | `string` |
| processingState | [ProcessingState](processingstate.md) |

**Returns:** `boolean`

___
<a id="isoftype"></a>

###  isOfType

▸ **isOfType**(expectedType: *`string`*, processingState: *[ProcessingState](processingstate.md)*): `Promise`<`boolean`>

*Implementation of [IIndirectTypingProvider](../interfaces/iindirecttypingprovider.md).[isOfType](../interfaces/iindirecttypingprovider.md#isoftype)*

*Defined in [JsonLd/IndirectTypingProvider.ts:26](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/IndirectTypingProvider.ts#L26)*

Checks whether a currently processed resource within a given processing state is of a given type.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| expectedType | `string` |  Type to check against. |
| processingState | [ProcessingState](processingstate.md) |  Current JSON-LD processing state. |

**Returns:** `Promise`<`boolean`>

___

