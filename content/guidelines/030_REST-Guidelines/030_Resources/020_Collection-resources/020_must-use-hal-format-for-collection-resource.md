---
type: MUST
id: R100021
---

# use HAL format for collection resources

::: warning
This rule applies to public APIs. For private APIs it is a recommendation.
:::

For [public APIs](../../../010_Core-Principles/030_API-scope.md), all collection resources [must use `application/hal+json`](@guidelines/R000033) to represent lists of items.

The list of resources is embedded under `_embedded` with the key representing the link-relation type.
This is the same as the one used in the `_links` section.

The [Embedded resources](../010_Embedded-resources/index.md) section provides more information on embedding documents.

::: references

- [MUST implement REST maturity level 2 for private APIs](@guidelines/R000032)
- [MUST implement REST maturity level 3 for public APIs](@guidelines/R000033)
  :::
