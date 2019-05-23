[@hydra-cg/heracles.ts](../README.md) > [IWebResource](../interfaces/iwebresource.md)

# Interface: IWebResource

Describes an abstract web resource.

*__interface__*: 

## Hierarchy

 `Object`

 [IResource](iresource.md)

**↳ IWebResource**

## Index

### Properties

* [Object](iwebresource.md#object)
* [constructor](iwebresource.md#constructor)
* [hypermedia](iwebresource.md#hypermedia)
* [iri](iwebresource.md#iri)
* [type](iwebresource.md#type)

### Methods

* [hasOwnProperty](iwebresource.md#hasownproperty)
* [isPrototypeOf](iwebresource.md#isprototypeof)
* [propertyIsEnumerable](iwebresource.md#propertyisenumerable)
* [toLocaleString](iwebresource.md#tolocalestring)
* [toString](iwebresource.md#tostring)
* [valueOf](iwebresource.md#valueof)

---

## Properties

<a id="object"></a>

###  Object

**● Object**: *`ObjectConstructor`*

*Defined in D:/Users/Karol/Documents/Visual Studio 2017/Projects/HydraCG/Heracles.ts/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:267*

Provides functionality common to all JavaScript objects.

___
<a id="constructor"></a>

###  constructor

**● constructor**: *`Function`*

*Inherited from Object.constructor*

*Defined in D:/Users/Karol/Documents/Visual Studio 2017/Projects/HydraCG/Heracles.ts/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:122*

The initial value of Object.prototype.constructor is the standard built-in Object constructor.

___
<a id="hypermedia"></a>

###  hypermedia

**● hypermedia**: *[IHypermediaContainer](ihypermediacontainer.md)*

*Defined in [DataModel/IWebResource.ts:14](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IWebResource.ts#L14)*

Gets a collection of hypermedia controls.

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

## Methods

<a id="hasownproperty"></a>

###  hasOwnProperty

▸ **hasOwnProperty**(v: *`PropertyKey`*): `boolean`

*Inherited from Object.hasOwnProperty*

*Defined in D:/Users/Karol/Documents/Visual Studio 2017/Projects/HydraCG/Heracles.ts/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:137*

Determines whether an object has a property with the specified name.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| v | `PropertyKey` |  A property name. |

**Returns:** `boolean`

___
<a id="isprototypeof"></a>

###  isPrototypeOf

▸ **isPrototypeOf**(v: *`Object`*): `boolean`

*Inherited from Object.isPrototypeOf*

*Defined in D:/Users/Karol/Documents/Visual Studio 2017/Projects/HydraCG/Heracles.ts/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:143*

Determines whether an object exists in another object's prototype chain.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| v | `Object` |  Another object whose prototype chain is to be checked. |

**Returns:** `boolean`

___
<a id="propertyisenumerable"></a>

###  propertyIsEnumerable

▸ **propertyIsEnumerable**(v: *`PropertyKey`*): `boolean`

*Inherited from Object.propertyIsEnumerable*

*Defined in D:/Users/Karol/Documents/Visual Studio 2017/Projects/HydraCG/Heracles.ts/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:149*

Determines whether a specified property is enumerable.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| v | `PropertyKey` |  A property name. |

**Returns:** `boolean`

___
<a id="tolocalestring"></a>

###  toLocaleString

▸ **toLocaleString**(): `string`

*Inherited from Object.toLocaleString*

*Defined in D:/Users/Karol/Documents/Visual Studio 2017/Projects/HydraCG/Heracles.ts/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:128*

Returns a date converted to a string using the current locale.

**Returns:** `string`

___
<a id="tostring"></a>

###  toString

▸ **toString**(): `string`

*Inherited from Object.toString*

*Defined in D:/Users/Karol/Documents/Visual Studio 2017/Projects/HydraCG/Heracles.ts/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:125*

Returns a string representation of an object.

**Returns:** `string`

___
<a id="valueof"></a>

###  valueOf

▸ **valueOf**(): `Object`

*Inherited from Object.valueOf*

*Defined in D:/Users/Karol/Documents/Visual Studio 2017/Projects/HydraCG/Heracles.ts/node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:131*

Returns the primitive value of the specified object.

**Returns:** `Object`

___

