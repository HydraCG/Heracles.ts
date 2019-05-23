[@hydra-cg/heracles.ts](../README.md) > [ISupportedProperty](../interfaces/isupportedproperty.md)

# Interface: ISupportedProperty

Describes an abstract Hydra property.

*__interface__*: 

## Hierarchy

 [IResource](iresource.md)

**↳ ISupportedProperty**

## Index

### Properties

* [iri](isupportedproperty.md#iri)
* [property](isupportedproperty.md#property)
* [readable](isupportedproperty.md#readable)
* [required](isupportedproperty.md#required)
* [type](isupportedproperty.md#type)
* [writable](isupportedproperty.md#writable)

---

## Properties

<a id="iri"></a>

###  iri

**● iri**: *`string`*

*Inherited from [IResource](iresource.md).[iri](iresource.md#iri)*

*Defined in [DataModel/IResource.ts:13](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IResource.ts#L13)*

Gets an Iri of a resource.

*__readonly__*: 

*__returns__*: 

___
<a id="property"></a>

###  property

**● property**: *[IProperty](iproperty.md)*

*Defined in [DataModel/ISupportedProperty.ts:14](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/ISupportedProperty.ts#L14)*

Gets the actual property.

*__readonly__*: 

*__returns__*: 

___
<a id="readable"></a>

###  readable

**● readable**: *`boolean`*

*Defined in [DataModel/ISupportedProperty.ts:28](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/ISupportedProperty.ts#L28)*

Gets the value indicating whether this property is readable.

*__readonly__*: 

*__returns__*: 

___
<a id="required"></a>

###  required

**● required**: *`boolean`*

*Defined in [DataModel/ISupportedProperty.ts:21](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/ISupportedProperty.ts#L21)*

Gets the value indicating whether this property is required.

*__readonly__*: 

*__returns__*: 

___
<a id="type"></a>

###  type

**● type**: *[TypesCollection](../classes/typescollection.md)*

*Inherited from [IResource](iresource.md).[type](iresource.md#type)*

*Defined in [DataModel/IResource.ts:20](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IResource.ts#L20)*

Gets classes a given resource is of.

*__readonly__*: 

*__returns__*: 

___
<a id="writable"></a>

###  writable

**● writable**: *`boolean`*

*Defined in [DataModel/ISupportedProperty.ts:35](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/ISupportedProperty.ts#L35)*

Gets the value indicating whether this property is writable.

*__readonly__*: 

*__returns__*: 

___

