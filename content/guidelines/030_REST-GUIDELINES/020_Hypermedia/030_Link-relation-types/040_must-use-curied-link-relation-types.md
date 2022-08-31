---
type: MUST
id: R100038
---

# use curied link relation types

::: warning
This rule applies to APIs that have to comply with [REST maturity level 3](@guidelines/R000033).
:::

Custom link relation types can be introduced if no [IANA-registered](@guidelines/R100036) or [existing custom](@guidelines/R100035) link relation type matches the semantics of a link.
In this case, the rule [MUST use absolute URLs for custom link relation types](@guidelines/R100037) must be adhered to.

A resource that uses custom link relation types to link to other resources must have a `curies` array in its `_links` property. OTTO API curie objects inside this array must have the property `href` with a value in the form of `https://api.otto.de/portal/link-relations/{context-id}/{rel}`.

```json
{
  "_links": {
    "self": { "href": "https://api.otto.de/orders?page=2&pageSize=10" },
    "curies": [
      {
        "name": "o",
        "href": "https://api.otto.de/portal/link-relations/orders/{rel}",
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
        "href": "https://api.otto.de/portal/link-relations/orders/{rel}",
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

If the linked resources [can be embedded](@guidelines/R000041) into the response, the service should use the same link relation type that is used to link the subresources:

```json
{
  "_links": {
    "self": { "href": "https://api.otto.de/orders?page=2&pageSize=10" },
    "curies": [
      {
        "name": "o",
        "href": "https://api.otto.de/portal/link-relations/orders/{rel}",
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

- [MUST implement REST maturity level 2](@guidelines/R000032)
- [MUST implement REST maturity level 3 for transitional APIs](@guidelines/R000033)
- [MUST prefer IANA-registered link relation types](@guidelines/R100036)
- [MUST prefer existing custom link relation types](@guidelines/R100035)
- [MUST use absolute URLs for custom link relation types](@guidelines/R100037)
  :::
