---
type: MUST
id: R100021
---

# use HAL format for collection resources in public APIs

For [public APIs](../../010_core-principles/30_api-scope.md), all collection resources [must use `application/hal+json`](../060_hypermedia/1020_must-implement-rest-maturity-level-3-for-public-apis.md) to represent lists of items.

The list of resources is embedded under `_embedded` with the key representing the link-relation type.
This is the same as the one used in the `_links` section.

The [Embedded resources](2000_embedded-resources.md) section provides more information on embedding documents.
