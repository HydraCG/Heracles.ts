[@hydra-cg/heracles.ts](../README.md) > [ICrawlingOptions](../interfaces/icrawlingoptions.md)

# Interface: ICrawlingOptions

Describes {@link PartialCollectionCrawler.getMoreMembersStartingFrom(IPartialCollectionView)} crawling options.

*__interface__*: 

## Hierarchy

**ICrawlingOptions**

## Index

### Properties

* [direction](icrawlingoptions.md#direction)
* [memberLimit](icrawlingoptions.md#memberlimit)
* [requestLimit](icrawlingoptions.md#requestlimit)
* [rewind](icrawlingoptions.md#rewind)

---

## Properties

<a id="direction"></a>

### `<Optional>` direction

**● direction**: *[CrawlingDirection](../enums/crawlingdirection.md)*

*Defined in [PartialCollectionCrawler.ts:31](https://github.com/alien-mcl/Heracles.ts/blob/master/src/PartialCollectionCrawler.ts#L31)*

The crawling direction.

*__readonly__*: 

*__returns__*: 

___
<a id="memberlimit"></a>

### `<Optional>` memberLimit

**● memberLimit**: *`number`*

*Defined in [PartialCollectionCrawler.ts:37](https://github.com/alien-mcl/Heracles.ts/blob/master/src/PartialCollectionCrawler.ts#L37)*

The limit of the members to retrieve.

*__readonly__*: 

*__returns__*: 

___
<a id="requestlimit"></a>

### `<Optional>` requestLimit

**● requestLimit**: *`number`*

*Defined in [PartialCollectionCrawler.ts:44](https://github.com/alien-mcl/Heracles.ts/blob/master/src/PartialCollectionCrawler.ts#L44)*

The limit of requests to make.

*__readonly__*: 

*__returns__*: 

___
<a id="rewind"></a>

### `<Optional>` rewind

**● rewind**: *`boolean`*

*Defined in [PartialCollectionCrawler.ts:52](https://github.com/alien-mcl/Heracles.ts/blob/master/src/PartialCollectionCrawler.ts#L52)*

Value indicating whether to rewind back to the beginning (or end) of the collection in case the starting point was not the first (or last) possible view.

*__readonly__*: 

*__returns__*: 

___

