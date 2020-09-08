---
type: MUST
id: R100026
---

# support hypermedia controls in collection resources

::: warning
This rule applies to public APIs. For private APIs it is a recommendation.
  :::

Provide links to navigate the result.
The [IANA link relations](http://www.iana.org/assignments/link-relations/link-relations.xhtml) must be used whenever applicable.

The most common ones are:

- `self` : the current page
- `next` : the next page
- `prev` : the previous page
- `first` (_optional_): the first page
- `last` (_optional_): the last page

::: info
Some properties like `first` and `last` can be omitted if the implementation is not feasable, for example, when the calculation has a big performance impact.
Exposing this data should consider the performance implications, not only now but over the lifespan of the service.
:::

::: references

- [MUST implement REST maturity level 2 for private APIs](./guidelines/020_guidelines/040_hypermedia/1010_must-implement-rest-maturity-level-2-for-private-apis.md)
- [MUST implement REST maturity level 3 for public APIs](./guidelines/020_guidelines/040_hypermedia/1020_must-implement-rest-maturity-level-3-for-public-apis.md)
  :::
