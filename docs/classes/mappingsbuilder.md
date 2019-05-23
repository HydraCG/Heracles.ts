[@hydra-cg/heracles.ts](../README.md) > [MappingsBuilder](../classes/mappingsbuilder.md)

# Class: MappingsBuilder

Provides a builder for [IIriTemplate](../interfaces/iiritemplate.md) variable mapping values.

## Hierarchy

**MappingsBuilder**

## Index

### Constructors

* [constructor](mappingsbuilder.md#constructor)

### Properties

* [mappings](mappingsbuilder.md#mappings)
* [result](mappingsbuilder.md#result)

### Accessors

* [variableMappings](mappingsbuilder.md#variablemappings)

### Methods

* [complete](mappingsbuilder.md#complete)
* [withProperty](mappingsbuilder.md#withproperty)
* [withVariable](mappingsbuilder.md#withvariable)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new MappingsBuilder**(mappings: *[MappingsCollection](mappingscollection.md)*): [MappingsBuilder](mappingsbuilder.md)

*Defined in [DataModel/MappingsBuilder.ts:23](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/MappingsBuilder.ts#L23)*

Initializes a new instance of the [MappingBuilder](../#mappingbuilder) class.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| mappings | [MappingsCollection](mappingscollection.md) |  IRI template variable mappings collection. |

**Returns:** [MappingsBuilder](mappingsbuilder.md)

___

## Properties

<a id="mappings"></a>

### `<Private>` mappings

**● mappings**: *[MappingsCollection](mappingscollection.md)*

*Defined in [DataModel/MappingsBuilder.ts:9](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/MappingsBuilder.ts#L9)*

___
<a id="result"></a>

### `<Private>` result

**● result**: *[IDictionary](../interfaces/idictionary.md)<`string`>*

*Defined in [DataModel/MappingsBuilder.ts:10](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/MappingsBuilder.ts#L10)*

___

## Accessors

<a id="variablemappings"></a>

###  variableMappings

**get variableMappings**(): [IDictionary](../interfaces/idictionary.md)<`string`>

*Defined in [DataModel/MappingsBuilder.ts:16](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/MappingsBuilder.ts#L16)*

Gets variable mappings in form of variable name - property IRI pairs.

**Returns:** [IDictionary](../interfaces/idictionary.md)<`string`>

___

## Methods

<a id="complete"></a>

###  complete

▸ **complete**(): [IDictionary](../interfaces/idictionary.md)<`string`>

*Defined in [DataModel/MappingsBuilder.ts:66](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/MappingsBuilder.ts#L66)*

Completes the variable values mappings in form of variable name - serialized value pairs.

**Returns:** [IDictionary](../interfaces/idictionary.md)<`string`>

___
<a id="withproperty"></a>

###  withProperty

▸ **withProperty**(property: *`string`*): [PropertyMapping](propertymapping.md)

*Defined in [DataModel/MappingsBuilder.ts:39](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/MappingsBuilder.ts#L39)*

Allows to add an IRI property value.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| property | `string` |  IRI of the property to be filled with value. |

**Returns:** [PropertyMapping](propertymapping.md)

___
<a id="withvariable"></a>

###  withVariable

▸ **withVariable**(variableName: *`string`*): [PropertyMapping](propertymapping.md)

*Defined in [DataModel/MappingsBuilder.ts:53](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/MappingsBuilder.ts#L53)*

Allows to add a direct variable value.

**Parameters:**

| Name | Type |
| ------ | ------ |
| variableName | `string` |

**Returns:** [PropertyMapping](propertymapping.md)

___

