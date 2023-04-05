---
id: R100025
---

# MUST provide metadata for offset-based pagination

Metadata is important for clients that build their own links and do not use hypermedia controls.

The requirements for the metadata structure depend on your chosen query parameters.

## `page` and `pageSize`

This is the metadata structure for `page` and `pageSize` as query parameters:

```json
{
  "_page": {
    "size": 5,
    "number": 0,
    "totalElements": 50,
    "totalPages": 10
  }
}
```

- `size` : Maximum number of elements in the response
- `number` : Current page number (0 indexed)
- `totalElements` (_optional_): Overall number of elements
- `totalPages` (_optional_): Overall number of pages

## `offset` and `limit`

This is the metadata structure for `offset` and `limit` as query parameters:

```json
{
  "_offsetPage": {
    "limit": 3,
    "offset": 20,
    "totalElements": 22
  }
}
```

- `limit` : Maximum number of elements in the response
- `offset` : First position or starting point of the collection that is requested
- `totalElements` (_optional_): Overall number of elements

::: info Info
Some fields like `totalElements` and `totalPages` can be omitted if the implementation is not feasable, for example, when the calculation has a big performance impact.
Exposing this data should consider the performance implications, not only now but over the lifespan of the service.
:::
