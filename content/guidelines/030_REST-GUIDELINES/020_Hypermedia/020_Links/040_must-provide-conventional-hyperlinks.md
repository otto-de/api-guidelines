---
type: MUST
id: R100033
---

# provide conventional hyperlinks

::: info Info
This rule applies to APIs that have to comply with [REST maturity level 3](@guidelines/R000033).
:::

Hyperlinks to other resources [must use HAL](@guidelines/R000036).

The following links must be contained in HAL representations:

- `self`: The _canonical_ hyperlink of the resource.
- `profile`: The fully qualified link pointing to the `profile` of the resource, if any. The link [must resolve to some
  human-readable documentation](@guidelines/R100066) of the profile. The `profile` is omitted
  if the resource does not have any custom properties beside HAL `_links` and `_embedded` elements. [Collection
  resources](../../030_Resources/020_Collection-resources/index.md), for example, might only be plain `application/hal+json`
  representations without any custom attributes.
- `collection`: For items contained in a collection resource, this link should point to the collection. In most cases, this
  link will be [templated](https://tools.ietf.org/html/draft-kelly-json-hal-08#section-5.2).
- `search`: For searchable collection resources, a [templated](https://tools.ietf.org/html/draft-kelly-json-hal-08#section-5.2) link should be added that refers to the collection including all template parameters.

Example of a [paged collection](@guidelines/R100025) resource:

```json
{
  "_links": {
    "self": { "href": "https://api.otto.de/orders?page=2&pageSize=10" },
    "profile": {
      "href": "https://api.otto.de/portal/profiles/orders/paged-collection+v1"
    },
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
    "profile": {
      "href": "https://api.otto.de/portal/profiles/orders/order+v1"
    },
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

- [MUST implement REST maturity level 2](@guidelines/R000032)
- [MUST implement REST maturity level 3 for transitional APIs](@guidelines/R000033)
- [MUST support hypermedia controls in collection resources](@guidelines/R100026)
- [Link-Relation Types](../030_Link-relation-types/index.md)
- [IANA link relations](http://www.iana.org/assignments/link-relations/link-relations.xhtml)
- [REST lesson learned: consider a self link on all resources](https://blog.ploeh.dk/2013/05/03/rest-lesson-learned-consider-a-self-link-on-all-resources/)
  :::
