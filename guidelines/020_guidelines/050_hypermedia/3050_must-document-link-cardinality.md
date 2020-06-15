---
type: MUST
id: R100063
---

# document link cardinality

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
