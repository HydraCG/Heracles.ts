[@hydra-cg/heracles.ts](../README.md) > [FlatteningGraphTransformer](../classes/flatteninggraphtransformer.md)

# Class: FlatteningGraphTransformer

Flattens a given graph.

## Hierarchy

**FlatteningGraphTransformer**

## Implements

* [IGraphTransformer](../interfaces/igraphtransformer.md)

## Index

### Methods

* [transform](flatteninggraphtransformer.md#transform)

---

## Methods

<a id="transform"></a>

###  transform

▸ **transform**(graph: *`object`[]*, processor: *[IHypermediaProcessor](../interfaces/ihypermediaprocessor.md)*, options?: *[IHypermediaProcessingOptions](../interfaces/ihypermediaprocessingoptions.md)*): `Promise`<`object`[]>

*Implementation of [IGraphTransformer](../interfaces/igraphtransformer.md).[transform](../interfaces/igraphtransformer.md#transform)*

*Defined in [JsonLd/GraphTransformations/FlatteningGraphTransformer.ts:10](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/GraphTransformations/FlatteningGraphTransformer.ts#L10)*

Tranforms a given graph.

**Parameters:**

| Name | Type |
| ------ | ------ |
| graph | `object`[] |
| processor | [IHypermediaProcessor](../interfaces/ihypermediaprocessor.md) |
| `Optional` options | [IHypermediaProcessingOptions](../interfaces/ihypermediaprocessingoptions.md) |

**Returns:** `Promise`<`object`[]>

___

