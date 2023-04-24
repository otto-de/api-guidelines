---
id: R000054
---

# MUST obtain approval of consumers before API shutdown

Before shutting down an API, an API version or feature, the API provider must ensure that all consumers have given their consent on a sunset date.
The API provider should help consumers to migrate to a potential new API or API feature by providing a migration manual and clearly stating the timeline for replacement availability and sunset (see also [SHOULD add `Deprecation` and `Sunset` header to responses](../../../../rest/compatibility/deprecation-of-http-apis/rules/should-add-deprecation-and-sunset-header-to-responses.md)).
Once all API consumers have migrated their affected clients, the API provider may shut down the deprecated API feature.
