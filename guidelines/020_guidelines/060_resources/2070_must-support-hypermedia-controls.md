---
type: MUST
id: R100026
---

# support hypermedia controls in collection resources

::: warning
This rule applies to public APIs. For private APIs it is a recommendation.
:::

Provide links to navigate the result. Clients have to be able to navigate the collection without any additional knowledge. If the link is present, it has to point to a valid segment of the collection resource.
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

- [MUST implement REST maturity level 2 for private APIs](./guidelines/020_guidelines/040_hypermedia/1010_must-implement-rest-maturity-level-2-for-private-apis.md)
- [MUST implement REST maturity level 3 for public APIs](./guidelines/020_guidelines/040_hypermedia/1020_must-implement-rest-maturity-level-3-for-public-apis.md)
  :::
