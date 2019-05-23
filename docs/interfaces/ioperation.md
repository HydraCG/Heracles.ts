[@hydra-cg/heracles.ts](../README.md) > [IOperation](../interfaces/ioperation.md)

# Interface: IOperation

Describes an abstract Hydra operation.

*__interface__*: 

## Hierarchy

↳  [IHydraResource](ihydraresource.md)

↳  [IPointingResource](ipointingresource.md)

**↳ IOperation**

↳  [ITemplatedOperation](itemplatedoperation.md)

## Index

### Properties

* [baseUrl](ioperation.md#baseurl)
* [collections](ioperation.md#collections)
* [expectedHeaders](ioperation.md#expectedheaders)
* [expects](ioperation.md#expects)
* [iri](ioperation.md#iri)
* [links](ioperation.md#links)
* [method](ioperation.md#method)
* [operations](ioperation.md#operations)
* [returnedHeaders](ioperation.md#returnedheaders)
* [returns](ioperation.md#returns)
* [target](ioperation.md#target)
* [type](ioperation.md#type)

---

## Properties

<a id="baseurl"></a>

###  baseUrl

**● baseUrl**: *`string`*

*Inherited from [IPointingResource](ipointingresource.md).[baseUrl](ipointingresource.md#baseurl)*

*Defined in [DataModel/IPointingResource.ts:14](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IPointingResource.ts#L14)*

Gets a base URL that can be used to resolve target in case it is relative.

*__readonly__*: 

*__returns__*: 

___
<a id="collections"></a>

###  collections

**● collections**: *[ResourceFilterableCollection](../classes/resourcefilterablecollection.md)<[ICollection](icollection.md)>*

*Inherited from [IHydraResource](ihydraresource.md).[collections](ihydraresource.md#collections)*

*Overrides [IHydraResource](ihydraresource.md).[collections](ihydraresource.md#collections)*

*Defined in [DataModel/IHydraResource.ts:17](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IHydraResource.ts#L17)*

Gets collections exposed by that resource.

*__readonly__*: 

*__returns__*: 

___
<a id="expectedheaders"></a>

###  expectedHeaders

**● expectedHeaders**: *`Iterable`<`string`>*

*Defined in [DataModel/IOperation.ts:37](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IOperation.ts#L37)*

Gets the expected headers.

*__readonly__*: 

*__returns__*: 

___
<a id="expects"></a>

###  expects

**● expects**: *[ResourceFilterableCollection](../classes/resourcefilterablecollection.md)<[IClass](iclass.md)>*

*Defined in [DataModel/IOperation.ts:23](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IOperation.ts#L23)*

Gets the expected classes.

*__readonly__*: 

*__returns__*: 

___
<a id="iri"></a>

###  iri

**● iri**: *`string`*

*Inherited from [IResource](iresource.md).[iri](iresource.md#iri)*

*Overrides [IResource](iresource.md).[iri](iresource.md#iri)*

*Defined in [DataModel/IResource.ts:13](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IResource.ts#L13)*

Gets an Iri of a resource.

*__readonly__*: 

*__returns__*: 

___
<a id="links"></a>

###  links

**● links**: *[LinksCollection](../classes/linkscollection.md)*

*Inherited from [IHydraResource](ihydraresource.md).[links](ihydraresource.md#links)*

*Overrides [IHydraResource](ihydraresource.md).[links](ihydraresource.md#links)*

*Defined in [DataModel/IHydraResource.ts:31](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IHydraResource.ts#L31)*

Gets links related to that resource.

*__readonly__*: 

*__returns__*: 

___
<a id="method"></a>

###  method

**● method**: *`string`*

*Defined in [DataModel/IOperation.ts:16](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IOperation.ts#L16)*

Gets a method to be used for the call.

*__readonly__*: 

*__returns__*: 

___
<a id="operations"></a>

###  operations

**● operations**: *[OperationsCollection](../classes/operationscollection.md)*

*Inherited from [IHydraResource](ihydraresource.md).[operations](ihydraresource.md#operations)*

*Overrides [IHydraResource](ihydraresource.md).[operations](ihydraresource.md#operations)*

*Defined in [DataModel/IHydraResource.ts:24](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IHydraResource.ts#L24)*

Gets operations that can be performed on that resource.

*__readonly__*: 

*__returns__*: 

___
<a id="returnedheaders"></a>

###  returnedHeaders

**● returnedHeaders**: *`Iterable`<`string`>*

*Defined in [DataModel/IOperation.ts:44](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IOperation.ts#L44)*

Gets the returned headers.

*__readonly__*: 

*__returns__*: 

___
<a id="returns"></a>

###  returns

**● returns**: *[ResourceFilterableCollection](../classes/resourcefilterablecollection.md)<[IClass](iclass.md)>*

*Defined in [DataModel/IOperation.ts:30](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IOperation.ts#L30)*

Gets the returned classes.

*__readonly__*: 

*__returns__*: 

___
<a id="target"></a>

###  target

**● target**: *[IResource](iresource.md)*

*Inherited from [IPointingResource](ipointingresource.md).[target](ipointingresource.md#target)*

*Defined in [DataModel/IPointingResource.ts:21](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IPointingResource.ts#L21)*

Gets a target URL to be called.

*__readonly__*: 

*__returns__*: 

___
<a id="type"></a>

###  type

**● type**: *[TypesCollection](../classes/typescollection.md)*

*Inherited from [IResource](iresource.md).[type](iresource.md#type)*

*Overrides [IResource](iresource.md).[type](iresource.md#type)*

*Defined in [DataModel/IResource.ts:20](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IResource.ts#L20)*

Gets classes a given resource is of.

*__readonly__*: 

*__returns__*: 

___

