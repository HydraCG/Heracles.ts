[@hydra-cg/heracles.ts](../README.md) > [LinksPolicy](../enums/linkspolicy.md)

# Enumeration: LinksPolicy

Defines possible links policies.

## Index

### Enumeration members

* [All](linkspolicy.md#all)
* [AllHttp](linkspolicy.md#allhttp)
* [SameRoot](linkspolicy.md#sameroot)
* [Strict](linkspolicy.md#strict)

---

## Enumeration members

<a id="all"></a>

###  All

**All**: 

*Defined in [LinksPolicy.ts:27](https://github.com/alien-mcl/Heracles.ts/blob/master/src/LinksPolicy.ts#L27)*

Defines that all non-blank resources in a relation are considered a link.

*__enum__*: 

___
<a id="allhttp"></a>

###  AllHttp

**AllHttp**: 

*Defined in [LinksPolicy.ts:21](https://github.com/alien-mcl/Heracles.ts/blob/master/src/LinksPolicy.ts#L21)*

Defines that all non-blank HTTP/HTTPS resources in a relation are considered a link.

*__enum__*: 

___
<a id="sameroot"></a>

###  SameRoot

**SameRoot**: 

*Defined in [LinksPolicy.ts:15](https://github.com/alien-mcl/Heracles.ts/blob/master/src/LinksPolicy.ts#L15)*

Defines that all resources in a relation pointing to the same protocol, host and port are considered a link.

*__enum__*: 

___
<a id="strict"></a>

###  Strict

**Strict**: 

*Defined in [LinksPolicy.ts:9](https://github.com/alien-mcl/Heracles.ts/blob/master/src/LinksPolicy.ts#L9)*

Defines that only predicates that are marked with hydra:Link or hydra:TemplatedLink are considered a link.

*__enum__*: 

___

