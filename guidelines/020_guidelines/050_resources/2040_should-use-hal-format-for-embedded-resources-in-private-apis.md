---
type: SHOULD
id: R000044
---

# use hal format for embedded resources in private APIs

While [application/hal+json is OPTIONAL](../060_hypermedia/1010_must-implement-rest-maturity-level-2-for-private-apis.md)
for [private APIs](../../010_core-principles/30_api-scope.md), the HAL format SHOULD still be used instead of 
proprietary formats because:
 * Publishing the API later will be easier, if HAL is used from the beginning.
 * Implementation of API clients is easier, if different parts of the API are behaving in the same way and if 
   the same format is used for different purposes.  