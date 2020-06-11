---
type: MUST
id: R100026
---

# support hypermedia controls (for public APIs)

Provide links to navigate the result.
The [IANA link relations](http://www.iana.org/assignments/link-relations/link-relations.xhtml) must be used whenever applicable.

The most common ones are:

- `self` : the current page
- `next` : the next page
- `prev` : the previous page
- `first` (_optional_): the first page
- `last` (_optional_): the last page

::: warning
Some properties like `first` and `last` can be omitted if the implementation is not feasable, e.g. when the calculation has a big performance impact.
Exposing this data should consider the performance implications, not only now but over the lifespan of the service.
:::
