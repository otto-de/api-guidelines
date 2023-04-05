---
id: R100021
---

# MUST use HAL format for collection resources

::: info Info
This rule applies to APIs that have to comply with [REST maturity level 3](@guidelines/R000033).
:::

The list of resources is embedded under `_embedded` with the key representing the link-relation type.
This is the same as the one used in the `_links` section.

The [Embedded resources](../010_Embedded-resources/index.md) section provides more information on embedding documents.

::: references

- [MUST implement REST maturity level 2](@guidelines/R000032)
- [MUST implement REST maturity level 3 for transitional APIs](@guidelines/R000033)
  :::
