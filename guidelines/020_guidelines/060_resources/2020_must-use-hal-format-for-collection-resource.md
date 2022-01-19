---
type: MUST
id: R100021
---

# use HAL format for collection resources

::: warning
This rule applies to public APIs. For private APIs it is a recommendation.
  :::

For [public APIs](./guidelines/010_core-principles/0030_api-scope.md), all collection resources [must use `application/hal+json`](./guidelines/020_guidelines/040_hypermedia/1020_must-implement-rest-maturity-level-3-for-public-apis.md) to represent lists of items.

The list of resources is embedded under `_embedded` with the key representing the link-relation type.
This is the same as the one used in the `_links` section.

The [Embedded resources](./guidelines/020_guidelines/060_resources/1000_embedded-resources.md) section provides more information on embedding documents.

::: references

- [MUST implement REST maturity level 2 for private APIs](./guidelines/020_guidelines/040_hypermedia/1010_must-implement-rest-maturity-level-2-for-private-apis.md)
- [MUST implement REST maturity level 3 for public APIs](./guidelines/020_guidelines/040_hypermedia/1020_must-implement-rest-maturity-level-3-for-public-apis.md)
  :::
