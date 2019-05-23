[@hydra-cg/heracles.ts](../README.md) > [IIndirectTypingProvider](../interfaces/iindirecttypingprovider.md)

# Interface: IIndirectTypingProvider

Describes an abstract facility used for RDF-like type entailing.

*__interface__*: 

## Hierarchy

**IIndirectTypingProvider**

## Implemented by

* [IndirectTypingProvider](../classes/indirecttypingprovider.md)

## Index

### Methods

* [isOfType](iindirecttypingprovider.md#isoftype)

---

## Methods

<a id="isoftype"></a>

###  isOfType

▸ **isOfType**(expectedType: *`string`*, processingState: *[ProcessingState](../classes/processingstate.md)*): `Promise`<`boolean`>

*Defined in [JsonLd/IIndirectTypingProvider.ts:14](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/IIndirectTypingProvider.ts#L14)*

Checks whether a currently processed resource within a given processing state is of a given type.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| expectedType | `string` |  Type to check against. |
| processingState | [ProcessingState](../classes/processingstate.md) |  Current JSON-LD processing state. |

**Returns:** `Promise`<`boolean`>

___

