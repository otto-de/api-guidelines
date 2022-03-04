---
type: MUST
id: R000045
---

# use HAL format for embedded resources

::: warning
This rule applies to public APIs. For private APIs it is a recommendation.
:::

As [application/hal+json is mandatory](@guidelines/R000033) for [public APIs](../../../010_Core-Principles/030_API-scope.md), subresources must be embedded using format `application/hal+json`.

::: references

- [MUST implement REST maturity level 2 for private APIs](@guidelines/R000032)
- [MUST implement REST maturity level 3 for public APIs](@guidelines/R000033)
  :::
