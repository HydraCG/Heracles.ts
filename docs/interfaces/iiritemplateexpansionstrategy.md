[@hydra-cg/heracles.ts](../README.md) > [IIriTemplateExpansionStrategy](../interfaces/iiritemplateexpansionstrategy.md)

# Interface: IIriTemplateExpansionStrategy

Describes a strategy of [IOperation](ioperation.md) and [IIriTemplate](iiritemplate.md) expansion.

*__interface__*: 

## Hierarchy

**IIriTemplateExpansionStrategy**

## Implemented by

* [BodyResourceBoundIriTemplateExpansionStrategy](../classes/bodyresourceboundiritemplateexpansionstrategy.md)

## Index

### Methods

* [createRequest](iiritemplateexpansionstrategy.md#createrequest)

---

## Methods

<a id="createrequest"></a>

###  createRequest

▸ **createRequest**(operation: *[IOperation](ioperation.md)*, body?: *[IResource](iresource.md)*, auxResource?: *`any`*): [IOperation](ioperation.md)

*Defined in [IIriTemplateExpansionStrategy.ts:16](https://github.com/alien-mcl/Heracles.ts/blob/master/src/IIriTemplateExpansionStrategy.ts#L16)*

Creates a fully invocable [IOperation](ioperation.md) taking into account possible IRI template used by the input operation.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| operation | [IOperation](ioperation.md) |  Source operation describing the request. |
| `Optional` body | [IResource](iresource.md) |  Optional resource to be placed in the body of the request. |
| `Optional` auxResource | `any` |

**Returns:** [IOperation](ioperation.md)

___

