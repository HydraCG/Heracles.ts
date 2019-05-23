[@hydra-cg/heracles.ts](../README.md) > [IIriTemplate](../interfaces/iiritemplate.md)

# Interface: IIriTemplate

Describes an abstract Hydra IRI template

*__interface__*: 

## Hierarchy

↳  [IHydraResource](ihydraresource.md)

**↳ IIriTemplate**

## Index

### Properties

* [collections](iiritemplate.md#collections)
* [iri](iiritemplate.md#iri)
* [links](iiritemplate.md#links)
* [mappings](iiritemplate.md#mappings)
* [operations](iiritemplate.md#operations)
* [template](iiritemplate.md#template)
* [type](iiritemplate.md#type)
* [variableRepresentation](iiritemplate.md#variablerepresentation)

---

## Properties

<a id="collections"></a>

###  collections

**● collections**: *[ResourceFilterableCollection](../classes/resourcefilterablecollection.md)<[ICollection](icollection.md)>*

*Inherited from [IHydraResource](ihydraresource.md).[collections](ihydraresource.md#collections)*

*Defined in [DataModel/IHydraResource.ts:17](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IHydraResource.ts#L17)*

Gets collections exposed by that resource.

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
<a id="links"></a>

###  links

**● links**: *[LinksCollection](../classes/linkscollection.md)*

*Inherited from [IHydraResource](ihydraresource.md).[links](ihydraresource.md#links)*

*Defined in [DataModel/IHydraResource.ts:31](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IHydraResource.ts#L31)*

Gets links related to that resource.

*__readonly__*: 

*__returns__*: 

___
<a id="mappings"></a>

###  mappings

**● mappings**: *[MappingsCollection](../classes/mappingscollection.md)*

*Defined in [DataModel/IIriTemplate.ts:29](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IIriTemplate.ts#L29)*

Gets the variable mappings.

*__readonly__*: 

*__returns__*: 

___
<a id="operations"></a>

###  operations

**● operations**: *[OperationsCollection](../classes/operationscollection.md)*

*Inherited from [IHydraResource](ihydraresource.md).[operations](ihydraresource.md#operations)*

*Defined in [DataModel/IHydraResource.ts:24](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IHydraResource.ts#L24)*

Gets operations that can be performed on that resource.

*__readonly__*: 

*__returns__*: 

___
<a id="template"></a>

###  template

**● template**: *`string`*

*Defined in [DataModel/IIriTemplate.ts:15](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IIriTemplate.ts#L15)*

Gets an URI template.

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
<a id="variablerepresentation"></a>

###  variableRepresentation

**● variableRepresentation**: *[IResource](iresource.md)*

*Defined in [DataModel/IIriTemplate.ts:22](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IIriTemplate.ts#L22)*

Gets a variable representation type.

*__readonly__*: 

*__returns__*: 

___

