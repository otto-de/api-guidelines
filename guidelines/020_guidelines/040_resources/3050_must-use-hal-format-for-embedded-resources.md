---
type: MUST
id: R000045
---

# use hal format for embedded resources

::: warning Public APIs only
This rule only applies to public APIs. For private APIs, this rule SHOULD be followed.

See also:
* [MUST implement REST maturity level 2 for private APIs](../050_hypermedia/1010_must-implement-rest-maturity-level-2-for-private-apis.md) 
* [MUST implement REST maturity level 3 for public APIs](../050_hypermedia/1020_must-implement-rest-maturity-level-3-for-public-apis.md)
:::

As [application/hal+json is mandatory](../050_hypermedia/1020_must-implement-rest-maturity-level-3-for-public-apis.md) for [public APIs](../../010_core-principles/30_api-scope.md), embedded sub-resources of a resource MUST be embedded using HAL's
`_embedded` object.

