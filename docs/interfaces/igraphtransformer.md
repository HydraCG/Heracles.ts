[@hydra-cg/heracles.ts](../README.md) > [IGraphTransformer](../interfaces/igraphtransformer.md)

# Interface: IGraphTransformer

Describes an abstract graph transforming facility.

*__interface__*: 

## Hierarchy

**IGraphTransformer**

## Implemented by

* [CompoundGraphTransformer](../classes/compoundgraphtransformer.md)
* [EntryPointCorrectingGraphTransformer](../classes/entrypointcorrectinggraphtransformer.md)
* [FlatteningGraphTransformer](../classes/flatteninggraphtransformer.md)

## Index

### Methods

* [transform](igraphtransformer.md#transform)

---

## Methods

<a id="transform"></a>

###  transform

▸ **transform**(graph: *`object`[]*, processor: *[IHypermediaProcessor](ihypermediaprocessor.md)*, options?: *[IHypermediaProcessingOptions](ihypermediaprocessingoptions.md)*): `Promise`<`object`[]>

*Defined in [JsonLd/GraphTransformations/IGraphTransformer.ts:16](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/GraphTransformations/IGraphTransformer.ts#L16)*

Tranforms a given graph.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| graph | `object`[] |  Graph to be transformed. |
| processor | [IHypermediaProcessor](ihypermediaprocessor.md) |  Hypermedia processor requesting a graph transformation. |
| `Optional` options | [IHypermediaProcessingOptions](ihypermediaprocessingoptions.md) |  Additional processing options. |

**Returns:** `Promise`<`object`[]>

___

