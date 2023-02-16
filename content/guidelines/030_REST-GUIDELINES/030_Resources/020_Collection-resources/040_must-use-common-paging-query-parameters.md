---
type: MUST
id: R100024
---

# use common paging query parameters

::: info Info
This rule applies to public APIs. For private APIs it should be followed.
:::

For offset-based pagination, you have two options and must stick to the following query parameters:

Option 1:

- `pageSize`: Number of elements in the response or the chunk size
- `page`: Page number that is requested (0-indexed)

Requested pages outside the valid range (e.g. page 10 of a 5-element collection) must return an empty collection.

Option 2:

- `limit`: Number of elements in the response or the chunk size
- `offset`: First position or starting point of the collection that is requested (default is 0)

For cursor-based pagination we _recommend_ using the following query parameters:

- `after`: Results after the cursor position
- `before`: Results before the cursor position

::: references

- [MUST stick to conventional query parameters](@guidelines/R000049)
- [MUST support pagination](@guidelines/R100023)
  :::
