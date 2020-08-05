---
type: MUST
id: R100063
---

# document link cardinality

::: warning Public APIs only
This rule only applies to public APIs. For private APIs, this rule SHOULD be followed.

See also:

- [MUST implement REST maturity level 2 for private APIs](../050_hypermedia/1010_must-implement-rest-maturity-level-2-for-private-apis.md)
- [MUST implement REST maturity level 3 for public APIs](../050_hypermedia/1020_must-implement-rest-maturity-level-3-for-public-apis.md)
:::

The HAL `_links` object is an object whose property names are link relation types and values are either a link object:
```json
{
  "_links": {
    "author": { "href": "http://api.otto.de/users/42" }
  }
}
```   
...or an array of link objects:
```json
{
  "_links": {
    "item": [
      { "href": "http://api.otto.de/products/4711" },
      { "href": "http://api.otto.de/products/0815" }
    ]
  }
}
```  

In order to simplify the implementation of API clients, the client must know, which link relation types will contain
single link objects, and which will contain an array of link objects. Because of this, every profile MUST document the
cardinality of the link relation types used in the profile.

