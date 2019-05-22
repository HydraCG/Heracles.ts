
Heracles.ts [![Build Status](https://travis-ci.org/HydraCG/Heracles.ts.svg?branch=master)](https://travis-ci.org/HydraCG/Heracles.ts) [![Coverage Status](https://coveralls.io/repos/github/HydraCG/Heracles.ts/badge.svg?branch=master)](https://coveralls.io/github/HydraCG/Heracles.ts?branch=master)
========================================================================================================================================================================================================================================================================================================

Reference implementation of a Hydra client in TypeScript.

Getting started
---------------

First you'll need to add the _Heracles.ts_ module to your project:

```bash
npm install @hydra-cg/heracles.ts --save
```

Once added, you're ready to use the client in your code. To obtain an instance of the client just use this snippet:

```typescript
import HydraClientFactory from "@hydra-cg/heracles.ts";

let hydraClient = HydraClientFactory.configure().withDefaults().andCreate();
```

Once the instance is obtained, you're free to use the client, i.e.:

```typescript
const resource = await hydraClient.getResource("http://some.domain/api");
for (const link of resource.hypermedia.links) {
  // do something with the link.
}
```

For more example, please refer to the [cookbook](https://github.com/HydraCG/cookbook).

Programmer's reference is available at [docs](https://github.com/HydraCG/Heracles.ts/tree/master/docs).

### Hydra client factory options

There are some additional options you can use while creating a client instance. The most interesting one will be probably which resource relations should be treated as links and exposed in the _links_ property.

These options (methods to be called on the _HydraClientFactory_ instance) would be:

*   .withAllLinks() - treats all related resources as links
*   .withAllHttpLinks() - similar as above, but only HTTP(S) URLs will be considered
*   .withSameRootLinks() - only URLs from the same root of the requested resource will be considered
*   .withStrictLinks() - this is the **default** - only links exposed as `hydra:link` will be considered

It is also possible to use custom extensions to the client, adding i.e. support to other than built-in JSON-LD serializations of the RDF. This can be achieved either by calling:

*   .with(component: IHypermediaProcessor) - accepts a custom implementation of the _IHypermediaProcessor_ interface
*   .withFactory(method: HypermediaProcessorFactory) - accepts a parameterles factory method that will provide the instance as required

Example usage with custom parameters:

```typescript
import HydraClientFactory from "@hydra-cg/heracles.ts";

let hydraClient = HydraClientFactory
  .configure()
  .withDefaults()
  .withAllLinks()
  .andCreate();
```

## Index

### Enumerations

* [CrawlingDirection](enums/crawlingdirection.md)
* [Level](enums/level.md)
* [LinksPolicy](enums/linkspolicy.md)

### Classes

* [BodyResourceBoundIriTemplateExpansionStrategy](classes/bodyresourceboundiritemplateexpansionstrategy.md)
* [CompoundGraphTransformer](classes/compoundgraphtransformer.md)
* [EntryPointCorrectingGraphTransformer](classes/entrypointcorrectinggraphtransformer.md)
* [FilterableCollection](classes/filterablecollection.md)
* [FilterableCollectionIterator](classes/filterablecollectioniterator.md)
* [FlatteningGraphTransformer](classes/flatteninggraphtransformer.md)
* [HydraClient](classes/hydraclient.md)
* [HydraClientFactory](classes/hydraclientfactory.md)
* [HypermediaContainer](classes/hypermediacontainer.md)
* [IndirectTypingProvider](classes/indirecttypingprovider.md)
* [JsonLdHypermediaProcessor](classes/jsonldhypermediaprocessor.md)
* [LinksCollection](classes/linkscollection.md)
* [MappingsBuilder](classes/mappingsbuilder.md)
* [MappingsCollection](classes/mappingscollection.md)
* [OperationsCollection](classes/operationscollection.md)
* [PartialCollectionCrawler](classes/partialcollectioncrawler.md)
* [ProcessingState](classes/processingstate.md)
* [PropertyMapping](classes/propertymapping.md)
* [ResourceFilterableCollection](classes/resourcefilterablecollection.md)
* [StaticOntologyProvider](classes/staticontologyprovider.md)
* [TemplatedLink](classes/templatedlink.md)
* [TemplatedOperation](classes/templatedoperation.md)
* [TemplatedResource](classes/templatedresource.md)
* [TypesCollection](classes/typescollection.md)

### Interfaces

* [IApiDocumentation](interfaces/iapidocumentation.md)
* [IClass](interfaces/iclass.md)
* [ICollection](interfaces/icollection.md)
* [ICrawlingOptions](interfaces/icrawlingoptions.md)
* [IDictionary](interfaces/idictionary.md)
* [IGraphTransformer](interfaces/igraphtransformer.md)
* [IHeaders](interfaces/iheaders.md)
* [IHydraClient](interfaces/ihydraclient.md)
* [IHydraResource](interfaces/ihydraresource.md)
* [IHypermediaContainer](interfaces/ihypermediacontainer.md)
* [IHypermediaProcessingOptions](interfaces/ihypermediaprocessingoptions.md)
* [IHypermediaProcessor](interfaces/ihypermediaprocessor.md)
* [IIndirectTypingProvider](interfaces/iindirecttypingprovider.md)
* [IIriTemplate](interfaces/iiritemplate.md)
* [IIriTemplateExpansionStrategy](interfaces/iiritemplateexpansionstrategy.md)
* [IIriTemplateMapping](interfaces/iiritemplatemapping.md)
* [ILink](interfaces/ilink.md)
* [IOntologyProvider](interfaces/iontologyprovider.md)
* [IOperation](interfaces/ioperation.md)
* [IPartialCollectionIterator](interfaces/ipartialcollectioniterator.md)
* [IPartialCollectionView](interfaces/ipartialcollectionview.md)
* [IPointingResource](interfaces/ipointingresource.md)
* [IProperty](interfaces/iproperty.md)
* [IPropertyMapping](interfaces/ipropertymapping.md)
* [IResource](interfaces/iresource.md)
* [IState](interfaces/istate.md)
* [ISupportedProperty](interfaces/isupportedproperty.md)
* [ITemplatedLink](interfaces/itemplatedlink.md)
* [ITemplatedOperation](interfaces/itemplatedoperation.md)
* [ITemplatedResource](interfaces/itemplatedresource.md)
* [IWebResource](interfaces/iwebresource.md)

### Type aliases

* [HeaderMatcher](#headermatcher)
* [HttpCallFacility](#httpcallfacility)
* [HypermediaProcessorFactory](#hypermediaprocessorfactory)
* [InstanceFactory](#instancefactory)
* [Literal](#literal)
* [MappingBuilder](#mappingbuilder)
* [MappingsProcessor](#mappingsprocessor)
* [Notification](#notification)

### Variables

* [dependentTypes](#dependenttypes)
* [empty](#empty)
* [factories](#factories)
* [hydraLinks](#hydralinks)
* [hydraNamespace](#hydranamespace)
* [hydraOntology](#hydraontology)
* [jsonLdContext](#jsonldcontext)
* [link](#link)
* [literals](#literals)
* [mappings](#mappings)
* [rdfNamespace](#rdfnamespace)
* [rdfsNamespace](#rdfsnamespace)
* [templatedLink](#templatedlink)

### Functions

* [addTo](#addto)
* [apiDocumentation](#apidocumentation)
* [collection](#collection)
* [convertToResource](#converttoresource)
* [createStateFrom](#createstatefrom)
* [discoverCollectionsFrom](#discovercollectionsfrom)
* [getPart](#getpart)
* [getTargetOf](#gettargetof)
* [internalLinksExtractor](#internallinksextractor)
* [isBlank](#isblank)
* [isHydraIndependent](#ishydraindependent)
* [isLink](#islink)
* [linksAndOperations](#linksandoperations)
* [linksExtractor](#linksextractor)
* [onLinkMaterialized](#onlinkmaterialized)
* [onTemplateMaterialized](#ontemplatematerialized)
* [partialCollectionIteratorFactory](#partialcollectioniteratorfactory)
* [rdfSchema](#rdfschema)
* [templatedOperationsExtractor](#templatedoperationsextractor)
* [tryCreateOperationFrom](#trycreateoperationfrom)
* [tryGetPredicateLinkType](#trygetpredicatelinktype)
* [tryGetResourceLinkType](#trygetresourcelinktype)
* [update](#update)

### Object literals

* [JsonLdHelper](#jsonldhelper)
* [hydra](#hydra)
* [rdf](#rdf)
* [rdfs](#rdfs)

---

## Type aliases

<a id="headermatcher"></a>

###  HeaderMatcher

**Ƭ HeaderMatcher**: *`function`*

*Defined in [JsonLd/JsonLdHypermediaProcessor.ts:22](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/JsonLdHypermediaProcessor.ts#L22)*

#### Type declaration
▸(headers: *`Headers`*): `boolean`

**Parameters:**

| Name | Type |
| ------ | ------ |
| headers | `Headers` |

**Returns:** `boolean`

___
<a id="httpcallfacility"></a>

###  HttpCallFacility

**Ƭ HttpCallFacility**: *`function`*

*Defined in [HydraClientFactory.ts:16](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClientFactory.ts#L16)*

#### Type declaration
▸(url: *`string`*, options?: *`RequestInit`*): `Promise`<`Response`>

**Parameters:**

| Name | Type |
| ------ | ------ |
| url | `string` |
| `Optional` options | `RequestInit` |

**Returns:** `Promise`<`Response`>

___
<a id="hypermediaprocessorfactory"></a>

###  HypermediaProcessorFactory

**Ƭ HypermediaProcessorFactory**: *`function`*

*Defined in [HydraClientFactory.ts:17](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClientFactory.ts#L17)*

#### Type declaration
▸(): [IHypermediaProcessor](interfaces/ihypermediaprocessor.md)

**Returns:** [IHypermediaProcessor](interfaces/ihypermediaprocessor.md)

___
<a id="instancefactory"></a>

###  InstanceFactory

**Ƭ InstanceFactory**: *`function`*

*Defined in [JsonLd/factories.ts:8](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/factories.ts#L8)*

#### Type declaration
▸(resource: *[IResource](interfaces/iresource.md)*, client: *[IHydraClient](interfaces/ihydraclient.md)*, processingState: *[ProcessingState](classes/processingstate.md)*): [IResource](interfaces/iresource.md)

**Parameters:**

| Name | Type |
| ------ | ------ |
| resource | [IResource](interfaces/iresource.md) |
| client | [IHydraClient](interfaces/ihydraclient.md) |
| processingState | [ProcessingState](classes/processingstate.md) |

**Returns:** [IResource](interfaces/iresource.md)

___
<a id="literal"></a>

###  Literal

**Ƭ Literal**: *`string` \| `boolean` \| `number`*

*Defined in [JsonLd/IPropertyMapping.ts:3](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/IPropertyMapping.ts#L3)*

___
<a id="mappingbuilder"></a>

###  MappingBuilder

**Ƭ MappingBuilder**: *`function`*

*Defined in [DataModel/ITemplatedResource.ts:4](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/ITemplatedResource.ts#L4)*

#### Type declaration
▸(MappingsBuilder: *`any`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| MappingsBuilder | `any` |

**Returns:** `void`

___
<a id="mappingsprocessor"></a>

###  MappingsProcessor

**Ƭ MappingsProcessor**: *`function`*

*Defined in [JsonLd/IPropertyMapping.ts:4](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/IPropertyMapping.ts#L4)*

#### Type declaration
▸(items: *`any`[]*, processingState: *[ProcessingState](classes/processingstate.md)*): `any`

**Parameters:**

| Name | Type |
| ------ | ------ |
| items | `any`[] |
| processingState | [ProcessingState](classes/processingstate.md) |

**Returns:** `any`

___
<a id="notification"></a>

###  Notification

**Ƭ Notification**: *`function`*

*Defined in [JsonLd/ProcessingState.ts:8](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/ProcessingState.ts#L8)*

#### Type declaration
▸(processingState: *[ProcessingState](classes/processingstate.md)*, resource: *[IResource](interfaces/iresource.md)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| processingState | [ProcessingState](classes/processingstate.md) |
| resource | [IResource](interfaces/iresource.md) |

**Returns:** `void`

___

## Variables

<a id="dependenttypes"></a>

### `<Const>` dependentTypes

**● dependentTypes**: *`string`[]* =  [hydra.IriTemplateMapping, hydra.PartialCollectionView]

*Defined in [JsonLd/JsonLdHypermediaProcessor.ts:26](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/JsonLdHypermediaProcessor.ts#L26)*

___
<a id="empty"></a>

### `<Const>` empty

**● empty**: *`any`[]* =  []

*Defined in [DataModel/Collections/FilterableCollection.ts:4](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/Collections/FilterableCollection.ts#L4)*

___
<a id="factories"></a>

### `<Const>` factories

**● factories**: *[IDictionary](interfaces/idictionary.md)<[InstanceFactory](#instancefactory)>*

*Defined in [JsonLd/factories.ts:15](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/factories.ts#L15)*

Provides factory methods for strongly typed resources.

*__const__*: 

*__type__*: {IDictionary}

___
<a id="hydralinks"></a>

### `<Const>` hydraLinks

**● hydraLinks**: *`object`*

*Defined in [JsonLd/linksExtractor.ts:14](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/linksExtractor.ts#L14)*

#### Type declaration

___
<a id="hydranamespace"></a>

### `<Const>` hydraNamespace

**● hydraNamespace**: *"http://www.w3.org/ns/hydra/core#"* = "http://www.w3.org/ns/hydra/core#"

*Defined in [namespaces.ts:5](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L5)*

Defines a Hydra Core Vocabulary namespace IRI.

*__constant__*: {string}

___
<a id="hydraontology"></a>

### `<Const>` hydraOntology

**● hydraOntology**: *`any`* =  require("./JsonLd/hydra.json")

*Defined in [HydraClientFactory.ts:14](https://github.com/alien-mcl/Heracles.ts/blob/master/src/HydraClientFactory.ts#L14)*

___
<a id="jsonldcontext"></a>

### `<Const>` jsonLdContext

**● jsonLdContext**: *"http://www.w3.org/ns/json-ld#context"* = "http://www.w3.org/ns/json-ld#context"

*Defined in [JsonLd/JsonLdHypermediaProcessor.ts:21](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/JsonLdHypermediaProcessor.ts#L21)*

___
<a id="link"></a>

### `<Const>` link

**● link**: *[TypesCollection](classes/typescollection.md)* =  new TypesCollection([hydra.Link])

*Defined in [DataModel/TemplatedLink.ts:11](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedLink.ts#L11)*
*Defined in [JsonLd/collection.ts:9](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/collection.ts#L9)*

___
<a id="literals"></a>

### `<Const>` literals

**● literals**: *`string`[]* =  ["string", "number", "boolean"]

*Defined in [JsonLd/JsonLdHypermediaProcessor.ts:24](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/JsonLdHypermediaProcessor.ts#L24)*

___
<a id="mappings"></a>

### `<Const>` mappings

**● mappings**: *[IDictionary](interfaces/idictionary.md)<[IPropertyMapping](interfaces/ipropertymapping.md)>*

*Defined in [JsonLd/mappings.ts:16](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/mappings.ts#L16)*

Provides simple property mappings to be used when creating resources.

*__const__*: 

*__type__*: {IDictionary}

___
<a id="rdfnamespace"></a>

### `<Const>` rdfNamespace

**● rdfNamespace**: *"http://www.w3.org/1999/02/22-rdf-syntax-ns#"* = "http://www.w3.org/1999/02/22-rdf-syntax-ns#"

*Defined in [namespaces.ts:80](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L80)*

Defines RDF namespace IRI.

*__constant__*: 

___
<a id="rdfsnamespace"></a>

### `<Const>` rdfsNamespace

**● rdfsNamespace**: *"http://www.w3.org/2000/01/rdf-schema#"* = "http://www.w3.org/2000/01/rdf-schema#"

*Defined in [namespaces.ts:97](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L97)*

Defines RDFS namespace IRI.

*__constant__*: 

___
<a id="templatedlink"></a>

### `<Const>` templatedLink

**● templatedLink**: *`string`[]* =  [hydra.TemplatedLink]

*Defined in [DataModel/TemplatedLink.ts:10](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/TemplatedLink.ts#L10)*

___

## Functions

<a id="addto"></a>

###  addTo

▸ **addTo**(collection: *[ICollection](interfaces/icollection.md)[]*, hashList: *`string`[]*, item: *[ICollection](interfaces/icollection.md)*): `void`

*Defined in [DataModel/HypermediaContainer.ts:12](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/HypermediaContainer.ts#L12)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| collection | [ICollection](interfaces/icollection.md)[] |
| hashList | `string`[] |
| item | [ICollection](interfaces/icollection.md) |

**Returns:** `void`

___
<a id="apidocumentation"></a>

###  apiDocumentation

▸ **apiDocumentation**(mappings: *[IDictionary](interfaces/idictionary.md)<[IPropertyMapping](interfaces/ipropertymapping.md)>*): [IDictionary](interfaces/idictionary.md)<[IPropertyMapping](interfaces/ipropertymapping.md)>

*Defined in [JsonLd/apiDocumentation.ts:8](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/apiDocumentation.ts#L8)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| mappings | [IDictionary](interfaces/idictionary.md)<[IPropertyMapping](interfaces/ipropertymapping.md)> |

**Returns:** [IDictionary](interfaces/idictionary.md)<[IPropertyMapping](interfaces/ipropertymapping.md)>

___
<a id="collection"></a>

###  collection

▸ **collection**(mappings: *[IDictionary](interfaces/idictionary.md)<[IPropertyMapping](interfaces/ipropertymapping.md)>*): [IDictionary](interfaces/idictionary.md)<[IPropertyMapping](interfaces/ipropertymapping.md)>

*Defined in [JsonLd/collection.ts:20](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/collection.ts#L20)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| mappings | [IDictionary](interfaces/idictionary.md)<[IPropertyMapping](interfaces/ipropertymapping.md)> |

**Returns:** [IDictionary](interfaces/idictionary.md)<[IPropertyMapping](interfaces/ipropertymapping.md)>

___
<a id="converttoresource"></a>

###  convertToResource

▸ **convertToResource**(item: *`any`*, processingState: *[ProcessingState](classes/processingstate.md)*): [IResource](interfaces/iresource.md)

*Defined in [JsonLd/collection.ts:11](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/collection.ts#L11)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| item | `any` |
| processingState | [ProcessingState](classes/processingstate.md) |

**Returns:** [IResource](interfaces/iresource.md)

___
<a id="createstatefrom"></a>

###  createStateFrom

▸ **createStateFrom**(iri: *`string`*, links: *[LinksCollection](classes/linkscollection.md)*): [IState](interfaces/istate.md)

*Defined in [JsonLd/partialCollectionIteratorFactory.ts:18](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/partialCollectionIteratorFactory.ts#L18)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| iri | `string` |
| links | [LinksCollection](classes/linkscollection.md) |

**Returns:** [IState](interfaces/istate.md)

___
<a id="discovercollectionsfrom"></a>

###  discoverCollectionsFrom

▸ **discoverCollectionsFrom**(hypermedia: *`Iterable`<[IResource](interfaces/iresource.md)>*): [ICollection](interfaces/icollection.md)[]

*Defined in [DataModel/HypermediaContainer.ts:19](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/HypermediaContainer.ts#L19)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| hypermedia | `Iterable`<[IResource](interfaces/iresource.md)> |

**Returns:** [ICollection](interfaces/icollection.md)[]

___
<a id="getpart"></a>

###  getPart

▸ **getPart**(state: *[IState](interfaces/istate.md)*, link: *[ILink](interfaces/ilink.md)*, client: *[IHydraClient](interfaces/ihydraclient.md)*, collectionIri: *`string`*): `Promise`<`Iterable`<[IResource](interfaces/iresource.md)>>

*Defined in [JsonLd/partialCollectionIteratorFactory.ts:31](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/partialCollectionIteratorFactory.ts#L31)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| state | [IState](interfaces/istate.md) |
| link | [ILink](interfaces/ilink.md) |
| client | [IHydraClient](interfaces/ihydraclient.md) |
| collectionIri | `string` |

**Returns:** `Promise`<`Iterable`<[IResource](interfaces/iresource.md)>>

___
<a id="gettargetof"></a>

###  getTargetOf

▸ **getTargetOf**(link: *[ILink](interfaces/ilink.md)*): `string`

*Defined in [JsonLd/partialCollectionIteratorFactory.ts:43](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/partialCollectionIteratorFactory.ts#L43)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| link | [ILink](interfaces/ilink.md) |

**Returns:** `string`

___
<a id="internallinksextractor"></a>

###  internalLinksExtractor

▸ **internalLinksExtractor**(resources: *`any`[]*, processingState: *[ProcessingState](classes/processingstate.md)*): [ILink](interfaces/ilink.md)[]

*Defined in [JsonLd/linksExtractor.ts:66](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/linksExtractor.ts#L66)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| resources | `any`[] |
| processingState | [ProcessingState](classes/processingstate.md) |

**Returns:** [ILink](interfaces/ilink.md)[]

___
<a id="isblank"></a>

###  isBlank

▸ **isBlank**(resource: *`object`*): `boolean`

*Defined in [JsonLd/JsonLdHypermediaProcessor.ts:28](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/JsonLdHypermediaProcessor.ts#L28)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| resource | `object` |

**Returns:** `boolean`

___
<a id="ishydraindependent"></a>

###  isHydraIndependent

▸ **isHydraIndependent**(resource: *`object`*): `boolean`

*Defined in [JsonLd/JsonLdHypermediaProcessor.ts:32](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/JsonLdHypermediaProcessor.ts#L32)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| resource | `object` |

**Returns:** `boolean`

___
<a id="islink"></a>

###  isLink

▸ **isLink**(type: *`any`*): `boolean`

*Defined in [JsonLd/linksExtractor.ts:23](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/linksExtractor.ts#L23)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| type | `any` |

**Returns:** `boolean`

___
<a id="linksandoperations"></a>

###  linksAndOperations

▸ **linksAndOperations**(mappings: *[IDictionary](interfaces/idictionary.md)<[IPropertyMapping](interfaces/ipropertymapping.md)>*): [IDictionary](interfaces/idictionary.md)<[IPropertyMapping](interfaces/ipropertymapping.md)>

*Defined in [JsonLd/linksAndOperations.ts:9](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/linksAndOperations.ts#L9)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| mappings | [IDictionary](interfaces/idictionary.md)<[IPropertyMapping](interfaces/ipropertymapping.md)> |

**Returns:** [IDictionary](interfaces/idictionary.md)<[IPropertyMapping](interfaces/ipropertymapping.md)>

___
<a id="linksextractor"></a>

### `<Const>` linksExtractor

▸ **linksExtractor**(resources: *`any`*, processingState: *`any`*): [LinksCollection](classes/linkscollection.md)

*Defined in [JsonLd/linksExtractor.ts:107](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/linksExtractor.ts#L107)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| resources | `any` |
| processingState | `any` |

**Returns:** [LinksCollection](classes/linkscollection.md)

___
<a id="onlinkmaterialized"></a>

###  onLinkMaterialized

▸ **onLinkMaterialized**(processingState: *[ProcessingState](classes/processingstate.md)*, link: *[ILink](interfaces/ilink.md)*, templateIri: *`string`*, operations: *[IOperation](interfaces/ioperation.md)[]*): `void`

*Defined in [JsonLd/templatedOperationsExtractor.ts:19](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/templatedOperationsExtractor.ts#L19)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| processingState | [ProcessingState](classes/processingstate.md) |
| link | [ILink](interfaces/ilink.md) |
| templateIri | `string` |
| operations | [IOperation](interfaces/ioperation.md)[] |

**Returns:** `void`

___
<a id="ontemplatematerialized"></a>

###  onTemplateMaterialized

▸ **onTemplateMaterialized**(processingState: *[ProcessingState](classes/processingstate.md)*, template: *[IIriTemplate](interfaces/iiritemplate.md)*, linkIri: *`string`*, operations: *[IOperation](interfaces/ioperation.md)[]*): `void`

*Defined in [JsonLd/templatedOperationsExtractor.ts:10](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/templatedOperationsExtractor.ts#L10)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| processingState | [ProcessingState](classes/processingstate.md) |
| template | [IIriTemplate](interfaces/iiritemplate.md) |
| linkIri | `string` |
| operations | [IOperation](interfaces/ioperation.md)[] |

**Returns:** `void`

___
<a id="partialcollectioniteratorfactory"></a>

###  partialCollectionIteratorFactory

▸ **partialCollectionIteratorFactory**(resource: *[IResource](interfaces/iresource.md)*, client: *[IHydraClient](interfaces/ihydraclient.md)*, processingState: *[ProcessingState](classes/processingstate.md)*): [IResource](interfaces/iresource.md)

*Defined in [JsonLd/partialCollectionIteratorFactory.ts:47](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/partialCollectionIteratorFactory.ts#L47)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| resource | [IResource](interfaces/iresource.md) |
| client | [IHydraClient](interfaces/ihydraclient.md) |
| processingState | [ProcessingState](classes/processingstate.md) |

**Returns:** [IResource](interfaces/iresource.md)

___
<a id="rdfschema"></a>

###  rdfSchema

▸ **rdfSchema**(mappings: *[IDictionary](interfaces/idictionary.md)<[IPropertyMapping](interfaces/ipropertymapping.md)>*): [IDictionary](interfaces/idictionary.md)<[IPropertyMapping](interfaces/ipropertymapping.md)>

*Defined in [JsonLd/rdfSchema.ts:8](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/rdfSchema.ts#L8)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| mappings | [IDictionary](interfaces/idictionary.md)<[IPropertyMapping](interfaces/ipropertymapping.md)> |

**Returns:** [IDictionary](interfaces/idictionary.md)<[IPropertyMapping](interfaces/ipropertymapping.md)>

___
<a id="templatedoperationsextractor"></a>

### `<Const>` templatedOperationsExtractor

▸ **templatedOperationsExtractor**(operations: *[IOperation](interfaces/ioperation.md)[]*, processingState: *[ProcessingState](classes/processingstate.md)*): [OperationsCollection](classes/operationscollection.md)

*Defined in [JsonLd/templatedOperationsExtractor.ts:46](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/templatedOperationsExtractor.ts#L46)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| operations | [IOperation](interfaces/ioperation.md)[] |
| processingState | [ProcessingState](classes/processingstate.md) |

**Returns:** [OperationsCollection](classes/operationscollection.md)

___
<a id="trycreateoperationfrom"></a>

###  tryCreateOperationFrom

▸ **tryCreateOperationFrom**(processingState: *[ProcessingState](classes/processingstate.md)*, link: *[ILink](interfaces/ilink.md)*, template: *[IIriTemplate](interfaces/iiritemplate.md)*, operations: *[IOperation](interfaces/ioperation.md)[]*): `void`

*Defined in [JsonLd/templatedOperationsExtractor.ts:28](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/templatedOperationsExtractor.ts#L28)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| processingState | [ProcessingState](classes/processingstate.md) |
| link | [ILink](interfaces/ilink.md) |
| template | [IIriTemplate](interfaces/iiritemplate.md) |
| operations | [IOperation](interfaces/ioperation.md)[] |

**Returns:** `void`

___
<a id="trygetpredicatelinktype"></a>

###  tryGetPredicateLinkType

▸ **tryGetPredicateLinkType**(predicate: *`string`*, processingState: *[ProcessingState](classes/processingstate.md)*): `string`

*Defined in [JsonLd/linksExtractor.ts:27](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/linksExtractor.ts#L27)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| predicate | `string` |
| processingState | [ProcessingState](classes/processingstate.md) |

**Returns:** `string`

___
<a id="trygetresourcelinktype"></a>

###  tryGetResourceLinkType

▸ **tryGetResourceLinkType**(iri: *`string`*, type: *`string`[]*, processingState: *[ProcessingState](classes/processingstate.md)*): `string`

*Defined in [JsonLd/linksExtractor.ts:39](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/linksExtractor.ts#L39)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| iri | `string` |
| type | `string`[] |
| processingState | [ProcessingState](classes/processingstate.md) |

**Returns:** `string`

___
<a id="update"></a>

###  update

▸ **update**(state: *[IState](interfaces/istate.md)*, iri: *`string`*, links: *[LinksCollection](classes/linkscollection.md)*): [IState](interfaces/istate.md)

*Defined in [JsonLd/partialCollectionIteratorFactory.ts:22](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/partialCollectionIteratorFactory.ts#L22)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| state | [IState](interfaces/istate.md) |
| iri | `string` |
| links | [LinksCollection](classes/linkscollection.md) |

**Returns:** [IState](interfaces/istate.md)

___

## Object literals

<a id="jsonldhelper"></a>

### `<Const>` JsonLdHelper

**JsonLdHelper**: *`object`*

*Defined in [JsonLd/JsonLdHelper.ts:3](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/JsonLdHelper.ts#L3)*

<a id="jsonldhelper.validkeys"></a>

####  validKeys

▸ **validKeys**(instance: *`object`*, nonHydra?: *`boolean`*): `Iterable`<`string`>

*Defined in [JsonLd/JsonLdHelper.ts:4](https://github.com/alien-mcl/Heracles.ts/blob/master/src/JsonLd/JsonLdHelper.ts#L4)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| instance | `object` | - |
| `Default value` nonHydra | `boolean` | false |

**Returns:** `Iterable`<`string`>

___

___
<a id="hydra"></a>

### `<Let>` hydra

**hydra**: *`object`*

*Defined in [namespaces.ts:11](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L11)*

Defines Hydra Core Vocabulary terms.

*__constant__*: 

<a id="hydra.apidocumentation"></a>

####  ApiDocumentation

**● ApiDocumentation**: *`string`* =  hydraNamespace + "ApiDocumentation"

*Defined in [namespaces.ts:20](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L20)*

___
<a id="hydra.basicrepresentation"></a>

####  BasicRepresentation

**● BasicRepresentation**: *`string`* =  hydraNamespace + "BasicRepresentation"

*Defined in [namespaces.ts:28](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L28)*

___
<a id="hydra.class"></a>

####  Class

**● Class**: *`string`* =  hydraNamespace + "Class"

*Defined in [namespaces.ts:50](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L50)*

___
<a id="hydra.collection"></a>

####  Collection

**● Collection**: *`string`* =  hydraNamespace + "Collection"

*Defined in [namespaces.ts:41](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L41)*

___
<a id="hydra.iritemplate"></a>

####  IriTemplate

**● IriTemplate**: *`string`* =  hydraNamespace + "IriTemplate"

*Defined in [namespaces.ts:29](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L29)*

___
<a id="hydra.iritemplatemapping"></a>

####  IriTemplateMapping

**● IriTemplateMapping**: *`string`* =  hydraNamespace + "IriTemplateMapping"

*Defined in [namespaces.ts:30](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L30)*

___
<a id="hydra.link"></a>

####  Link

**● Link**: *`string`* =  hydraNamespace + "Link"

*Defined in [namespaces.ts:31](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L31)*

___
<a id="hydra.operation"></a>

####  Operation

**● Operation**: *`string`* =  hydraNamespace + "Operation"

*Defined in [namespaces.ts:60](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L60)*

___
<a id="hydra.partialcollectionview"></a>

####  PartialCollectionView

**● PartialCollectionView**: *`string`* =  hydraNamespace + "PartialCollectionView"

*Defined in [namespaces.ts:42](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L42)*

___
<a id="hydra.resource"></a>

####  Resource

**● Resource**: *`string`* =  hydraNamespace + "Resource"

*Defined in [namespaces.ts:65](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L65)*

___
<a id="hydra.status"></a>

####  Status

**● Status**: *`string`* =  hydraNamespace + "Status"

*Defined in [namespaces.ts:61](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L61)*

___
<a id="hydra.supportedproperty"></a>

####  SupportedProperty

**● SupportedProperty**: *`string`* =  hydraNamespace + "SupportedProperty"

*Defined in [namespaces.ts:51](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L51)*

___
<a id="hydra.templatedlink"></a>

####  TemplatedLink

**● TemplatedLink**: *`string`* =  hydraNamespace + "TemplatedLink"

*Defined in [namespaces.ts:32](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L32)*

___
<a id="hydra.variablerepresentation"></a>

####  VariableRepresentation

**● VariableRepresentation**: *`string`* =  hydraNamespace + "VariableRepresentation"

*Defined in [namespaces.ts:33](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L33)*

___
<a id="hydra.apidocumentation-1"></a>

####  apiDocumentation

**● apiDocumentation**: *`string`* =  hydraNamespace + "apiDocumentation"

*Defined in [namespaces.ts:14](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L14)*

___
<a id="hydra.collection-1"></a>

####  collection

**● collection**: *`string`* =  hydraNamespace + "collection"

*Defined in [namespaces.ts:35](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L35)*

___
<a id="hydra.description"></a>

####  description

**● description**: *`string`* =  hydraNamespace + "description"

*Defined in [namespaces.ts:15](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L15)*

___
<a id="hydra.entrypoint"></a>

####  entrypoint

**● entrypoint**: *`string`* =  hydraNamespace + "entrypoint"

*Defined in [namespaces.ts:16](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L16)*

___
<a id="hydra.expects"></a>

####  expects

**● expects**: *`string`* =  hydraNamespace + "expects"

*Defined in [namespaces.ts:53](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L53)*

___
<a id="hydra.expectsheader"></a>

####  expectsHeader

**● expectsHeader**: *`string`* =  hydraNamespace + "expectsHeader"

*Defined in [namespaces.ts:54](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L54)*

___
<a id="hydra.first"></a>

####  first

**● first**: *`string`* =  hydraNamespace + "first"

*Defined in [namespaces.ts:67](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L67)*

___
<a id="hydra.freetextquery"></a>

####  freetextQuery

**● freetextQuery**: *`string`* =  hydraNamespace + "freetextQuery"

*Defined in [namespaces.ts:68](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L68)*

___
<a id="hydra.last"></a>

####  last

**● last**: *`string`* =  hydraNamespace + "last"

*Defined in [namespaces.ts:69](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L69)*

___
<a id="hydra.mapping"></a>

####  mapping

**● mapping**: *`string`* =  hydraNamespace + "mapping"

*Defined in [namespaces.ts:22](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L22)*

___
<a id="hydra.member"></a>

####  member

**● member**: *`string`* =  hydraNamespace + "member"

*Defined in [namespaces.ts:36](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L36)*

___
<a id="hydra.method"></a>

####  method

**● method**: *`string`* =  hydraNamespace + "method"

*Defined in [namespaces.ts:55](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L55)*

___
<a id="hydra.namespace"></a>

####  namespace

**● namespace**: *`string`* =  hydraNamespace

*Defined in [namespaces.ts:12](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L12)*

___
<a id="hydra.next"></a>

####  next

**● next**: *`string`* =  hydraNamespace + "next"

*Defined in [namespaces.ts:70](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L70)*

___
<a id="hydra.operation-1"></a>

####  operation

**● operation**: *`string`* =  hydraNamespace + "operation"

*Defined in [namespaces.ts:63](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L63)*

___
<a id="hydra.pageindex"></a>

####  pageIndex

**● pageIndex**: *`string`* =  hydraNamespace + "pageIndex"

*Defined in [namespaces.ts:37](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L37)*

___
<a id="hydra.pagereference"></a>

####  pageReference

**● pageReference**: *`string`* =  hydraNamespace + "pageReference"

*Defined in [namespaces.ts:38](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L38)*

___
<a id="hydra.possiblestatus"></a>

####  possibleStatus

**● possibleStatus**: *`string`* =  hydraNamespace + "possibleStatus"

*Defined in [namespaces.ts:56](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L56)*

___
<a id="hydra.previous"></a>

####  previous

**● previous**: *`string`* =  hydraNamespace + "previous"

*Defined in [namespaces.ts:71](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L71)*

___
<a id="hydra.property"></a>

####  property

**● property**: *`string`* =  hydraNamespace + "property"

*Defined in [namespaces.ts:23](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L23)*

___
<a id="hydra.readable"></a>

####  readable

**● readable**: *`string`* =  hydraNamespace + "readable"

*Defined in [namespaces.ts:44](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L44)*

___
<a id="hydra.required"></a>

####  required

**● required**: *`string`* =  hydraNamespace + "required"

*Defined in [namespaces.ts:45](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L45)*

___
<a id="hydra.returns"></a>

####  returns

**● returns**: *`string`* =  hydraNamespace + "returns"

*Defined in [namespaces.ts:57](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L57)*

___
<a id="hydra.returnsheader"></a>

####  returnsHeader

**● returnsHeader**: *`string`* =  hydraNamespace + "returnsHeader"

*Defined in [namespaces.ts:58](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L58)*

___
<a id="hydra.search"></a>

####  search

**● search**: *`string`* =  hydraNamespace + "search"

*Defined in [namespaces.ts:72](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L72)*

___
<a id="hydra.supportedclass"></a>

####  supportedClass

**● supportedClass**: *`string`* =  hydraNamespace + "supportedClass"

*Defined in [namespaces.ts:17](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L17)*

___
<a id="hydra.supportedoperation"></a>

####  supportedOperation

**● supportedOperation**: *`string`* =  hydraNamespace + "supportedOperation"

*Defined in [namespaces.ts:46](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L46)*

___
<a id="hydra.supportedproperty-1"></a>

####  supportedProperty

**● supportedProperty**: *`string`* =  hydraNamespace + "supportedProperty"

*Defined in [namespaces.ts:47](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L47)*

___
<a id="hydra.template"></a>

####  template

**● template**: *`string`* =  hydraNamespace + "template"

*Defined in [namespaces.ts:24](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L24)*

___
<a id="hydra.title"></a>

####  title

**● title**: *`string`* =  hydraNamespace + "title"

*Defined in [namespaces.ts:18](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L18)*

___
<a id="hydra.totalitems"></a>

####  totalItems

**● totalItems**: *`string`* =  hydraNamespace + "totalItems"

*Defined in [namespaces.ts:39](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L39)*

___
<a id="hydra.variable"></a>

####  variable

**● variable**: *`string`* =  hydraNamespace + "variable"

*Defined in [namespaces.ts:25](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L25)*

___
<a id="hydra.variablerepresentation-1"></a>

####  variableRepresentation

**● variableRepresentation**: *`string`* =  hydraNamespace + "variableRepresentation"

*Defined in [namespaces.ts:26](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L26)*

___
<a id="hydra.view"></a>

####  view

**● view**: *`string`* =  hydraNamespace + "view"

*Defined in [namespaces.ts:73](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L73)*

___
<a id="hydra.writeable"></a>

####  writeable

**● writeable**: *`string`* =  hydraNamespace + "writeable"

*Defined in [namespaces.ts:48](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L48)*

___

___
<a id="rdf"></a>

### `<Let>` rdf

**rdf**: *`object`*

*Defined in [namespaces.ts:86](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L86)*

Defines useful RDF terms.

*__constant__*: 

<a id="rdf.property"></a>

####  Property

**● Property**: *`string`* =  rdfNamespace + "Property"

*Defined in [namespaces.ts:89](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L89)*

___
<a id="rdf.namespace"></a>

####  namespace

**● namespace**: *`string`* =  rdfNamespace

*Defined in [namespaces.ts:87](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L87)*

___
<a id="rdf.type"></a>

####  type

**● type**: *`string`* =  rdfNamespace + "type"

*Defined in [namespaces.ts:90](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L90)*

___

___
<a id="rdfs"></a>

### `<Let>` rdfs

**rdfs**: *`object`*

*Defined in [namespaces.ts:103](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L103)*

Defines useful RDFS terms.

*__constant__*: 

<a id="rdfs.comment"></a>

####  comment

**● comment**: *`string`* =  rdfsNamespace + "comment"

*Defined in [namespaces.ts:106](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L106)*

___
<a id="rdfs.domain"></a>

####  domain

**● domain**: *`string`* =  rdfsNamespace + "domain"

*Defined in [namespaces.ts:107](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L107)*

___
<a id="rdfs.label"></a>

####  label

**● label**: *`string`* =  rdfsNamespace + "label"

*Defined in [namespaces.ts:108](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L108)*

___
<a id="rdfs.namespace"></a>

####  namespace

**● namespace**: *`string`* =  rdfsNamespace

*Defined in [namespaces.ts:104](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L104)*

___
<a id="rdfs.range"></a>

####  range

**● range**: *`string`* =  rdfsNamespace + "range"

*Defined in [namespaces.ts:109](https://github.com/alien-mcl/Heracles.ts/blob/master/src/namespaces.ts#L109)*

___

___

