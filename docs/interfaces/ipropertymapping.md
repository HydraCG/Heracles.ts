[@hydra-cg/heracles.ts](../README.md) > [IPropertyMapping](../interfaces/ipropertymapping.md)

# Interface: IPropertyMapping

Describes a simple RDF mapping in Heracles' data model.

*__interface__*: 

## Hierarchy

**IPropertyMapping**

## Index

### Properties

* [default](ipropertymapping.md#default)
* [propertyName](ipropertymapping.md#propertyname)
* [required](ipropertymapping.md#required)
* [type](ipropertymapping.md#type)

---

## Properties

<a id="default"></a>

### `<Optional>` default

**● default**: *[Literal](../#literal) \| [MappingsProcessor](../#mappingsprocessor)*

*Defined in [JsonLd/IPropertyMapping.ts:37](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/IPropertyMapping.ts#L37)*

Gets the either default literal value or a factory method to be used for this property.

*__readonly__*: 

*__returns__*: 

___
<a id="propertyname"></a>

###  propertyName

**● propertyName**: *`string`*

*Defined in [JsonLd/IPropertyMapping.ts:16](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/IPropertyMapping.ts#L16)*

Gets the property name.

*__readonly__*: 

*__returns__*: 

___
<a id="required"></a>

### `<Optional>` required

**● required**: *`boolean`*

*Defined in [JsonLd/IPropertyMapping.ts:30](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/IPropertyMapping.ts#L30)*

Gets a value indicating whether the property is required and needs to be created anyway.

*__readonly__*: 

*__returns__*: 

___
<a id="type"></a>

### `<Optional>` type

**● type**: *`string`[]*

*Defined in [JsonLd/IPropertyMapping.ts:23](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/IPropertyMapping.ts#L23)*

Gets the type of the resource that this property is valid for.

*__readonly__*: 

*__returns__*: 

___

