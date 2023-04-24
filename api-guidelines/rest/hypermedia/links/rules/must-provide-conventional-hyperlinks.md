---
id: R100033
---

# MUST provide conventional hyperlinks

::: info Info
This rule applies to APIs that have to comply with [REST maturity level 3](../../maturity-level/rules/must-implement-rest-maturity-level-3-for-transitional-apis.md).
:::

Hyperlinks to other resources [must use HAL](../../maturity-level/rules/must-use-hal-to-implement-rest-maturity-level-3.md).

The following links must be contained in HAL representations:

- `self`: The _canonical_ hyperlink of the resource.
- `collection`: For items contained in a collection resource, this link should point to the collection. In most cases, this
  link will be [templated](https://tools.ietf.org/html/draft-kelly-json-hal-08#section-5.2).
- `search`: For searchable collection resources, a [templated](https://tools.ietf.org/html/draft-kelly-json-hal-08#section-5.2) link should be added that refers to the collection including all template parameters.

Example of a [paged collection](../../../resources/collection-resources/rules/must-provide-metadata-for-offset-based-pagination.md) resource:

```json
{
  "_links": {
    "self": { "href": "https://api.otto.de/orders?page=2&pageSize=10" },
    "search": {
      "href": "https://api.otto.de/orders{?q,page,pageSize}",
      "templated": true
    },
    "item": [{ "href": "https://api.otto.de/orders/4711" }]
  },
  "_page": {
    "size": 10,
    "number": 2,
    "totalElements": 21,
    "totalPages": 3
  }
}
```

Example of a `collection item`:

```json
{
  "_links": {
    "self": { "href": "https://api.otto.de/orders/4711" },
    "collection": {
      "href": "https://api.otto.de/orders{?q,page,pageSize}",
      "templated": true
    }
  },
  "total": 3000,
  "currency": "EUR",
  "status": "shipped"
}
```

::: references

- [MUST implement REST maturity level 2](../../maturity-level/rules/must-implement-rest-maturity-level-2.md)
- [MUST implement REST maturity level 3 for transitional APIs](../../maturity-level/rules/must-implement-rest-maturity-level-3-for-transitional-apis.md)
- [MUST support hypermedia controls in collection resources](./must-support-hypermedia-controls-in-collection-resources.md)
- [Link-Relation Types](../../README.md#link-relation-types)
- [IANA link relations](http://www.iana.org/assignments/link-relations/link-relations.xhtml)
- [REST lesson learned: consider a self link on all resources](https://blog.ploeh.dk/2013/05/03/rest-lesson-learned-consider-a-self-link-on-all-resources/)
  :::
