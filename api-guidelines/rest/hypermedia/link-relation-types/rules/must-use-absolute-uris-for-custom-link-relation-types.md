---
id: R100037
---

# MUST use absolute URIs for custom link relation types

::: info Info
This rule applies to APIs that have to comply with [REST maturity level 3](/guidelines/r000033).
:::

Custom link relations must be absolute URIs (as defined in [RFC 5988](https://datatracker.ietf.org/doc/html/rfc5988#section-4.2)) and documented in the OpenAPI specification.

The URI used as the link relation type must be treated as an identifier that should not change.
While encouraged, it does not need to be resolvable.
If the URI is resolvable, it should provide human-readable documentation of the link relation type.

The URI should be in the same URL namespace as the API endpoints.
For example, if all API endpoints are located at `https://api.otto.de/payment/`, the custom link relation URIs should als be located at the same context path (e.g., `https://api.otto.de/payment/link-relations/payment-method`).

Here's an example of an uncuried link relation that serves for demonstration only.
In your APIs, you [must use curied link relation types](/guidelines/r100038).

```json
{
  "_links": {
    "https://api.otto.de/checkout/link-relations/checkout-items": {
      "href": "https://api.otto.de/checkout/items"
    }
  }
}
```

::: references

- [MUST prefer IANA-registered link relation types](/guidelines/r100036)
- [MUST use kebab-case for URIs](/guidelines/r000023)
- [MUST use curied link relation types](/guidelines/r100038)
- [MUST implement REST maturity level 2](/guidelines/r000032)
- [MUST implement REST maturity level 3 for transitional APIs](/guidelines/r000033)
  :::
