---
type: MUST
id: R000045
---

# use hal format fo embedded resources in public APIs

As [application/hal+json is mandatory](../060_hypermedia/1020_must%20-implement-rest-maturity-level-3-for-public-apis.md) 
for [public APIs](../../010_core-principles/30_api-scope.md), sub-resources of a resource MUST be embedded using HAL's
`_embedded` object.