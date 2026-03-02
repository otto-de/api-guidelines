---
id: R100037
---

# MUST use absolute URIs for custom link relation types

::: info Info
This rule applies to APIs that have to comply with [REST maturity level 3](../../maturity-level/rules/must-implement-rest-maturity-level-3-for-transitional-apis.md).
:::

Custom link relations must be absolute URIs (as defined in [RFC 5988](https://datatracker.ietf.org/doc/html/rfc5988#section-4.2)) and documented in the OpenAPI specification.

The URI used as the link relation type must be treated as an identifier that should not change.
While encouraged, it does not need to be resolvable.
If the URI is resolvable, it should provide human-readable documentation of the link relation type.

Here's an example of an uncuried link relation that serves for demonstration only.
In your APIs, you [must use curied link relation types](./must-use-curied-link-relation-types.md).

```json
{
  "_links": {
    "https://api.otto.de/portal/link-relations#checkout-items": {
      "href": "https://api.otto.de/checkout/items"
    }
  }
}
```

::: references

- [MUST prefer IANA-registered link relation types](./must-prefer-iana-registered-link-relation-types.md)
- [MUST use kebab-case for URIs](../../../resources/naming-conventions/rules/must-use-kebabcase-for-uris.md)
- [MUST use curied link relation types](./must-use-curied-link-relation-types.md)
- [MUST implement REST maturity level 2](../../maturity-level/rules/must-implement-rest-maturity-level-2.md)
- [MUST implement REST maturity level 3 for transitional APIs](../../maturity-level/rules/must-implement-rest-maturity-level-3-for-transitional-apis.md)
  :::
