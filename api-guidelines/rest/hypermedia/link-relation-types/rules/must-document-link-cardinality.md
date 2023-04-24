---
id: R100063
---

# MUST document link cardinality

::: info Info
This rule applies to APIs that have to comply with [REST maturity level 3](../../maturity-level/rules/must-implement-rest-maturity-level-3-for-transitional-apis.md).
:::

The HAL `_links` object holds property names of link relation types, and values of either a link object:

```json
{
  "_links": {
    "https://api.otto.de/users/link-relations/author": { "href": "https://api.otto.de/users/42" }
  }
}
```

...or an array of link objects:

```json
{
  "_links": {
    "https://api.otto.de/products/link-relations/item": [
      { "href": "https://api.otto.de/products/4711" },
      { "href": "https://api.otto.de/products/0815" }
    ]
  }
}
```

In order to simplify the implementation of API clients, the client must know which link relation types contain single link objects, and which contain an array of link objects.
That's why every profile must document the cardinality of the link relation types used in the profile.

::: references

- [MUST implement REST maturity level 2](../../maturity-level/rules/must-implement-rest-maturity-level-2.md)
- [MUST implement REST maturity level 3 for transitional APIs](../../maturity-level/rules/must-implement-rest-maturity-level-3-for-transitional-apis.md)
  :::
