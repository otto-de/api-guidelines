---
id: R100033
---

# MUST provide conventional hyperlinks

::: info Info
This rule applies to APIs that have to comply with [REST maturity level 3](/guidelines/r000033).
:::

Hyperlinks to other resources [must use HAL](/guidelines/r000036).

The following links must be contained in HAL representations:

- `self`: The _canonical_ hyperlink of the resource.
- `collection`: For items contained in a collection resource, this link should point to the collection. In most cases, this
  link will be [templated](https://tools.ietf.org/html/draft-kelly-json-hal-08#section-5.2).
- `search`: For searchable collection resources, a [templated](https://tools.ietf.org/html/draft-kelly-json-hal-08#section-5.2) link should be added that refers to the collection including all template parameters.

Example of a [paged collection](/guidelines/r100025) resource:

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

- [MUST implement REST maturity level 2](/guidelines/r000032)
- [MUST implement REST maturity level 3 for transitional APIs](/guidelines/r000033)
- [MUST support hypermedia controls in collection resources](/guidelines/r100026)
- [Link-Relation Types](/guidelines/rest-guidelines/hypermedia#link-relation-types)
- [IANA link relations](http://www.iana.org/assignments/link-relations/link-relations.xhtml)
- [REST lesson learned: consider a self link on all resources](https://blog.ploeh.dk/2013/05/03/rest-lesson-learned-consider-a-self-link-on-all-resources/)
  :::
