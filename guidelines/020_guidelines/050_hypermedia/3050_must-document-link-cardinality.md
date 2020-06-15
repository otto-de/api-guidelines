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

The HAL `_links` object is an object whose property names are link relation types and values are either a link object 
or an array of link objects.

Every profile MUST document whether a link relation type contains a single link object, or an array of link objects.

For example, a collection resource containing links to products using a [curied](./3040_must-use-curied-rels.md) 
link-relation type 'o:product' MUST document, that `o:product` is an array of link objects:

`Note`{ label } By definition, the `curies` link relation type *always* contains an array of link objects, even if only a single curi is defined.

```json
{
  "_links": {
    "self": { "href": "https://api.otto.de/products?page=2&pageSize=10" },
    "curies": [
      {
        "name": "o",
        "href": "https://api.otto.de/link-relations/{rel}",
        "templated": true
      }
    ],
    "o:product": [
      { "href": "http://api.otto.de/products/4711" }
    ]
  }
}
```  
