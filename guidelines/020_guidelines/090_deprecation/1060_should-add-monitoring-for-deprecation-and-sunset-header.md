---
type: SHOULD
id: R000070
---

# add monitoring for `Deprecation` and `Sunset` header

Clients should monitor the `Deprecation` and `Sunset` headers in HTTP responses to get information about future sunset of APIs and API features (see [SHOULD add `Deprecation` and `Sunset` header to responses](./guidelines/020_guidelines/090_deprecation/1050_should-add-deprecation-and-sunset-header-to-responses.md)).
We recommend that API providers build alerts on this monitoring information to ensure alignment with API consumers on the required migration task.
