---
type: May
id: R000070
---

# add monitoring for `Deprecation` and `Sunset` header

Clients should monitor the `Deprecation` and `Sunset` headers in HTTP responses to get information about future sunset of APIs and API features (see [[SHOULD] add `Deprecation` and `Sunset` header to responses](./guidelines/060_versioning/2050_should-add-deprecation-and-sunset-header-to-responses.md)). We recommend that client owners build alerts on this monitoring information to ensure alignment with service owners on required migration task.
