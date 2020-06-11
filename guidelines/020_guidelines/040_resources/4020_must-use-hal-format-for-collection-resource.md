---
type: MUST
id: R100021
---

# use HAL format for collection resources

::: warning Public APIs only
This rule only applies to public APIs. For private APIs, this rule SHOULD be followed.

See also:

- [MUST implement REST maturity level 2 for private APIs](../050_hypermedia/1010_must-implement-rest-maturity-level-2-for-private-apis.md)
- [MUST implement REST maturity level 3 for public APIs](../050_hypermedia/1020_must-implement-rest-maturity-level-3-for-public-apis.md)
  :::

For [public APIs](../../010_core-principles/0030_api-scope.md), all collection resources [must use `application/hal+json`](../050_hypermedia/1020_must-implement-rest-maturity-level-3-for-public-apis.md) to represent lists of items.

The list of resources is embedded under `_embedded` with the key representing the link-relation type.
This is the same as the one used in the `_links` section.

The [Embedded resources](3000_embedded-resources.md) section provides more information on embedding documents.
