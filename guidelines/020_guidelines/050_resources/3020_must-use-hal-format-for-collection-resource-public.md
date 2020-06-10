---
type: MUST
id: R100021
---

# use HAL format for collection resources in public APIs

All collection resources must use `application/hal+json` to represent lists of items.

The list of resources is embedded under `_embedded` with the key representing the link-relation type.
This is the same as the one used in the `_links` section.

The [Embedded resources](2000_embedded-resources.md) section provides more information on embedding documents.
