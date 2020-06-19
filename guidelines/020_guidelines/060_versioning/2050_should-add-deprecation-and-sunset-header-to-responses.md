---
type: SHOULD
id: R000069
---

# add `Deprecation` and `Sunset` header to responses

During the deprecation phase, the producer should add a `Deprecation` (see [draft: RFC Deprecation HTTP Header](https://tools.ietf.org/html/draft-dalal-deprecation-header)) and - if also planned - a `Sunset` (see [RFC 8594](https://tools.ietf.org/html/rfc8594#section-3)) header on each response affected by a deprecated element (see [[MUST] reflect deprecation in API specifications](./guidelines/060_versioning/2030_must-reflect-deprecation-in-api-specifications.md)).

The `Deprecation` header can either be set to `true` - if a feature is retired -, or carry a deprecation time stamp, at which a replacement will become/became available and consumers must not on-board any longer (see [[MUST] not start using deprecated APIs](./guidelines/060_versioning/2070_must-not-start-using-deprecated-apis.md)). The optional `Sunset` time stamp carries the information when consumers latest have to stop using a feature. The sunset date should always offer an eligible time interval for switching to a replacement feature.

Example:

```http
Deprecation: Sun, 31 Dec 2024 23:59:59 GMT
Sunset: Sun, 31 Dec 2025 23:59:59 GMT
```

If multiple elements are deprecated the `Deprecation` and `Sunset` headers are expected to be set to the earliest timestamp to reflect the shortest interval consumers are expected to get active.

::: warning
Adding the `Deprecation` and `Sunset` header is not sufficient to gain client consent to shut down an API or feature.
:::
