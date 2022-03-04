---
type: MUST
id: R000054
---

# obtain approval of clients before API shutdown

Before shutting down an API, version of an API, or API feature the API provider must ensure that all clients have given their consent on a sunset date.
The API provider should help consumers to migrate to a potential new API or API feature by providing a migration manual and clearly state the timeline for replacement availability and sunset (see also [SHOULD add `Deprecation` and `Sunset` header to responses](@guidelines/R000069)).
Once all clients of a sunset API feature are migrated, the API provider may shut down the deprecated API feature.
