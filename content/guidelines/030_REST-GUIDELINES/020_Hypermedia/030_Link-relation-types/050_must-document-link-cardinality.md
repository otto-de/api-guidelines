---
type: MUST
id: R100063
---

# document link cardinality

::: info Info
This rule applies to APIs that have to comply with [REST maturity level 3](@guidelines/R000033).
:::

The HAL `_links` object holds property names of link relation types, and values of either a link object:

```json
{
  "_links": {
    "author": { "href": "http://api.otto.de/users/42" }
  }
}
```

...or an array of link objects:

```json
{
  "_links": {
    "item": [
      { "href": "http://api.otto.de/products/4711" },
      { "href": "http://api.otto.de/products/0815" }
    ]
  }
}
```

In order to simplify the implementation of API clients, the client must know which link relation types contain single link objects, and which contain an array of link objects.
Thats why every profile must document the cardinality of the link relation types used in the profile.

::: references

- [MUST implement REST maturity level 2](@guidelines/R000032)
- [MUST implement REST maturity level 3 for transitional APIs](@guidelines/R000033)
  :::
