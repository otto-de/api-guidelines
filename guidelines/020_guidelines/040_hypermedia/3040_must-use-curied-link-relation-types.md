---
type: MUST
id: R100038
---

# use curied link relation types

::: warning
This rule applies to public APIs. For private APIs it should be followed.
  :::

Custom link relation types can be introduced, if no [IANA-registered](./guidelines/020_guidelines/040_hypermedia/3020_must-prefer-iana-registered-link-relation-types.md) or [existing custom](./guidelines/020_guidelines/040_hypermedia/3010_must-prefer-existing-custom-link-relation-types.md) link relation type is matching the semantics of a link.
In this case the rule [MUST use absolute URLs for custom link relation types](./guidelines/020_guidelines/040_hypermedia/3030_must-use-absolute-urls-for-custom-link-relation-types.md) must be adhered to.

A resource that links to other resources using a custom link relation type must add `curies` with `"name": "o"` and `"href": "https://api.otto.de/link-relations/{rel}"` to its `_links` section:

```json
{
  "_links": {
    "self": { "href": "https://api.otto.de/orders?page=2&pageSize=10" },
    "curies": [
      {
        "name": "o",
        "href": "https://api.otto.de/link-relations/{rel}",
        "templated": true
      }
    ]
  }
}
```

Links to a resource with a custom link relation type must be curied using this CURI:

```json
{
  "_links": {
    "self": { "href": "https://api.otto.de/orders?page=2&pageSize=10" },
    "curies": [
      {
        "name": "o",
        "href": "https://api.otto.de/link-relations/{rel}",
        "templated": true
      }
    ],
    "o:order": [
      { "href": "https://api.otto.de/orders/4711" },
      { "href": "https://api.otto.de/orders/0815" }
    ]
  }
}
```

If the linked resources [can be embedded](./guidelines/020_guidelines/060_resources/1010_should-embed-subresources.md) into the response, the service should use the same link relation type that is used to link the subresources:

```json
{
  "_links": {
    "self": { "href": "https://api.otto.de/orders?page=2&pageSize=10" },
    "curies": [
      {
        "name": "o",
        "href": "https://api.otto.de/link-relations/{rel}",
        "templated": true
      }
    ],
    "o:order": [
      { "href": "https://api.otto.de/orders/4711" },
      { "href": "https://api.otto.de/orders/0815" }
    ]
  },
  "_embedded": {
    "o:order": [
      {
        "_links": {
          "self": { "href": "https://api.otto.de/orders/4711" },
          "collection": { "href": "https://api.otto.de/orders" }
        },
        "id": "4711",
        "total": 4200
      },
      {
        "_links": {
          "self": { "href": "https://api.otto.de/orders/0815" },
          "collection": { "href": "https://api.otto.de/orders" }
        },
        "id": "0815",
        "total": 12900
      }
    ]
  }
}
```

::: references

- [MUST implement REST maturity level 2 for private APIs](./guidelines/020_guidelines/040_hypermedia/1010_must-implement-rest-maturity-level-2-for-private-apis.md)
- [MUST implement REST maturity level 3 for public APIs](./guidelines/020_guidelines/040_hypermedia/1020_must-implement-rest-maturity-level-3-for-public-apis.md)
- [MUST prefer IANA-registered link relation types](./guidelines/020_guidelines/040_hypermedia/3020_must-prefer-iana-registered-link-relation-types.md)
- [MUST prefer existing custom link relation types](./guidelines/020_guidelines/040_hypermedia/3010_must-prefer-existing-custom-link-relation-types.md)
- [MUST use absolute URLs for custom link relation types](./guidelines/020_guidelines/040_hypermedia/3030_must-use-absolute-urls-for-custom-link-relation-types.md)
  :::
