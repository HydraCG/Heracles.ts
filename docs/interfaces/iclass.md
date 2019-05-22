[@hydra-cg/heracles.ts](../README.md) > [IClass](../interfaces/iclass.md)

# Interface: IClass

Represents a Hydra class.

*__interface__*: 

## Hierarchy

 [IResource](iresource.md)

**↳ IClass**

## Index

### Properties

* [description](iclass.md#description)
* [displayName](iclass.md#displayname)
* [iri](iclass.md#iri)
* [supportedOperations](iclass.md#supportedoperations)
* [supportedProperties](iclass.md#supportedproperties)
* [type](iclass.md#type)

---

## Properties

<a id="description"></a>

###  description

**● description**: *`string`*

*Defined in [DataModel/IClass.ts:23](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IClass.ts#L23)*

Gets the class' description.

*__readonly__*: 

*__returns__*: 

___
<a id="displayname"></a>

###  displayName

**● displayName**: *`string`*

*Defined in [DataModel/IClass.ts:16](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IClass.ts#L16)*

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
<a id="supportedoperations"></a>

###  supportedOperations

**● supportedOperations**: *[OperationsCollection](../classes/operationscollection.md)*

*Defined in [DataModel/IClass.ts:30](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IClass.ts#L30)*

Gets the class' supported operations.

*__readonly__*: 

*__returns__*: 

___
<a id="supportedproperties"></a>

###  supportedProperties

**● supportedProperties**: *[ResourceFilterableCollection](../classes/resourcefilterablecollection.md)<[ISupportedProperty](isupportedproperty.md)>*

*Defined in [DataModel/IClass.ts:37](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IClass.ts#L37)*

Gets the class' supported properties

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

