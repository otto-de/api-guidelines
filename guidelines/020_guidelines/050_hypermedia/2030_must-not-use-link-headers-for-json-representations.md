---
type: MUST NOT
id: R100034
---

# use link headers for JSON representations

::: warning Public APIs only
This rule only applies to public APIs. For private APIs, this rule SHOULD be followed.

See also:
* [MUST implement REST maturity level 2 for private APIs](../050_hypermedia/1010_must-implement-rest-maturity-level-2-for-private-apis.md) 
* [MUST implement REST maturity level 3 for public APIs](../050_hypermedia/1020_must-implement-rest-maturity-level-3-for-public-apis.md)
:::

For flexibility and precision, we prefer links to be directly embedded in the JSON payload instead of being attached 
using the uncommon link header syntax. As a result, the use of the `Link` Header defined by 
[RFC 8288](https://tools.ietf.org/html/rfc8288#section-3) in conjunction with JSON media types is forbidden.