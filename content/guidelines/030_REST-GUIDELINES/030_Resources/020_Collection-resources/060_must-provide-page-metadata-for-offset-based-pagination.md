---
type: MUST
id: R100025
---

# provide metadata for offset-based pagination

Metadata is important for clients that build their own links and do not use hypermedia controls.

The metadata structure must match one of the following structure.

If you are using `page` and `pageSize` as query parameter:

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

If you are using `offset` and `limit` as query parameter:

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
