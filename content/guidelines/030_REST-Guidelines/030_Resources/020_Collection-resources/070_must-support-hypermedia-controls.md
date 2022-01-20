---
type: MUST
id: R100026
---

# support hypermedia controls in collection resources

::: warning
This rule applies to public APIs. For private APIs it is a recommendation.
:::

Provide links to navigate the result. Clients must be able to navigate the collection without additional knowledge. If the link is present, it must point to a valid segment of the collection resource.
The [IANA link relations](http://www.iana.org/assignments/link-relations/link-relations.xhtml) must be used whenever applicable.

The most common ones are:

- `self` : the current page
- `next` (_optional_): the next page. Should be set, only if next page is present.
- `prev` (_optional_): the previous page, if present. Must be omitted for the first page.
- `first` (_optional_): the first page
- `last` (_optional_): the last page

::: info
Some properties like `first`, `next` and `last` can be omitted if the implementation is not feasable, for example, when the calculation has a big performance impact.
Exposing this data should consider the performance implications, not only now but over the lifespan of the service.
:::

::: references

- [MUST implement REST maturity level 2 for private APIs](R000032)
- [MUST implement REST maturity level 3 for public APIs](R000033)
  :::
