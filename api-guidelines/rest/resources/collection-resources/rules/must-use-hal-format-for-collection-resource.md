---
id: R100021
---

# MUST use HAL format for collection resources

::: info Info
This rule applies to APIs that have to comply with [REST maturity level 3](/guidelines/r000033).
:::

The list of resources is embedded under `_embedded` with the key representing the link-relation type.
This is the same as the one used in the `_links` section.

The [Embedded resources](/guidelines/rest-guidelines/resources#embedded-resources) section provides more information on embedding documents.

::: references

- [MUST implement REST maturity level 2](/guidelines/r000032)
- [MUST implement REST maturity level 3 for transitional APIs](/guidelines/r000033)
  :::
