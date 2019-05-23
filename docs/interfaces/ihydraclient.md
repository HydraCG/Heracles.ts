[@hydra-cg/heracles.ts](../README.md) > [IHydraClient](../interfaces/ihydraclient.md)

# Interface: IHydraClient

Provides an abstract description of the Hydra client.

*__interface__*: 

## Hierarchy

**IHydraClient**

## Implemented by

* [HydraClient](../classes/hydraclient.md)

## Index

### Methods

* [getApiDocumentation](ihydraclient.md#getapidocumentation)
* [getHypermediaProcessor](ihydraclient.md#gethypermediaprocessor)
* [getResource](ihydraclient.md#getresource)
* [invoke](ihydraclient.md#invoke)

---

## Methods

<a id="getapidocumentation"></a>

###  getApiDocumentation

▸ **getApiDocumentation**(urlOrResource: *`string` \| [IResource](iresource.md)*): `Promise`<[IApiDocumentation](iapidocumentation.md)>

*Defined in [IHydraClient.ts:25](https://github.com/alien-mcl/Heracles.ts/blob/master/src/IHydraClient.ts#L25)*

Obtains an API documentation.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| urlOrResource | `string` \| [IResource](iresource.md) |  URL or object with an iri property from which to obtain an API documentation. |

**Returns:** `Promise`<[IApiDocumentation](iapidocumentation.md)>

___
<a id="gethypermediaprocessor"></a>

###  getHypermediaProcessor

▸ **getHypermediaProcessor**(response: *`Response`*): [IHypermediaProcessor](ihypermediaprocessor.md)

*Defined in [IHydraClient.ts:17](https://github.com/alien-mcl/Heracles.ts/blob/master/src/IHydraClient.ts#L17)*

Gets a hypermedia provider suitable for a given response.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| response | `Response` |  Raw response to find hypermedia processor for. |

**Returns:** [IHypermediaProcessor](ihypermediaprocessor.md)

___
<a id="getresource"></a>

###  getResource

▸ **getResource**(urlOrResource: *`string` \| [IResource](iresource.md) \| [ILink](ilink.md)*): `Promise`<[IWebResource](iwebresource.md)>

*Defined in [IHydraClient.ts:32](https://github.com/alien-mcl/Heracles.ts/blob/master/src/IHydraClient.ts#L32)*

Obtains a representation of a resource.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| urlOrResource | `string` \| [IResource](iresource.md) \| [ILink](ilink.md) |  Either URL, [IResource](iresource.md) pr [ILink](ilink.md) carrying an IRI of the resource to be obtained. |

**Returns:** `Promise`<[IWebResource](iwebresource.md)>

___
<a id="invoke"></a>

###  invoke

▸ **invoke**(operation: *[IOperation](ioperation.md)*, body?: *[IWebResource](iwebresource.md)*, parameters?: *`object`*): `Promise`<`Response`>

*Defined in [IHydraClient.ts:41](https://github.com/alien-mcl/Heracles.ts/blob/master/src/IHydraClient.ts#L41)*

Invokes a given operation.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| operation | [IOperation](ioperation.md) |  Operation descriptor to be invoked. |
| `Optional` body | [IWebResource](iwebresource.md) |  Optional resource to be used as a body of the operation. |
| `Optional` parameters | `object` |  Optional auxiliary parameters. |

**Returns:** `Promise`<`Response`>

___

