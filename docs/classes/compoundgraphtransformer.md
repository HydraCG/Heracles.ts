[@hydra-cg/heracles.ts](../README.md) > [CompoundGraphTransformer](../classes/compoundgraphtransformer.md)

# Class: CompoundGraphTransformer

Provides a collective wrapper over multiple [IGraphTransformer](../interfaces/igraphtransformer.md)s.

## Hierarchy

**CompoundGraphTransformer**

## Implements

* [IGraphTransformer](../interfaces/igraphtransformer.md)

## Index

### Constructors

* [constructor](compoundgraphtransformer.md#constructor)

### Properties

* [graphTransformers](compoundgraphtransformer.md#graphtransformers)

### Methods

* [transform](compoundgraphtransformer.md#transform)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new CompoundGraphTransformer**(...graphTransformers: *[IGraphTransformer](../interfaces/igraphtransformer.md)[]*): [CompoundGraphTransformer](compoundgraphtransformer.md)

*Defined in [JsonLd/GraphTransformations/CompoundGraphTransformer.ts:9](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/GraphTransformations/CompoundGraphTransformer.ts#L9)*

Initializes a new instance of the [CompoundGraphTransformer](compoundgraphtransformer.md) class.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Rest` graphTransformers | [IGraphTransformer](../interfaces/igraphtransformer.md)[] |  Other graph transforming facilities to use. |

**Returns:** [CompoundGraphTransformer](compoundgraphtransformer.md)

___

## Properties

<a id="graphtransformers"></a>

### `<Private>` graphTransformers

**● graphTransformers**: *`Iterable`<[IGraphTransformer](../interfaces/igraphtransformer.md)>*

*Defined in [JsonLd/GraphTransformations/CompoundGraphTransformer.ts:9](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/GraphTransformations/CompoundGraphTransformer.ts#L9)*

___

## Methods

<a id="transform"></a>

###  transform

▸ **transform**(graph: *`object`[]*, processor: *[IHypermediaProcessor](../interfaces/ihypermediaprocessor.md)*, options?: *[IHypermediaProcessingOptions](../interfaces/ihypermediaprocessingoptions.md)*): `Promise`<`object`[]>

*Implementation of [IGraphTransformer](../interfaces/igraphtransformer.md).[transform](../interfaces/igraphtransformer.md#transform)*

*Defined in [JsonLd/GraphTransformations/CompoundGraphTransformer.ts:20](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/GraphTransformations/CompoundGraphTransformer.ts#L20)*

Tranforms a given graph.

**Parameters:**

| Name | Type |
| ------ | ------ |
| graph | `object`[] |
| processor | [IHypermediaProcessor](../interfaces/ihypermediaprocessor.md) |
| `Optional` options | [IHypermediaProcessingOptions](../interfaces/ihypermediaprocessingoptions.md) |

**Returns:** `Promise`<`object`[]>

___

