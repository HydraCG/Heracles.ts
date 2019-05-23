[@hydra-cg/heracles.ts](../README.md) > [PartialCollectionCrawler](../classes/partialcollectioncrawler.md)

# Class: PartialCollectionCrawler

Provides capability of crawling through partial collection views.

## Hierarchy

**PartialCollectionCrawler**

## Index

### Constructors

* [constructor](partialcollectioncrawler.md#constructor)

### Properties

* [collection](partialcollectioncrawler.md#collection)

### Methods

* [addWithLimitReached](partialcollectioncrawler.md#addwithlimitreached)
* [getMembers](partialcollectioncrawler.md#getmembers)
* [from](partialcollectioncrawler.md#from)

---

## Constructors

<a id="constructor"></a>

### `<Private>` constructor

⊕ **new PartialCollectionCrawler**(collection: *[ICollection](../interfaces/icollection.md)*): [PartialCollectionCrawler](partialcollectioncrawler.md)

*Defined in [PartialCollectionCrawler.ts:59](https://github.com/alien-mcl/Heracles.ts/blob/master/src/PartialCollectionCrawler.ts#L59)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| collection | [ICollection](../interfaces/icollection.md) |

**Returns:** [PartialCollectionCrawler](partialcollectioncrawler.md)

___

## Properties

<a id="collection"></a>

### `<Private>` collection

**● collection**: *[ICollection](../interfaces/icollection.md)*

*Defined in [PartialCollectionCrawler.ts:59](https://github.com/alien-mcl/Heracles.ts/blob/master/src/PartialCollectionCrawler.ts#L59)*

___

## Methods

<a id="addwithlimitreached"></a>

### `<Private>` addWithLimitReached

▸ **addWithLimitReached**(result: *[IResource](../interfaces/iresource.md)[]*, part: *`Iterable`<[IResource](../interfaces/iresource.md)>*, memberLimit: *`number`*): `boolean`

*Defined in [PartialCollectionCrawler.ts:117](https://github.com/alien-mcl/Heracles.ts/blob/master/src/PartialCollectionCrawler.ts#L117)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| result | [IResource](../interfaces/iresource.md)[] |
| part | `Iterable`<[IResource](../interfaces/iresource.md)> |
| memberLimit | `number` |

**Returns:** `boolean`

___
<a id="getmembers"></a>

###  getMembers

▸ **getMembers**(options?: *[ICrawlingOptions](../interfaces/icrawlingoptions.md)*): `Promise`<`Iterable`<[IResource](../interfaces/iresource.md)>>

*Defined in [PartialCollectionCrawler.ts:79](https://github.com/alien-mcl/Heracles.ts/blob/master/src/PartialCollectionCrawler.ts#L79)*

Crawls partial collection views starting with a given one.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` options | [ICrawlingOptions](../interfaces/icrawlingoptions.md) |  Crawling options. |

**Returns:** `Promise`<`Iterable`<[IResource](../interfaces/iresource.md)>>

___
<a id="from"></a>

### `<Static>` from

▸ **from**(collection: *[ICollection](../interfaces/icollection.md)*): [PartialCollectionCrawler](partialcollectioncrawler.md)

*Defined in [PartialCollectionCrawler.ts:70](https://github.com/alien-mcl/Heracles.ts/blob/master/src/PartialCollectionCrawler.ts#L70)*

Creates a new instance of the [PartialCollectionCrawler](partialcollectioncrawler.md) from a given partial collection view.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| collection | [ICollection](../interfaces/icollection.md) |  Partial collection view to start with. |

**Returns:** [PartialCollectionCrawler](partialcollectioncrawler.md)

___

