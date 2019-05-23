[@hydra-cg/heracles.ts](../README.md) > [BodyResourceBoundIriTemplateExpansionStrategy](../classes/bodyresourceboundiritemplateexpansionstrategy.md)

# Class: BodyResourceBoundIriTemplateExpansionStrategy

Provides a simple implementation of the [IIriTemplateExpansionStrategy](../interfaces/iiritemplateexpansionstrategy.md) interface where an input resource is used to fill the possible [IIriTemplate](../interfaces/iiritemplate.md) with values.

## Hierarchy

**BodyResourceBoundIriTemplateExpansionStrategy**

## Implements

* [IIriTemplateExpansionStrategy](../interfaces/iiritemplateexpansionstrategy.md)

## Index

### Methods

* [createRequest](bodyresourceboundiritemplateexpansionstrategy.md#createrequest)
* [withResourceVariables](bodyresourceboundiritemplateexpansionstrategy.md#withresourcevariables)

---

## Methods

<a id="createrequest"></a>

###  createRequest

▸ **createRequest**(operation: *[IOperation](../interfaces/ioperation.md)*, body?: *[IResource](../interfaces/iresource.md)*, auxResource?: *`any`*): [IOperation](../interfaces/ioperation.md)

*Implementation of [IIriTemplateExpansionStrategy](../interfaces/iiritemplateexpansionstrategy.md).[createRequest](../interfaces/iiritemplateexpansionstrategy.md#createrequest)*

*Defined in [BodyResourceBoundIriTemplateExpansionStrategy.ts:13](https://github.com/alien-mcl/Heracles.ts/blob/master/src/BodyResourceBoundIriTemplateExpansionStrategy.ts#L13)*

Creates a fully invocable [IOperation](../interfaces/ioperation.md) taking into account possible IRI template used by the input operation.

**Parameters:**

| Name | Type |
| ------ | ------ |
| operation | [IOperation](../interfaces/ioperation.md) |
| `Optional` body | [IResource](../interfaces/iresource.md) |
| `Optional` auxResource | `any` |

**Returns:** [IOperation](../interfaces/ioperation.md)

___
<a id="withresourcevariables"></a>

### `<Private>` withResourceVariables

▸ **withResourceVariables**(builder: *[MappingsBuilder](mappingsbuilder.md)*, body: *`object`*, auxResource: *`object`*): `void`

*Defined in [BodyResourceBoundIriTemplateExpansionStrategy.ts:24](https://github.com/alien-mcl/Heracles.ts/blob/master/src/BodyResourceBoundIriTemplateExpansionStrategy.ts#L24)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| builder | [MappingsBuilder](mappingsbuilder.md) |
| body | `object` |
| auxResource | `object` |

**Returns:** `void`

___

