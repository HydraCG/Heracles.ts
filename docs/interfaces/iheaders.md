[@hydra-cg/heracles.ts](../README.md) > [IHeaders](../interfaces/iheaders.md)

# Interface: IHeaders

Describes an abstract headers collection.

*__interface__*: 

## Hierarchy

**IHeaders**

## Index

### Methods

* [get](iheaders.md#get)
* [has](iheaders.md#has)

---

## Methods

<a id="get"></a>

###  get

▸ **get**(name: *`string`*): `string` \| `null`

*Defined in [DataModel/IHeaders.ts:11](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IHeaders.ts#L11)*

Gets a header of a given name.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| name | `string` |  Name of the header to obtain. |

**Returns:** `string` \| `null`

___
<a id="has"></a>

###  has

▸ **has**(name: *`string`*): `boolean`

*Defined in [DataModel/IHeaders.ts:18](https://github.com/alien-mcl/Heracles.ts/blob/master/src/DataModel/IHeaders.ts#L18)*

Checks whether the collection has a header of a given name.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| name | `string` |  Name of the header to check for existence. |

**Returns:** `boolean`

___

