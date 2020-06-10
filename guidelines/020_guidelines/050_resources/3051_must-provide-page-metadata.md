---
type: MUST
id: R100025
---

# provide page metadata (for offset based pagination)

Page metadata is important for clients that build their own links and do not use hypermedia controls.

The page metadata structure must match the following structure.

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

- `size` : Number of elements in the response (page size)
- `number` : Current page number (0 indexed)
- `totalElements` (_optional_): Overall number of elements
- `totalPages` (_optional_): Overall number of pages

::: warning
Some fields like `totalElements` and `totalPages` can be omitted if the implementation is not feasable, e.g. when the calculation has a big performance impact.
Exposing this data should consider the performance implications, not only now but over the lifespan of the service.
:::
