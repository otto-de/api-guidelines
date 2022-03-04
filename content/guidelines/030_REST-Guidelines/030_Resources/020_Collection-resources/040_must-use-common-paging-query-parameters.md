---
type: MUST
id: R100024
---

# use common paging query parameters

::: warning
This rule applies to public APIs. For private APIs it should be followed.
:::

For offset-based pagination you must stick to the following query parameters:

- `pageSize`: Number of elements in the response or the chunk size
- `page`: Page number that is requested (0-indexed)

Requested pages outside the valid range (e.g. page 10 of a 5-element collection) must return an empty collection.

For cursor-based pagination we _recommend_ using the following query parameters:

- `after`: Results after the cursor position
- `before`: Results before the cursor position

::: references

- [MUST stick to conventional query parameters](@guidelines/R000049)
- [MUST support pagination](@guidelines/R100023)
  :::
