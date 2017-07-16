
# Heracles.ts

Reference implementation of a Hydra client in TypeScript.



## Index

### Classes

* [ApiDocumentation](classes/apidocumentation.md)
* [HydraClient](classes/hydraclient.md)
* [JsonLdHypermediaProcessor](classes/jsonldhypermediaprocessor.md)


### Interfaces

* [IApiDocumentation](interfaces/iapidocumentation.md)
* [IClass](interfaces/iclass.md)
* [IHydraResource](interfaces/ihydraresource.md)
* [IHypermedia](interfaces/ihypermedia.md)
* [IHypermediaProcessor](interfaces/ihypermediaprocessor.md)
* [IOperation](interfaces/ioperation.md)
* [IResource](interfaces/iresource.md)
* [IWebResource](interfaces/iwebresource.md)


### Variables

* [context](#context)
* [hydra](#hydra)
* [jsonLd](#jsonld)
* [jsonld](#jsonld)



---
# Variables
<a id="context"></a>

###  context

**●  context**:  *`any`*  =  require("./context.json")

*Defined in [src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts:6](https://github.com/HydraCG/Heracles.ts/blob/master/src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts#L6)*





___

<a id="hydra"></a>

###  hydra

**●  hydra**:  *`any`*  =  new String("http://www.w3.org/ns/hydra/core#")

*Defined in [src/namespaces.ts:1](https://github.com/HydraCG/Heracles.ts/blob/master/src/namespaces.ts#L1)*





___

<a id="jsonld"></a>

###  jsonLd

**●  jsonLd**:  *`any`*  =  require("jsonld").promises

*Defined in [src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts:5](https://github.com/HydraCG/Heracles.ts/blob/master/src/DataModel/JsonLd/JsonLdHypermediaProcessor.ts#L5)*





___

<a id="jsonld"></a>

###  jsonld

**●  jsonld**:  *`any`*  =  require("jsonld")

*Defined in [src/HydraClient.ts:7](https://github.com/HydraCG/Heracles.ts/blob/master/src/HydraClient.ts#L7)*





___


