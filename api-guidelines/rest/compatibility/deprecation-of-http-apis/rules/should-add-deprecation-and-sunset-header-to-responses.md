---
id: R000069
---

# SHOULD add `Deprecation` and `Sunset` header to responses

During the deprecation phase, the API provider should add a `Deprecation` header (see [draft: RFC Deprecation HTTP Header](https://tools.ietf.org/html/draft-dalal-deprecation-header)) and - if also planned - a `Sunset` header (see [RFC 8594](https://tools.ietf.org/html/rfc8594#section-3)) to each response affected by a deprecated element (see [MUST reflect deprecation in API specifications](../../../../global/compatibility/deprecation/rules/must-reflect-deprecation-in-api-specifications.md)).

The `Deprecation` header can either be set to `true` when a feature is disabled, or it can carry a deprecation timestamp at which a replacement is made available and consumers are no longer allowed to use the feature.
The optional `Sunset` timestamp indicates when consumers have to stop using a feature at the latest.
The sunset timestamp should always offer an appropriate time interval for switching to a replacement feature.

Example:

```http
Deprecation: Sun, 31 Dec 2024 23:59:59 GMT
Sunset: Sun, 31 Dec 2025 23:59:59 GMT
```

If multiple elements are deprecated, the `Deprecation` and `Sunset` headers are expected to be set to the earliest timestamp to reflect the shortest interval consumers are expected to get active.

::: warning Important
Adding the `Deprecation` and `Sunset` header to the response is not sufficient to gain client consent to shut down an API or feature.
:::
