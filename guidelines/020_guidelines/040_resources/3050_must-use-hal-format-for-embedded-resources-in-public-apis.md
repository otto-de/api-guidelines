---
type: MUST
id: R000045
---

# use hal format for embedded resources in public APIs

As [application/hal+json is mandatory](../050_hypermedia/1020_must-implement-rest-maturity-level-3-for-public-apis.md) for [public APIs](../../010_core-principles/30_api-scope.md), embedded sub-resources of a resource MUST be embedded using HAL's
`_embedded` object.

