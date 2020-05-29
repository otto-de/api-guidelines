## Deprecation

> TODO: [REVIEW]

Sometimes it is necessary to phase out an API endpoint, an API version, or an API feature, e.g. if a field or parameter is no longer supported or a whole business functionality behind an endpoint is supposed to be shut down. As long as the API endpoints and features are still used by consumers these shut downs are breaking changes and not allowed. To progress the following deprecation rules have to be applied to make sure that the necessary consumer changes and actions are well communicated and aligned using _deprecation_ and _sunset_ dates.

### **[MUST]** obtain approval of clients before API shut down

> TODO: [REVIEW]

Before shutting down an API, version of an API, or API feature the producer must make sure, that all clients have given their consent on a sunset date. Producers should help consumers to migrate to a potential new API or API feature by providing a migration manual and clearly state the time line for replacement availability and sunset (see also [**SHOULD** add `Deprecation` and `Sunset` header to responses](#should-add-deprecation-and-sunset-header-to-responses)). Once all clients of a sunset API feature are migrated, the producer may shut down the deprecated API feature.

### **[MUST]** collect external partner consent on deprecation time span

> TODO: [REVIEW]

If the API is consumed by any external partner, the API owner must define a reasonable time span that the API will be maintained after the producer has announced deprecation. All external partners must state consent with this after-deprecation-life-span, i.e. the minimum time span between official deprecation and first possible sunset, **before** they are allowed to use the API.

### **[MUST]** reflect deprecation in API specifications

> TODO: [REVIEW]

The API deprecation must be part of the API specification.

If an API endpoint (operation object), an input argument (parameter object), an in/out data object (schema object), or on a more fine grained level, a schema attribute or property should be deprecated, the producers must set `deprecated: true` for the affected element and add further explanation to the `description` section of the API specification. If a future shut down is planned, the producer must provide a sunset date and document in details what consumers should use instead and how to migrate.

### **[MUST]** monitor usage of deprecated API scheduled for sunset

> TODO: [REVIEW]

Owners of an API, API version, or API feature used in production that is scheduled for sunset must monitor the usage of the sunset API, API version, or API feature in order to observe migration progress and avoid uncontrolled breaking effects on ongoing consumers.

### **[SHOULD]** add `Deprecation` and `Sunset` header to responses

> TODO: [REVIEW]

During the deprecation phase, the producer should add a `Deprecation:` (see [draft: RFC Deprecation HTTP Header](https://tools.ietf.org/html/draft-dalal-deprecation-header)) and - if also planned - a `Sunset:` (see [RFC 8594](https://tools.ietf.org/html/rfc8594#section-3)) header on each response affected by a deprecated element (see [**MUST** reflect deprecation in API specifications](#must-reflect-deprecation-in-api-specifications)).

The [`Deprecation`](https://tools.ietf.org/html/draft-dalal-deprecation-header) header can either be set to `true` - if a feature is retired -, or carry a deprecation time stamp, at which a replacement will become/became available and consumers must not on-board any longer (see [**MUST** not start using deprecated APIs](#must-not-start-using-deprecated-apis)). The optional [`Sunset`](https://tools.ietf.org/html/rfc8594) time stamp carries the information when consumers latest have to stop using a feature. The sunset date should always offer an eligible time interval for switching to a replacement feature.

```
Deprecation: Sun, 31 Dec 2024 23:59:59 GMT
Sunset: Sun, 31 Dec 2025 23:59:59 GMT
```

If multiple elements are deprecated the [`Deprecation`](https://tools.ietf.org/html/draft-dalal-deprecation-header) and [`Sunset`](https://tools.ietf.org/html/rfc8594) headers are expected to be set to the earliest time stamp to reflect the shortest interval consumers are expected to get active.

**Note:** adding the [`Deprecation`](https://tools.ietf.org/html/draft-dalal-deprecation-header) and [`Sunset`](https://tools.ietf.org/html/rfc8594) header is not sufficient to gain client consent to shut down an API or feature.

### **[SHOULD]** add monitoring for `Deprecation` and `Sunset` header

> TODO: [REVIEW]

Clients should monitor the [`Deprecation`](https://tools.ietf.org/html/draft-dalal-deprecation-header) and [`Sunset`](https://tools.ietf.org/html/rfc8594) headers in HTTP responses to get information about future sunset of APIs and API features (see [**SHOULD** add `Deprecation` and `Sunset` header to responses](#should-add-deprecation-and-sunset-header-to-responses)). We recommend that client owners build alerts on this monitoring information to ensure alignment with service owners on required migration task.

### **[MUST]** not start using deprecated APIs

> TODO: [REVIEW]

Clients must not start using deprecated APIs, API versions, or API features.
