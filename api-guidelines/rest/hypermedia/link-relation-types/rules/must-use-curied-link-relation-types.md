---
id: R100038
---

# MUST use curied link relation types

::: info Info
This rule applies to APIs that have to comply with [REST maturity level 3](../../maturity-level/rules/must-implement-rest-maturity-level-3-for-transitional-apis.md).
:::

A resource that uses [custom link relation types](./must-use-absolute-uris-for-custom-link-relation-types.md) to link to other resources must have a `curies` array in its `_links` property.
Curie objects inside this array must have a templated property `href`.

```json
{
  "_links": {
    "self": { "href": "https://api.otto.de/orders?page=2&pageSize=10" },
    "curies": [
      {
        "name": "o",
        "href": "https://api.otto.de/portal/link-relations#{rel}",
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
        "href": "https://api.otto.de/portal/link-relations#{rel}",
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

If the linked resources [can be embedded](../../../resources/embedded-resources/rules/should-embed-subresources.md) into the response, the service should use the same link relation type that is used to link the subresources:

```json
{
  "_links": {
    "self": { "href": "https://api.otto.de/orders?page=2&pageSize=10" },
    "curies": [
      {
        "name": "o",
        "href": "https://api.otto.de/portal/link-relations#{rel}",
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

- [MUST implement REST maturity level 2](../../maturity-level/rules/must-implement-rest-maturity-level-2.md)
- [MUST implement REST maturity level 3 for transitional APIs](../../maturity-level/rules/must-implement-rest-maturity-level-3-for-transitional-apis.md)
- [MUST prefer IANA-registered link relation types](./must-prefer-iana-registered-link-relation-types.md)
- [MUST prefer existing custom link relation types](./must-prefer-existing-custom-link-relation-types.md)
- [MUST use absolute URIs for custom link relation types](./must-use-absolute-uris-for-custom-link-relation-types.md)
  :::
