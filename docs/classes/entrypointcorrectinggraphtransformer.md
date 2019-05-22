[@hydra-cg/heracles.ts](../README.md) > [EntryPointCorrectingGraphTransformer](../classes/entrypointcorrectinggraphtransformer.md)

# Class: EntryPointCorrectingGraphTransformer

Tries to correct missing entry point in hydra:ApiDocumentation resource.

## Hierarchy

**EntryPointCorrectingGraphTransformer**

## Implements

* [IGraphTransformer](../interfaces/igraphtransformer.md)

## Index

### Methods

* [transform](entrypointcorrectinggraphtransformer.md#transform)

---

## Methods

<a id="transform"></a>

###  transform

▸ **transform**(graph: *`object`[]*, processor: *[IHypermediaProcessor](../interfaces/ihypermediaprocessor.md)*, options?: *[IHypermediaProcessingOptions](../interfaces/ihypermediaprocessingoptions.md)*): `Promise`<`object`[]>

*Implementation of [IGraphTransformer](../interfaces/igraphtransformer.md).[transform](../interfaces/igraphtransformer.md#transform)*

*Defined in [JsonLd/GraphTransformations/EntryPointCorrectingGraphTransformer.ts:11](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/GraphTransformations/EntryPointCorrectingGraphTransformer.ts#L11)*

Tranforms a given graph.

**Parameters:**

| Name | Type |
| ------ | ------ |
| graph | `object`[] |
| processor | [IHypermediaProcessor](../interfaces/ihypermediaprocessor.md) |
| `Optional` options | [IHypermediaProcessingOptions](../interfaces/ihypermediaprocessingoptions.md) |

**Returns:** `Promise`<`object`[]>

___

