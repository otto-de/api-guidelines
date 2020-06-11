---
type: MUST
id: R100033
---

# provide conventional hyperlinks

::: warning Public APIs only
This rule only applies to public APIs. For private APIs, this rule SHOULD be followed.

See also:
* [MUST implement REST maturity level 2 for private APIs](../050_hypermedia/1010_must-implement-rest-maturity-level-2-for-private-apis.md) 
* [MUST implement REST maturity level 3 for public APIs](../050_hypermedia/1020_must-implement-rest-maturity-level-3-for-public-apis.md)
:::

For [public APIs](../../010_core-principles/0030_api-scope.md), all resources 
[must use `application/hal+json`](../050_hypermedia/1020_must-implement-rest-maturity-level-3-for-public-apis.md) for
hyperlinking other resources.

The following links must be contained in every representation:
* self
* profile

See also:
* [MUST support hypermedia controls in collection resources](../040_resources/4060_must-support-hypermedia-controls.md)
* [Link-Relation Types](./3000_link-relation-types.md)
* [Profiles](./4000_profiles.md)
* [IANA link relations](http://www.iana.org/assignments/link-relations/link-relations.xhtml)