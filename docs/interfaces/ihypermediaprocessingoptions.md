[@hydra-cg/heracles.ts](../README.md) > [IHypermediaProcessingOptions](../interfaces/ihypermediaprocessingoptions.md)

# Interface: IHypermediaProcessingOptions

Describes a [IHypermediaProcessor](ihypermediaprocessor.md) processing options.

## Hierarchy

**IHypermediaProcessingOptions**

## Index

### Properties

* [auxiliaryOriginalUrl](ihypermediaprocessingoptions.md#auxiliaryoriginalurl)
* [auxiliaryResponse](ihypermediaprocessingoptions.md#auxiliaryresponse)
* [linksPolicy](ihypermediaprocessingoptions.md#linkspolicy)
* [originalUrl](ihypermediaprocessingoptions.md#originalurl)

---

## Properties

<a id="auxiliaryoriginalurl"></a>

### `<Optional>` auxiliaryOriginalUrl

**● auxiliaryOriginalUrl**: *`string`*

*Defined in [IHypermediaProcessingOptions.ts:34](https://github.com/alien-mcl/Heracles.ts/blob/master/src/IHypermediaProcessingOptions.ts#L34)*

Gets an original auxiliary Url requested that was used to obtain currently processed one. This property should be set in case [auxiliaryResponse](ihypermediaprocessingoptions.md#auxiliaryresponse) is also set.

*__readonly__*: 

*__returns__*: 

___
<a id="auxiliaryresponse"></a>

### `<Optional>` auxiliaryResponse

**● auxiliaryResponse**: *`Response`*

*Defined in [IHypermediaProcessingOptions.ts:26](https://github.com/alien-mcl/Heracles.ts/blob/master/src/IHypermediaProcessingOptions.ts#L26)*

Gets an auxiliary response that was used to obtain currently processed one.

*__readonly__*: 

*__returns__*: 

___
<a id="linkspolicy"></a>

###  linksPolicy

**● linksPolicy**: *[LinksPolicy](../enums/linkspolicy.md)*

*Defined in [IHypermediaProcessingOptions.ts:12](https://github.com/alien-mcl/Heracles.ts/blob/master/src/IHypermediaProcessingOptions.ts#L12)*

Gets a policy defining which related resources will be added to links collection.

*__readonly__*: 

*__returns__*: 

___
<a id="originalurl"></a>

###  originalUrl

**● originalUrl**: *`string`*

*Defined in [IHypermediaProcessingOptions.ts:19](https://github.com/alien-mcl/Heracles.ts/blob/master/src/IHypermediaProcessingOptions.ts#L19)*

Gets an originally requested Url. This may be different than the one provided in the Response.url after redirects.

*__readonly__*: 

*__returns__*: 

___

