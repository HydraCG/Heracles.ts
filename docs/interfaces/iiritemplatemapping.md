[@hydra-cg/heracles.ts](../README.md) > [IIriTemplateMapping](../interfaces/iiritemplatemapping.md)

# Interface: IIriTemplateMapping

Describes an abstract Hydra IRI template mapping

*__interface__*: 

## Hierarchy

 [IResource](iresource.md)

**↳ IIriTemplateMapping**

## Index

### Properties

* [iri](iiritemplatemapping.md#iri)
* [property](iiritemplatemapping.md#property)
* [required](iiritemplatemapping.md#required)
* [type](iiritemplatemapping.md#type)
* [variable](iiritemplatemapping.md#variable)

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

**● property**: *[IResource](iresource.md)*

*Defined in [DataModel/IIriTemplateMapping.ts:20](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IIriTemplateMapping.ts#L20)*

Gets a property used for this variable mapping.

*__readonly__*: 

*__returns__*: 

___
<a id="required"></a>

###  required

**● required**: *`boolean`*

*Defined in [DataModel/IIriTemplateMapping.ts:27](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IIriTemplateMapping.ts#L27)*

Gets the value indicating whether the mapping is required or no.

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
<a id="variable"></a>

###  variable

**● variable**: *`string`*

*Defined in [DataModel/IIriTemplateMapping.ts:13](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IIriTemplateMapping.ts#L13)*

Gets a variable name being mapped.

*__readonly__*: 

*__returns__*: 

___

