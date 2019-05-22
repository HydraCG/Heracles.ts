[@hydra-cg/heracles.ts](../README.md) > [IProperty](../interfaces/iproperty.md)

# Interface: IProperty

Describes an abstract property.

*__interface__*: 

## Hierarchy

 [IResource](iresource.md)

**↳ IProperty**

## Index

### Properties

* [description](iproperty.md#description)
* [displayName](iproperty.md#displayname)
* [iri](iproperty.md#iri)
* [type](iproperty.md#type)
* [valuesOfType](iproperty.md#valuesoftype)

---

## Properties

<a id="description"></a>

###  description

**● description**: *`string`*

*Defined in [DataModel/IProperty.ts:21](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IProperty.ts#L21)*

Gets the property's description.

*__readonly__*: 

*__returns__*: 

___
<a id="displayname"></a>

###  displayName

**● displayName**: *`string`*

*Defined in [DataModel/IProperty.ts:14](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IProperty.ts#L14)*

Gets the class' display name.

*__readonly__*: 

*__returns__*: 

___
<a id="iri"></a>

###  iri

**● iri**: *`string`*

*Inherited from [IResource](iresource.md).[iri](iresource.md#iri)*

*Defined in [DataModel/IResource.ts:13](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IResource.ts#L13)*

Gets an Iri of a resource.

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
<a id="valuesoftype"></a>

###  valuesOfType

**● valuesOfType**: *[ResourceFilterableCollection](../classes/resourcefilterablecollection.md)<[IResource](iresource.md)>*

*Defined in [DataModel/IProperty.ts:28](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IProperty.ts#L28)*

Gets the types of values this property can have.

*__readonly__*: 

*__returns__*: 

___

