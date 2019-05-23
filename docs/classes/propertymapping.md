[@hydra-cg/heracles.ts](../README.md) > [PropertyMapping](../classes/propertymapping.md)

# Class: PropertyMapping

## Hierarchy

**PropertyMapping**

## Index

### Constructors

* [constructor](propertymapping.md#constructor)

### Properties

* [builder](propertymapping.md#builder)
* [mapping](propertymapping.md#mapping)
* [result](propertymapping.md#result)

### Methods

* [havingValueOf](propertymapping.md#havingvalueof)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new PropertyMapping**(builder: *[MappingsBuilder](mappingsbuilder.md)*, result: *[IDictionary](../interfaces/idictionary.md)<`string`>*, mapping: *[IIriTemplateMapping](../interfaces/iiritemplatemapping.md)*): [PropertyMapping](propertymapping.md)

*Defined in [DataModel/PropertyMapping.ts:8](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/PropertyMapping.ts#L8)*

Initializes a new instance of the [PropertyMapping](propertymapping.md) class.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| builder | [MappingsBuilder](mappingsbuilder.md) |  Mappings builder. |
| result | [IDictionary](../interfaces/idictionary.md)<`string`> |  Current property mappings. |
| mapping | [IIriTemplateMapping](../interfaces/iiritemplatemapping.md) |  IRI template mapping. |

**Returns:** [PropertyMapping](propertymapping.md)

___

## Properties

<a id="builder"></a>

### `<Private>` builder

**● builder**: *[MappingsBuilder](mappingsbuilder.md)*

*Defined in [DataModel/PropertyMapping.ts:6](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/PropertyMapping.ts#L6)*

___
<a id="mapping"></a>

### `<Private>` mapping

**● mapping**: *[IIriTemplateMapping](../interfaces/iiritemplatemapping.md)*

*Defined in [DataModel/PropertyMapping.ts:8](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/PropertyMapping.ts#L8)*

___
<a id="result"></a>

### `<Private>` result

**● result**: *[IDictionary](../interfaces/idictionary.md)<`string`>*

*Defined in [DataModel/PropertyMapping.ts:7](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/PropertyMapping.ts#L7)*

___

## Methods

<a id="havingvalueof"></a>

###  havingValueOf

▸ **havingValueOf**(value: *`string`*): [MappingsBuilder](mappingsbuilder.md)

*Defined in [DataModel/PropertyMapping.ts:27](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/PropertyMapping.ts#L27)*

Allows to map a value to a variable mapping.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| value | `string` |  Value to be used. |

**Returns:** [MappingsBuilder](mappingsbuilder.md)

___

