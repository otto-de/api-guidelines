---
id: R100021
---

# MUST use HAL format for collection resources

::: info Info
This rule applies to APIs that have to comply with [REST maturity level 3](../../../hypermedia/maturity-level/rules/must-implement-rest-maturity-level-3-for-transitional-apis.md).
:::

The list of resources is embedded under `_embedded` with the key representing the link-relation type.
This is the same as the one used in the `_links` section.

The [Embedded resources](../../README.md#embedded-resources) section provides more information on embedding documents.

::: references

- [MUST implement REST maturity level 2](../../../hypermedia/maturity-level/rules/must-implement-rest-maturity-level-2.md)
- [MUST implement REST maturity level 3 for transitional APIs](../../../hypermedia/maturity-level/rules/must-implement-rest-maturity-level-3-for-transitional-apis.md)
  :::
