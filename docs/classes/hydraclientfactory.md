[@hydra-cg/heracles.ts](../README.md) > [HydraClientFactory](../classes/hydraclientfactory.md)

# Class: HydraClientFactory

Provides a factory of the [IHydraClient](../interfaces/ihydraclient.md)s.

## Hierarchy

**HydraClientFactory**

## Index

### Properties

* [httpCall](hydraclientfactory.md#httpcall)
* [hypermediaProcessorFactories](hydraclientfactory.md#hypermediaprocessorfactories)
* [iriTemplateExpansionStrategy](hydraclientfactory.md#iritemplateexpansionstrategy)
* [linksPolicy](hydraclientfactory.md#linkspolicy)

### Methods

* [andCreate](hydraclientfactory.md#andcreate)
* [with](hydraclientfactory.md#with)
* [withAllHttpLinks](hydraclientfactory.md#withallhttplinks)
* [withAllLinks](hydraclientfactory.md#withalllinks)
* [withDefaults](hydraclientfactory.md#withdefaults)
* [withFactory](hydraclientfactory.md#withfactory)
* [withJsonLd](hydraclientfactory.md#withjsonld)
* [withSameRootLinks](hydraclientfactory.md#withsamerootlinks)
* [withStrictLinks](hydraclientfactory.md#withstrictlinks)
* [configure](hydraclientfactory.md#configure)
* [createJsonLdHypermediaProcessor](hydraclientfactory.md#createjsonldhypermediaprocessor)

---

## Properties

<a id="httpcall"></a>

### `<Private>` httpCall

**● httpCall**: *[HttpCallFacility](../#httpcallfacility)* =  null

*Defined in [HydraClientFactory.ts:26](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClientFactory.ts#L26)*

___
<a id="hypermediaprocessorfactories"></a>

### `<Private>` hypermediaProcessorFactories

**● hypermediaProcessorFactories**: *[HypermediaProcessorFactory](../#hypermediaprocessorfactory)[]* =  []

*Defined in [HydraClientFactory.ts:23](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClientFactory.ts#L23)*

___
<a id="iritemplateexpansionstrategy"></a>

### `<Private>` iriTemplateExpansionStrategy

**● iriTemplateExpansionStrategy**: *[IIriTemplateExpansionStrategy](../interfaces/iiritemplateexpansionstrategy.md)* =  null

*Defined in [HydraClientFactory.ts:24](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClientFactory.ts#L24)*

___
<a id="linkspolicy"></a>

### `<Private>` linksPolicy

**● linksPolicy**: *[LinksPolicy](../enums/linkspolicy.md)* =  LinksPolicy.Strict

*Defined in [HydraClientFactory.ts:25](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClientFactory.ts#L25)*

___

## Methods

<a id="andcreate"></a>

###  andCreate

▸ **andCreate**(): [IHydraClient](../interfaces/ihydraclient.md)

*Defined in [HydraClientFactory.ts:158](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClientFactory.ts#L158)*

Creates a new instance of the [IHydraClient](../interfaces/ihydraclient.md).

**Returns:** [IHydraClient](../interfaces/ihydraclient.md)

___
<a id="with"></a>

###  with

▸ **with**(hypermediaProcessor: *[IHypermediaProcessor](../interfaces/ihypermediaprocessor.md)*): [HydraClientFactory](hydraclientfactory.md)

▸ **with**(iriTemplateExpansionStrategy: *[IIriTemplateExpansionStrategy](../interfaces/iiritemplateexpansionstrategy.md)*): [HydraClientFactory](hydraclientfactory.md)

▸ **with**(httpCall: *[HttpCallFacility](../#httpcallfacility)*): [HydraClientFactory](hydraclientfactory.md)

*Defined in [HydraClientFactory.ts:122](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClientFactory.ts#L122)*

Adds an another [IHypermediaProcessor](../interfaces/ihypermediaprocessor.md) component.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| hypermediaProcessor | [IHypermediaProcessor](../interfaces/ihypermediaprocessor.md) |  Hypermedia processor to be passed to future [HydraClient](hydraclient.md) instances. |

**Returns:** [HydraClientFactory](hydraclientfactory.md)

*Defined in [HydraClientFactory.ts:131](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClientFactory.ts#L131)*

Sets a [IIriTemplateExpansionStrategy](../interfaces/iiritemplateexpansionstrategy.md) component.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| iriTemplateExpansionStrategy | [IIriTemplateExpansionStrategy](../interfaces/iiritemplateexpansionstrategy.md) |  IRI template expansion strategy to be used when an IRI template is encountered. |

**Returns:** [HydraClientFactory](hydraclientfactory.md)

*Defined in [HydraClientFactory.ts:139](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClientFactory.ts#L139)*

Adds HTTP requests facility component.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| httpCall | [HttpCallFacility](../#httpcallfacility) |  HTTP call facility to be used for remote server calls. |

**Returns:** [HydraClientFactory](hydraclientfactory.md)

___
<a id="withallhttplinks"></a>

###  withAllHttpLinks

▸ **withAllHttpLinks**(): [HydraClientFactory](hydraclientfactory.md)

*Defined in [HydraClientFactory.ts:82](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClientFactory.ts#L82)*

Configures a factory to create a client with all resources from HTTP/HTTPS considered links.

**Returns:** [HydraClientFactory](hydraclientfactory.md)

___
<a id="withalllinks"></a>

###  withAllLinks

▸ **withAllLinks**(): [HydraClientFactory](hydraclientfactory.md)

*Defined in [HydraClientFactory.ts:91](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClientFactory.ts#L91)*

Configures a factory to create a client with all resources considered links.

**Returns:** [HydraClientFactory](hydraclientfactory.md)

___
<a id="withdefaults"></a>

###  withDefaults

▸ **withDefaults**(): [HydraClientFactory](hydraclientfactory.md)

*Defined in [HydraClientFactory.ts:53](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClientFactory.ts#L53)*

Configures a future [IHydraClient](../interfaces/ihydraclient.md) with [JsonLdHypermediaProcessor](jsonldhypermediaprocessor.md), [BodyResourceBoundIriTemplateExpansionStrategy](bodyresourceboundiritemplateexpansionstrategy.md) and fetch components.

**Returns:** [HydraClientFactory](hydraclientfactory.md)

___
<a id="withfactory"></a>

###  withFactory

▸ **withFactory**(hypermediaProcessorFactory: *[HypermediaProcessorFactory](../#hypermediaprocessorfactory)*): [HydraClientFactory](hydraclientfactory.md)

*Defined in [HydraClientFactory.ts:111](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClientFactory.ts#L111)*

Adds an another [IHypermediaProcessor](../interfaces/ihypermediaprocessor.md) component via it's factory method.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| hypermediaProcessorFactory | [HypermediaProcessorFactory](../#hypermediaprocessorfactory) |  Hypermedia processor facvtory to be passed to future [HydraClient](hydraclient.md) instances. |

**Returns:** [HydraClientFactory](hydraclientfactory.md)

___
<a id="withjsonld"></a>

###  withJsonLd

▸ **withJsonLd**(): [HydraClientFactory](hydraclientfactory.md)

*Defined in [HydraClientFactory.ts:100](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClientFactory.ts#L100)*

Configures a factory with JSON-LD hypermedia processor.

**Returns:** [HydraClientFactory](hydraclientfactory.md)

___
<a id="withsamerootlinks"></a>

###  withSameRootLinks

▸ **withSameRootLinks**(): [HydraClientFactory](hydraclientfactory.md)

*Defined in [HydraClientFactory.ts:73](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClientFactory.ts#L73)*

Configures a factory to create a client with links of resources from the same host and port.

**Returns:** [HydraClientFactory](hydraclientfactory.md)

___
<a id="withstrictlinks"></a>

###  withStrictLinks

▸ **withStrictLinks**(): [HydraClientFactory](hydraclientfactory.md)

*Defined in [HydraClientFactory.ts:64](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClientFactory.ts#L64)*

Configures a factory to create a client with explicitly defined links.

**Returns:** [HydraClientFactory](hydraclientfactory.md)

___
<a id="configure"></a>

### `<Static>` configure

▸ **configure**(): [HydraClientFactory](hydraclientfactory.md)

*Defined in [HydraClientFactory.ts:32](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClientFactory.ts#L32)*

Starts the factory configuration.

**Returns:** [HydraClientFactory](hydraclientfactory.md)

___
<a id="createjsonldhypermediaprocessor"></a>

### `<Static>``<Private>` createJsonLdHypermediaProcessor

▸ **createJsonLdHypermediaProcessor**(httpCall: *[HttpCallFacility](../#httpcallfacility)*): [JsonLdHypermediaProcessor](jsonldhypermediaprocessor.md)

*Defined in [HydraClientFactory.ts:36](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClientFactory.ts#L36)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| httpCall | [HttpCallFacility](../#httpcallfacility) |

**Returns:** [JsonLdHypermediaProcessor](jsonldhypermediaprocessor.md)

___

