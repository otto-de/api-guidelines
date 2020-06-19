---
type: MUST
id: R000054
---

# obtain approval of clients before API shutdown

Before shutting down an API, version of an API, or API feature the producer must make sure, that all clients have given their consent on a sunset date. Producers should help consumers to migrate to a potential new API or API feature by providing a migration manual and clearly state the time line for replacement availability and sunset (see also [[SHOULD] add `Deprecation` and `Sunset` header to responses](./guidelines/060_versioning/2050_should-add-deprecation-and-sunset-header-to-responses.md)). Once all clients of a sunset API feature are migrated, the producer may shut down the deprecated API feature.
