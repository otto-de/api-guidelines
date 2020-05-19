# RESTful API



> **TODO:**
>
> 1. Die Regeln sind mit einem TODO: [REVIEW] markiert. Wenn das Review erfolgt ist und wir einverstanden sind, bitte den Kommentar entfernen.
>
> 2. Die noch unfertigen Abschnitte sind mit TODO: [WIP] gekennzeichnet (Work in Progress). Wenn ein Abschnitt ausgearbeitet ist bitte auf [REVIEW] ändern.
> 3. Wir können Punkte, die wir erstmal ausprobieren wollen, mit TODO: [BETA] oder ähnlichem markieren und dann später anpassen, löschen oder freigeben
> 4. Die Zalando Guidelines enthalten noch mehr Punkte, die wir nach und nach einarbeiten oder verwerfen können. Gleiches gilt für die bisherigen OTTO Guidelines - auch hier sind noch weitere Punkte enthalten, die wir eventuell übernehmen wollen.
> 5. An geeigneter Stellen sollten wir auf die "Decisions" verlinken.



## Table of Contents

[TOC]

## API design principles

> TODO: [REVIEW]

Comparing SOA web service interfacing style of SOAP vs. REST, the former tend to be centered around operations that are usually use-case specific and specialized. In contrast, REST is centered around business (data) entities exposed as resources that are identified via URIs and can be manipulated via standardized CRUD-like methods using different representations, and hypermedia. RESTful APIs tend to be less use-case specific and comes with less rigid client / server coupling and are more suitable for an ecosystem of (core) services providing a platform of APIs to build diverse new business services. We apply the RESTful web service principles to all kind of application (micro-) service components, independently from whether they provide functionality via the internet or intranet.

- We prefer REST-based APIs with JSON payloads
- We prefer systems to be truly RESTful

*Readings:* Some interesting reads on the RESTful API design style and service architecture:

- Book: [Irresistable APIs: Designing web APIs that developers will love](https://www.amazon.de/Irresistible-APIs-Designing-that-developers/dp/1617292559)
- Book: [REST in Practice: Hypermedia and Systems Architecture](http://www.amazon.de/REST-Practice-Hypermedia-Systems-Architecture/dp/0596805829)
- Book: [Build APIs You Won’t Hate](https://leanpub.com/build-apis-you-wont-hate)
- InfoQ eBook: [Web APIs: From Start to Finish](http://www.infoq.com/minibooks/emag-web-api)
- Lessons-learned blog: [Thoughts on RESTful API Design](http://restful-api-design.readthedocs.org/en/latest/)
- Fielding Dissertation: [Architectural Styles and the Design of Network-Based Software Architectures](http://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm)

### [MUST] follow the Robustness Principle

An important principle for API design and usage is Postel’s Law, aka [The Robustness Principle](http://en.wikipedia.org/wiki/Robustness_principle) (see also [RFC 1122](https://tools.ietf.org/html/rfc1122)):

> Be liberal in what you accept, be conservative in what you send

### [MUST] follow the Principle of Least Astonishment

Another principle that every API designer should follow is the [principle of least astonishment](https://en.wikipedia.org/wiki/Principle_of_least_astonishment) aka 'principle of least surprise': "People are part of the system. The design should match the user's experience, expectations, and [mental models](https://en.wikipedia.org/wiki/Mental_model)."

## Compatibility and Versioning

### **[MUST]** not break backward compatibility

> TODO: [REVIEW]

Change APIs, but keep all consumers running. Consumers usually have independent release lifecycles, focus on stability, and avoid changes that do not provide additional value. APIs are contracts between service providers and service consumers that cannot be broken via unilateral decisions.

There are two techniques to change APIs without breaking them:

- follow rules for compatible extensions
- introduce new API versions and still support older versions

We strongly encourage using compatible API extensions and discourage versioning (see [**SHOULD** avoid versioning](#should-avoid-versioning) below). The following guidelines for service providers ([**SHOULD** prefer compatible extensions](#should-prefer-compatible-extensions)) and consumers ([**MUST** prepare clients accept compatible API extensions](#must-prepare-clients-accept-compatible-api-extensions)) enable us (having Postel’s Law in mind) to make compatible changes without versioning.

**Note:** There is a difference between incompatible and breaking changes. Incompatible changes are changes that are not covered by the compatibility rules below. Breaking changes are incompatible changes deployed into operation, and thereby breaking running API consumers. Usually, incompatible changes are breaking changes when deployed into operation. However, in specific controlled situations it is possible to deploy incompatible changes in a non-breaking way, if no API consumer is using the affected API aspects (see also [Deprecation](#deprecation) guidelines).

**Hint:** Please note that the compatibility guarantees are for the "on the wire" format. Binary or source compatibility of code generated from an API definition is not covered by these rules. If client implementations update their generation process to a new version of the API definition, it has to be expected that code changes are necessary.

### **[SHOULD]** prefer compatible extensions

> TODO: [REVIEW]

API designers should apply the following rules to evolve RESTful APIs for services in a backward-compatible way:

- Add only optional, never mandatory fields.
- Never change the semantic of fields (e.g. changing the semantic from customer-number to customer-id, as both are different unique customer keys)
- Input fields may have (complex) constraints being validated via server-side business logic. Never change the validation logic to be more restrictive and make sure that all constraints are clearly defined in description.
- Enum ranges can be reduced when used as input parameters, only if the server is ready to accept and handle old range values too. Enum range can be reduced when used as output parameters.
- Enum ranges cannot be extended when used for output parameters — clients may not be prepared to handle it. However, enum ranges can be extended when used for input parameters.
- Support redirection in case an URL has to change `HTTP 301 Moved Permanently`.

### **[MUST]** prepare clients accept compatible API extensions

> TODO: [REVIEW]

Service clients should apply the robustness principle:

- Be conservative with API requests and data passed as input, e.g. avoid to exploit definition deficits like passing megabytes of strings with unspecified maximum length.
- Be tolerant in processing and reading data of API responses, more specifically…

Service clients must be prepared for compatible API extensions of service providers:

- Be tolerant with unknown fields in the payload (see also Fowler’s ["TolerantReader"](http://martinfowler.com/bliki/TolerantReader.html) post), i.e. ignore new fields but do not eliminate them from payload if needed for subsequent `PUT` requests.
- Be prepared that `enum` return parameter may deliver new values; either be agnostic or provide default behavior for unknown values.
- Be prepared to handle HTTP status codes not explicitly specified in endpoint definitions. Note also, that status codes are extensible. Default handling is how you would treat the corresponding `HTTP 2xx` code (see [RFC 7231 Section 6](https://tools.ietf.org/html/rfc7231#section-6)).
- Follow the redirect when the server returns HTTP status code `HTTP 301 Moved Permanently`.

### **[SHOULD]** avoid versioning

> TODO: [REVIEW]

When changing your RESTful APIs, do so in a compatible way and avoid generating additional API versions. Multiple versions can significantly complicate understanding, testing, maintaining, evolving, operating and releasing our systems ([supplementary reading](http://martinfowler.com/articles/enterpriseREST.html)).

If changing an API can’t be done in a compatible way, then proceed in one of these three ways:

- create a new resource (variant) in addition to the old resource variant
- create a new service endpoint — i.e. a new application with a new API (with a new domain name)
- create a new API version supported in parallel with the old API by the same microservice

As we discourage versioning by all means because of the manifold disadvantages, we strongly recommend to only use the first two approaches.

### **[MUST]** use media type versioning

> TODO: [WIP]
>
> TODO**: Mit Entscheidungen zum Thema Versionierung abgleichen!!!

However, when API versioning is unavoidable, you have to design your multi-version RESTful APIs using media type versioning (instead of URI versioning, see below). Media type versioning is less tightly coupled since it supports content negotiation and hence reduces complexity of release management.

Media type versioning: Here, version information and media type are provided together via the HTTP Content-Type header — e.g. `application/x.otto.cart+json;version=2`. For incompatible changes, a new media type version for the resource is created. To generate the new representation version, consumer and producer can do content negotiation using the HTTP Content-Type and Accept headers. Note: This versioning only applies to the request and response content schema, not to URI or method semantics.

In this example, a client wants only the new version of the response:

```
Accept: application/x.otto.cart+json;version=2
```

A server responding to this, as well as a client sending a request with content should use the Content-Type header, declaring that one is sending the new version:

```
Content-Type: application/x.otto.cart+json;version=2
```

Using header versioning should:

- include versions in request and response headers to increase visibility
- include Content-Type in the Vary header to enable proxy caches to differ between versions

**Hint:** Until an incompatible change is necessary, it is recommended to stay with the standard `application/json` media type.

Further reading: [API Versioning Has No "Right Way"](https://blog.apisyouwonthate.com/api-versioning-has-no-right-way-f3c75457c0b7) provides an overview on different versioning approaches to handle breaking changes without being opinionated.

### **[MUST]** not use URI versioning

> TODO: [WIP]
>
> TODO**: Mit Entscheidungen zum Thema Versionierung abgleichen!!!

With URI versioning a (major) version number is included in the path, e.g. `/v1/customers`. The consumer has to wait until the provider has been released and deployed. If the consumer also supports hypermedia links — even in their APIs — to drive workflows (HATEOAS), this quickly becomes complex. So does coordinating version upgrades — especially with hyperlinked service dependencies — when using URL versioning. To avoid this tighter coupling and complexer release management we do not use URI versioning, and go instead with media type versioning and content negotiation (see above).

## Deprecation

> TODO: [REVIEW]

Sometimes it is necessary to phase out an API endpoint, an API version, or an API feature, e.g. if a field or parameter is no longer supported or a whole business functionality behind an endpoint is supposed to be shut down. As long as the API endpoints and features are still used by consumers these shut downs are breaking changes and not allowed. To progress the following deprecation rules have to be applied to make sure that the necessary consumer changes and actions are well communicated and aligned using *deprecation* and *sunset* dates.

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

During the deprecation phase, the producer should add a `Deprecation: ` (see [draft: RFC Deprecation HTTP Header](https://tools.ietf.org/html/draft-dalal-deprecation-header)) and - if also planned - a `Sunset: ` (see [RFC 8594](https://tools.ietf.org/html/rfc8594#section-3)) header on each response affected by a deprecated element (see [**MUST** reflect deprecation in API specifications](#must-reflect-deprecation-in-api-specifications)).

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

## Common Headers

> 
>
> TODO: [WIP]
>
> 

### **[SHOULD]** consider to support `ETag` together with `If-Match`/`If-None-Match` header

> 
>
> TODO: [REVIEW]
>
> TODO: Link auf Zalando Best Practices - Inhalt übernehmen oder sonstwie einarbeiten.



When creating or updating resources it may be necessary to expose conflicts and to prevent the 'lost update' or 'initially created' problem. Following [RFC 7232 "HTTP: Conditional Requests"](https://tools.ietf.org/html/rfc7232) this can be best accomplished by supporting the [`ETag`](https://tools.ietf.org/html/rfc7232#section-2.3) header together with the [`If-Match`](https://tools.ietf.org/html/rfc7232#section-3.1) or [`If-None-Match`](https://tools.ietf.org/html/rfc7232#section-3.2) conditional header. The contents of an `ETag: <entity tag> ` header is either 

​	a) a hash of the response body, 

​	b) a hash of the last modified field of the entity, or 

​	c) a version number or identifier of the entity version.

To expose conflicts between concurrent update operations via [`PUT`](#put), [`POST`](#post), or [`PATCH`](#patch), the `If-Match: <entity tag> ` header can be used to force the server to check whether the version of the updated entity is conforming to the requested [`<entity tag>`](https://tools.ietf.org/html/rfc7232#section-2.3). If no matching entity is found, the operation is supposed to respond with status code `412 - Precondition Failed`.

Beside other use cases, `If-None-Match: *` can be used in a similar way to expose conflicts in resource creation. If any matching entity is found, the operation is supposed to respond with status code `412 Precondition Failed`.

The [`ETag`](https://tools.ietf.org/html/rfc7232#section-2.3), [`If-Match`](https://tools.ietf.org/html/rfc7232#section-3.1), and [`If-None-Match`](https://tools.ietf.org/html/rfc7232#section-3.2) headers can be defined as follows in the API definition:

```
components:
  headers:
  - ETag:
      description: |
        The RFC 7232 ETag header field in a response provides the entity-tag of
        a selected resource. The entity-tag is an opaque identifier for versions
        and representations of the same resource over time, regardless whether
        multiple versions are valid at the same time. An entity-tag consists of
        an opaque quoted string, possibly prefixed by a weakness indicator (see
        [RFC 7232 Section 2.3](https://tools.ietf.org/html/rfc7232#section-2.3).

      type: string
      required: false
      example: W/"xy", "5", "5db68c06-1a68-11e9-8341-68f728c1ba70"

  - If-Match:
      description: |
        The RFC7232 If-Match header field in a request requires the server to
        only operate on the resource that matches at least one of the provided
        entity-tags. This allows clients express a precondition that prevent
        the method from being applied if there have been any changes to the
        resource (see [RFC 7232 Section
        3.1](https://tools.ietf.org/html/rfc7232#section-3.1).

      type: string
      required: false
      example: "5", "7da7a728-f910-11e6-942a-68f728c1ba70"

  - If-None-Match:
      description: |
        The RFC7232 If-None-Match header field in a request requires the server
        to only operate on the resource if it does not match any of the provided
        entity-tags. If the provided entity-tag is `*`, it is required that the
        resource does not exist at all (see [RFC 7232 Section
        3.2](https://tools.ietf.org/html/rfc7232#section-3.2).

      type: string
      required: false
      example: "7da7a728-f910-11e6-942a-68f728c1ba70", *
```

Please see [Optimistic locking in RESTful APIs](https://opensource.zalando.com/restful-api-guidelines/#optimistic-locking) for a detailed discussion and options.

### [**MAY** consider to support `Idempotency-Key` header [230\]](https://opensource.zalando.com/restful-api-guidelines/#230)

> 
>
> TODO: [WIP]
>
> 

When creating or updating resources it can be helpful or necessary to ensure a strong [idempotent](https://opensource.zalando.com/restful-api-guidelines/#idempotent) behavior comprising same responses, to prevent duplicate execution in case of retries after timeout and network outages. Generally, this can be achieved by sending a client specific *unique request key*– that is not part of the resource – via [`Idempotency-Key`](https://opensource.zalando.com/restful-api-guidelines/#230) header.

The *unique request key* is stored temporarily, e.g. for 24 hours, together with the response and the request hash (optionally) of the first request in a key cache, regardless of whether it succeeded or failed. The service can now look up the *unique request key* in the key cache and serve the response from the key cache, instead of re-executing the request, to ensure [idempotent](https://opensource.zalando.com/restful-api-guidelines/#idempotent) behavior. Optionally, it can check the request hash for consistency before serving the response. If the key is not in the key store, the request is executed as usual and the response is stored in the key cache.

This allows clients to safely retry requests after timeouts, network outages, etc. while receive the same response multiple times. **Note:** The request retry in this context requires to send the exact same request, i.e. updates of the request that would change the result are off-limits. The request hash in the key cache can protection against this misbehavior. The service is recommended to reject such a request using status code [400](https://opensource.zalando.com/restful-api-guidelines/#status-code-400).

**Important:** To grant a reliable [idempotent](https://opensource.zalando.com/restful-api-guidelines/#idempotent) execution semantic, the resource and the key cache have to be updated with hard transaction semantics – considering all potential pitfalls of failures, timeouts, and concurrent requests in a distributed systems. This makes a correct implementation exceeding the local context very hard.

The [`Idempotency-Key`](https://opensource.zalando.com/restful-api-guidelines/#230) header must be defined as follows, but you are free to choose your expiration time:

```
components:
  headers:
  - Idempotency-Key:
      description: |
        The idempotency key is a free identifier created by the client to
        identify a request. It is used by the service to identify subsequent
        retries of the same request and ensure idempotent behavior by sending
        the same response without executing the request a second time.

        Clients should be careful as any subsequent requests with the same key
        may return the same response without further check. Therefore, it is
        recommended to use an UUID version 4 (random) or any other random
        string with enough entropy to avoid collisions.

        Idempotency keys expire after 24 hours. Clients are responsible to stay
        within this limits, if they require idempotent behavior.

      type: string
      format: uuid
      required: false
      example: "7da7a728-f910-11e6-942a-68f728c1ba70"
```

**Hint:** The key cache is not intended as request log, and therefore should have a limited lifetime, else it could easily exceed the data resource in size.

**Note:** The [`Idempotency-Key`](https://opensource.zalando.com/restful-api-guidelines/#230) header unlike other headers in this section is not standardized in an RFC. Our only reference are the usage in the [Stripe API](https://stripe.com/docs/api/idempotent_requests). However, as it fit not into our section about [Proprietary headers](https://opensource.zalando.com/restful-api-guidelines/#proprietary-headers), and we did not want to change the header name and semantic, we decided to treat it as any other common header.

## JSON Guidelines

> TODO: [REVIEW]

These guidelines provides recommendations for defining JSON data at OTTO. JSON here refers to [RFC 7159](https://tools.ietf.org/html/rfc7159) (which updates [RFC 4627(https://tools.ietf.org/html/rfc4627)]), the "application/json" media type and custom JSON media types defined for APIs. The guidelines clarifies some specific cases to allow OTTO JSON data to have an idiomatic form across teams and services.

The first some of the following guidelines are about property names, the later ones about values.

### **[MUST]** use JSON to encode structured data

> TODO: [REVIEW]

Use JSON-encoded body payload for transferring structured data. The JSON payload must follow [RFC 7159](https://tools.ietf.org/html/rfc7159) using a JSON object as top-level data structure (if possible) to allow for future extension. This also applies to collection resources, where one naturally would assume an array. 

Additionally, the JSON payload must comply to [RFC 7493](https://tools.ietf.org/html/rfc7493), particularly

- [Section 2.1](https://tools.ietf.org/html/rfc7493#section-2.1) on encoding of characters, and
- [Section 2.3](https://tools.ietf.org/html/rfc7493#section-2.3) on object constraints.

As a consequence, a JSON payload must

- use [`UTF-8` encoding](https://tools.ietf.org/html/rfc7493#section-2.1)
- consist of [valid Unicode strings](https://tools.ietf.org/html/rfc7493#section-2.1), i.e. must not contain non-characters or surrogates, and
- contain only [unique member names](https://tools.ietf.org/html/rfc7493#section-2.3) (no duplicate names).

### **[MUST]** always return JSON objects as top-level data structures

> TODO: [REVIEW]

In a response body, you must always return a JSON object (and not e.g. an array) as a top level data structure to support future extensibility. JSON objects support compatible extension by additional attributes. This allows you to easily extend your response and e.g. add pagination later, without breaking backwards compatibility. See [**SHOULD** use pagination links where applicable](#should-use-pagination-links-where-applicable) for an example.

## JSON Property Names

### **[MUST]** property names must be named in english

> TODO: [REVIEW]

Generally speaking, only english should be used to name things: properties, property values, resources, etc. pp.

### **[MUST]** property names must be ASCII camelCase (and never snake_case): `[a-z_][a-zA-Z0-9]*`

> TODO: [REVIEW]

Property names are restricted to ASCII strings. The first character must be a letter, or an underscore, and subsequent characters can be a letter or a number.

(It is highly recommended to use _ at the start of property names only for keywords like _links or _embedded.)

*Rationale*: No established industry standard exists, but the currently existing OTTO APIs prefer camelCase. While many popular Internet companies prefer snake_case: e.g. GitHub, Stack Exchange, Twitter. Others, like Google and Amazon, use both - not only camelCase. It’s essential to establish a consistent look and feel such that JSON looks as if it came from the same hand.

### **[MUST]** array names must be in plural

> TODO: [REVIEW]

To indicate they contain multiple values prefer to pluralize array names. This implies that object names should in turn be singular.

## JSON Property Values

### **[MUST]** not use `null` for boolean properties

> TODO: [REVIEW]

Schema based JSON properties that are by design booleans must not be presented as nulls. A boolean is essentially a closed enumeration of two values, true and false. If the content has a meaningful `null` value, strongly prefer to replace the boolean with enumeration of named values or statuses - for example `acceptedTermsAndConditions` with `true` or `false` can be replaced with `acceptedTermsAndConditions` with values `yes`, `no` and `unknown`.

### **[MUST]** represent enumerations as strings

> TODO: [REVIEW]

Strings are a reasonable target for values that are by design enumerations.

### **[MUST]** declare enum values using UPPER_SNAKE_CASE format

> TODO: [REVIEW]

Enum values need to consistently use the upper-snake case format, e.g. `VALUE` or `YET_ANOTHER_VALUE`. This approach allows to clearly distinguish values from properties or other elements.

### **[MUST]** use same semantics for `null` and absent properties

> TODO: [REVIEW]

Open API 3.x allows to mark properties as `required` and as `nullable` to specify whether properties may be absent (`{}`) or `null` (`{"example":null}`). If a property is defined to be not `required` and `nullable` (see 2nd row in Table below), this rule demands that both cases must be handled in the exact same manner by specification.

The following table shows all combinations and whether the examples are valid:

| **required** | **nullable** | **{}** | **{"example":null}** |
| :----------- | :----------- | :----- | :------------------- |
| `true`       | `true`       | ✗ No   | ✔ Yes                |
| `false`      | `true`       | ✔ Yes  | ✔ Yes                |
| `true`       | `false`      | ✗ No   | ✗ No                 |
| `false`      | `false`      | ✔ Yes  | ✗ No                 |

While API designers and implementers may be tempted to assign different semantics to both cases, we explicitly decide **against** that option, because we think that any gain in expressiveness is far outweighed by the risk of clients not understanding and implementing the subtle differences incorrectly.

As an example, an API that provides the ability for different users to coordinate on a time schedule, e.g. a meeting, may have a resource for options in which every user has to make a `choice`. The difference between *undecided* and *decided against any of the options* could be modeled as *absent*and `null` respectively. It would be safer to express the `null` case with a dedicated [Null object](https://en.wikipedia.org/wiki/Null_object_pattern), e.g. `{}` compared to `{"id":"42"}`.

Moreover, many major libraries have somewhere between little to no support for a `null`/absent pattern (see [Gson](https://stackoverflow.com/questions/48465005/gson-distinguish-null-value-field-and-missing-field), [Moshi](https://github.com/square/moshi#borrows-from-gson), [Jackson](https://github.com/FasterXML/jackson-databind/issues/578), [JSON-B](https://developer.ibm.com/articles/j-javaee8-json-binding-3/)). Especially strongly-typed languages suffer from this since a new composite type is required to express the third state. Nullable `Option`/`Optional`/`Maybe` types could be used but having nullable references of these types completely contradicts their purpose.

The only exception to this rule is JSON Merge Patch [RFC 7396](https://tools.ietf.org/html/rfc7396)) which uses `null` to explicitly indicate property deletion while absent properties are ignored, i.e. not modified.

### **[MUST]** empty array values must not be null

> TODO: [REVIEW]

Empty array values can unambiguously be represented as the empty list, `[]`.

### **[MUST]** define dates and times properties compliant with [RFC 3339](https://tools.ietf.org/html/rfc3339) 

> TODO: [REVIEW]

Use the date and time formats defined by [RFC 3339](https://tools.ietf.org/html/rfc3339#section-5.6):

- for "date" use strings matching `date-fullyear "-" date-month "-" date-mday`, for example: `2015-05-28`
- for "date-time" use strings matching `full-date "T" full-time`, for example `2015-05-28T14:07:17Z`

Note that the [Open API format](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#data-types) "date-time" corresponds to "date-time" in the RFC) and `2015-05-28`for a date (note that the Open API format "date" corresponds to "full-date" in the RFC). Both are specific profiles, a subset of the international standard [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601).

A zone offset may be used (both, in request and responses) — this is simply defined by the standards. However, we encourage restricting dates to UTC and without offsets. For example `2015-05-28T14:07:17Z` rather than `2015-05-28T14:07:17+00:00`. From experience we have learned that zone offsets are not easy to understand and often not correctly handled. Note also that zone offsets are different from local times that might be including daylight saving time. Localization of dates should be done by the services that provide user interfaces, if required.

When it comes to storage, all dates should be consistently stored in UTC without a zone offset. Localization should be done locally by the services that provide user interfaces, if required.

Sometimes it can seem data is naturally represented using numerical timestamps, but this can introduce interpretation issues with precision, e.g. whether to represent a timestamp as 1460062925, 1460062925000 or 1460062925.000. Date strings, though more verbose and requiring more effort to parse, avoid this ambiguity.

### **[SHOULD]** define time durations and intervals properties conform to ISO 8601 

> TODO: [REVIEW]

Schema based JSON properties that are by design durations and intervals could be strings formatted as recommended by [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)([Appendix A of RFC 3339 contains a grammar](https://tools.ietf.org/html/rfc3339#appendix-A) for durations).

## Resources

### **[MUST]** avoid actions - think about resources

> TODO: [REVIEW]

REST is all about your resources, so consider the domain entities that take part in web service interaction, and aim to model your API around these using the standard HTTP methods as operation indicators. For instance, if an application has to lock articles explicitly so that only one user may edit them, create an article lock with `PUT` or `POST` instead of using a lock action.

Request:

```
PUT /article-locks/{article-id}
```

The added benefit is that you already have a service for browsing and filtering article locks.

### **[SHOULD]** model complete business processes

> TODO: [REVIEW]

An API should contain the complete business processes containing all resources representing the process. This enables clients to understand the business process, foster a consistent design of the business process, allow for synergies from description and implementation perspective, and eliminates implicit invisible dependencies between APIs.

In addition, it prevents services from being designed as thin wrappers around databases, which normally tends to shift business logic to the clients.

### **[SHOULD]** define *useful* resources

> TODO: [REVIEW]

As a rule of thumb resources should be defined to cover 90% of all its client’s use cases. A *useful* resource should contain as much information as necessary, but as little as possible. A great way to support the last 10% is to allow clients to specify their needs for more/less information by supporting filtering and [embedding](#embedding).

### **[MUST]** keep URLs verb-free

> TODO: [REVIEW]

The API describes resources, so the only place where actions should appear is in the HTTP methods. In URLs, use only nouns. Instead of thinking of actions (verbs), it’s often helpful to think about putting a message in a letter box: e.g., instead of having the verb *cancel* in the url, think of sending a message to cancel an order to the *cancellations* letter box on the server side.

### **[MUST]** use domain-specific resource names

> TODO: [REVIEW]

API resources represent elements of the application’s domain model. Using domain-specific nomenclature for resource names helps developers to understand the functionality and basic semantics of your resources. It also reduces the need for further documentation outside the API definition. For example, "sales-order-items" is superior to "order-items" in that it clearly indicates which business object it represents. Along these lines, "items" is too general.

### **[MUST]** use URL-friendly resource identifiers: `a-zA-Z0-9:._\-/\]*`

> TODO: [REVIEW]

To simplify encoding of resource IDs in URLs, their representation must only consist of ASCII strings using letters, numbers, underscore, minus, colon, period, and - on rare occasions - slash.

**Note:** slashes are only allowed to build and signal resource identifiers consisting of [compound keys](#may-expose-compound-keys-as-resource-identifiers).

### **[MUST]** identify resources and sub-resources via path segments

> TODO: [REVIEW]

Some API resources may contain or reference sub-resources. Embedded sub-resources, which are not top-level resources, are parts of a higher-level resource and cannot be used outside of its scope. Sub-resources should be referenced by their name and identifier in the path segments as follows:

```
/resources/{resource-id}/sub-resources/{sub-resource-id}
```

In order to improve the consumer experience, you **[SHOULD** aim for intuitively understandable URLs, where each sub-path is a valid reference to a resource or a set of resources. E.g. if `/customers/12ev123bv12v/addresses/DE_100100101` is valid, then `/customers/12ev123bv12v/addresses`, `/customers/12ev123bv12v` and `/customers` must be valid as well in principle. E.g.:

```
/customers/12ev123bv12v/addresses/DE_100100101
/customers/12ev123bv12v
/shopping-carts/de:1681e6b88ec1/items/1
/shopping-carts/de:1681e6b88ec1
/content/images/9cacb4d8
/content/images
```

**Note:** resource identifiers may be build of multiple other resource identifiers (see [**MAY** expose compound keys as resource identifiers](#may-expose-compound-keys-as-resource-identifiers)).

### **[MAY]** expose compound keys as resource identifiers

> TODO: [REVIEW]

If a resource is best identified by a *compound key* consisting of multiple other resource identifiers, it is allowed to reuse the compound key in its natural form containing slashes instead of *technical* resource identifier in the resource path without violating the above rule [**MUST** identify resources and sub-resources via path segments](#must-identify-resources-and-sub-resources-via-path-segments) as follows:

```
/resources/{compound-key-1}[delim-1]...[delim-n-1]{compound-key-n}
```

Example paths:

```
/shopping-carts/{country}/{session-id}
/shopping-carts/{country}/{session-id}/items/{item-id}
/api-specifications/{docker-image-id}/apis/{path}/{file-name}
/api-specifications/{repository-name}/{artifact-name}:{tag}
/article-size-advices/{sku}/{sales-channel}
```

**Warning:** Exposing a compound key as described above limits ability to evolve the structure of the resource identifier as it is no longer opaque.

To compensate for this drawback, APIs must apply a compound key abstraction consistently in all requests and responses parameters and attributes allowing consumers to treat these as *technical resource identifier* replacement. The use of independent compound key components must be limited to search and creation requests, as follows:

```
# compound key components passed as independent search query parameters
GET /article-size-advices?skus=sku-1,sku-2&sales_channel_id=sid-1
=> { "items": [{ "id": "id-1", ...  },{ "id": "id-2", ...  }] }

# opaque technical resource identifier passed as path parameter
GET /article-size-advices/id-1
=> { "id": "id-1", "sku": "sku-1", "sales_channel_id": "sid-1", "size": ... }

# compound key components passed as mandatory request fields
POST /article-size-advices { "sku": "sku-1", "sales_channel_id": "sid-1", "size": ... }
=> { "id": "id-1", "sku": "sku-1", "sales_channel_id": "sid-1", "size": ... }
```

Where `id-1` is representing the opaque provision of the compound key `sku-1/sid-1` as technical resource identifier.

**Remark:** A compound key component may itself be used as another resource identifier providing another resource endpoint, e.g `/article-size-advices/{sku}`.

### **[MAY]** consider using (non-)nested URLs

> TODO: [REVIEW]

If a sub-resource is only accessible via its parent resource and may not exist without parent resource, consider using a nested URL structure, for instance:

```
/shoping-carts/de/1681e6b88ec1/cart-items/1
```

However, if the resource can be accessed directly via its unique id, then the API should expose it as a top-level resource. For example, customer has a collection for sales orders; however, sales orders have globally unique id and some services may choose to access the orders directly, for instance:

```
/customers/1637asikzec1
/sales-orders/5273gh3k525a
```

### **[MUST]** pluralize resource names

> 
>
> TODO [WIP]
>
> 



```
/customers/1637asikzec1
/sales-orders/5273gh3k525a
```



### **[SHOULD]** only use UUIDs if necessary

> TODO: [REVIEW]

Generating IDs can be a scaling problem in high frequency and near real time use cases. UUIDs solve this problem, as they can be generated without collisions in a distributed, non-coordinated way and without additional server round trips.

However, they also come with some disadvantages:

- pure technical key without meaning; not ready for naming or name scope conventions that might be helpful for pragmatic reasons, e.g. we learned to use names for product attributes, instead of UUIDs
- less usable, because…
- cannot be memorized and easily communicated by humans
- harder to use in debugging and logging analysis
- less convenient for consumer facing usage
- quite long: readable representation requires 36 characters and comes with higher memory and bandwidth consumption
- not ordered along their creation history and no indication of used id volume
- may be in conflict with additional backward compatibility support of legacy ids

UUIDs should be avoided when not needed for large scale id generation. Instead, for instance, server side support with id generation can be preferred (`POST` on id resource, followed by idempotent `PUT` on entity resource). Usage of UUIDs is especially discouraged as primary keys of master and configuration data, like brand-ids or attribute-ids which have low id volume but widespread steering functionality.

Please be aware that sequential, strictly monotonically increasing numeric identifiers may reveal critical, confidential business information, like order volume, to non-privileged clients.

In any case, we should always use string rather than number type for identifiers. This gives us more flexibility to evolve the identifier naming scheme. Accordingly, if used as identifiers, UUIDs should not be qualified using a format property.

*Hint*: Usually, random UUID is used - see UUID version 4 in [RFC 4122](https://tools.ietf.org/html/rfc4122). Though UUID version 1 also contains leading timestamps it is not reflected by its lexicographic sorting. This deficit is addressed by [ULID](https://github.com/ulid/spec) (Universally Unique Lexicographically Sortable Identifier). You may favour ULID instead of UUID, for instance, for pagination use cases ordered along creation time.

### **[SHOULD]** limit number of resource types

> TODO: [REVIEW]

To keep maintenance and service evolution manageable, we should follow "functional segmentation" and "separation of concern" design principles and do not mix different business functionalities in same API definition. In practice this means that the number of resource types exposed via an API should be limited. In this context a resource type is defined as a set of highly related resources such as a collection, its members and any direct sub-resources.

For example, the resources below would be counted as three resource types, one for customers, one for the addresses, and one for the customers' related addresses:

```
/customers
/customers/{id}
/customers/{id}/preferences
/customers/{id}/addresses
/customers/{id}/addresses/{addr}
/addresses
/addresses/{addr}
```

Note that:

- We consider `/customers/id/preferences` part of the `/customers` resource type because it has a one-to-one relation to the customer without an additional identifier.
- We consider `/customers` and `/customers/id/addresses` as separate resource types because `/customers/id/addresses/{addr}` also exists with an additional identifier for the address.
- We consider `/addresses` and `/customers/id/addresses` as separate resource types because there’s no reliable way to be sure they are the same.

Given this definition, our experience is that well defined APIs involve no more than 4 to 8 resource types. There may be exceptions with more complex business domains that require more resources, but you should first check if you can split them into separate subdomains with distinct APIs.

Nevertheless one API should hold all necessary resources to model complete business processes helping clients to understand these flows.

### **[SHOULD]** limit number of sub-resource levels

> TODO: [REVIEW]

There are main resources (with root url paths) and sub-resources (or *nested* resources with non-root urls paths). Use sub-resources if their life cycle is (loosely) coupled to the main resource, i.e. the main resource works as collection resource of the subresource entities. You should use <= 3 sub-resource (nesting) levels — more levels increase API complexity and url path length. (Remember, some popular web browsers do not support URLs of more than 2000 characters.)

### **[MUST]** stick to conventional query parameters

> TODO: [REVIEW]
>
> TODO: sorgfältig prüfen

If you provide query support for searching, sorting, filtering, and paginating, you must stick to the following naming conventions:

- `q`: default query parameter, e.g. used by browser tab completion; should have an entity specific alias, e.g. sku.
- `sort`: comma-separated list of fields (as defined by [**MUST** define collection format of header and query parameters](#must-define-collection-format-of-header-and-query-parameters)) to define the sort order. To indicate sorting direction, fields may be prefixed with `+` (ascending) or `-` (descending), e.g. /sales-orders?sort=+id.
- `fields`: field name expression to retrieve only a subset of fields of a resource. See [**SHOULD** support partial responses via filtering](#should-support-partial-responses-via-filtering) below.
- `embed`: field name expression to expand or embedded sub-entities, e.g. inside of an article entity, expand silhouette code into the silhouette object. Implementing `embed` correctly is difficult, so do it with care. See [**SHOULD** allow optional embedding of sub-resources](#should-allow-optional-embedding-of-sub-resources).
- `offset`: numeric offset of the first element provided on a page representing a collection request. See [Collection Resources](#collection-resources) section below.
- `cursor`: an opaque pointer to a page, never to be inspected or constructed by clients. It usually (encrypted) encodes the page position, i.e. the identifier of the first or last page element, the pagination direction, and the applied query filters to recreate the collection. See [Collection Resources](#collection-resources) section below.
- `limit`: client suggested limit to restrict the number of entries on a page. See [Collection Resources](#collection-resources) section below.

### **[MUST]** define collection format of header and query parameters

> TODO: [REVIEW]

Header and query parameters allow to provide a collection of values, either by providing a comma-separated list of values or by repeating the parameter multiple times with different values as follows:

| Parameter Type | Comma-separated Values  | Multiple Parameters              | Standard                                                     |
| :------------- | :---------------------- | :------------------------------- | :----------------------------------------------------------- |
| Header         | `Header: value1,value2` | `Header: value1, Header: value2` | [RFC 7230 Section 3.2.2](https://tools.ietf.org/html/rfc7230#section-3.2.2) |
| Query          | `?param=value1,value2`  | `?param=value1&param=value2`     | [RFC 6570 Section 3.2.8](https://tools.ietf.org/html/rfc6570#section-3.2.8) |

As Open API does not support both schemas at once, an API specification must explicitly define the collection format to guide consumers as follows:

| Parameter Type | Comma-separated Values          | Multiple Parameters                                          |
| :------------- | :------------------------------ | :----------------------------------------------------------- |
| Header         | `style: simple, explode: false` | not allowed (see [RFC 7230 Section 3.2.2](https://tools.ietf.org/html/rfc7230#section-3.2.2)) |
| Query          | `style: form, explode: false`   | `style: form, explode: true`                                 |

When choosing the collection format, take into account the tool support, the escaping of special characters and the maximal URL length.

## Filtered Resources

### **[SHOULD]** support partial responses via filtering

> TODO: [REVIEW]

Depending on your use case and payload size, you can significantly reduce network bandwidth need by supporting filtering of returned entity fields. Here, the client can explicitly determine the subset of fields he wants to receive via the `fields` query parameter. (It is analogue to [GraphQL `fields`](https://graphql.org/learn/queries/#fields) and simple queries, and also applied, for instance, for [Google Cloud API’s partial responses](https://cloud.google.com/storage/docs/json_api/v1/how-tos/performance#partial-response).)

**Example 1**: Unfiltered Response

```json
GET http://api.example.org/users/123 HTTP/1.1

HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "cddd5e44-dae0-11e5-8c01-63ed66ab2da5",
  "name": "John Doe",
  "address": "1600 Pennsylvania Avenue Northwest, Washington, DC, United States",
  "birthday": "1984-09-13",
  "friends": [ {
    "id": "1fb43648-dae1-11e5-aa01-1fbc3abb1cd0",
    "name": "Jane Doe",
    "address": "1600 Pennsylvania Avenue Northwest, Washington, DC, United States",
    "birthday": "1988-04-07"
  } ]
}
```

**Example 2**: Filtered Response

```json
GET http://api.example.org/users/123?fields=(name,friends(id,name)) HTTP/1.1

HTTP/1.1 200 OK
Content-Type: application/json

{
  "name": "John Doe",
  "friends": [ {
    "id": "cddd5e44-dae0-11e5-8c01-63ed66ab2da5",
    "name": "Jane Doe"
  } ]
}
```

The `fields` query parameter determines the fields returned with the response payload object. For instance, `(name)` returns `users` root object with only the `name` field, and `(name,friends(id,name))` returns the `name` and the nested `friends` object with only its `id` and `name` fields.

Open API doesn’t support you in formally specifying different return object schemes depending on a parameter. When you define the field parameter, we recommend to provide the following description: `Endpoint supports filtering of return object fields as described in [[**SHOULD**] support partial responses via filtering](should-support-partial-responses-via-filtering)`

The syntax of the query `fields` value is defined by the following [BNF](https://en.wikipedia.org/wiki/Backus–Naur_form) grammar.

```
<fields>            ::= [ <negation> ] <fields_struct>
<fields_struct>     ::= "(" <field_items> ")"
<field_items>       ::= <field> [ "," <field_items> ]
<field>             ::= <field_name> | <fields_substruct>
<fields_substruct>  ::= <field_name> <fields_struct>
<field_name>        ::= <dash_letter_digit> [ <field_name> ]
<dash_letter_digit> ::= <dash> | <letter> | <digit>
<dash>              ::= "-" | "_"
<letter>            ::= "A" | ... | "Z" | "a" | ... | "z"
<digit>             ::= "0" | ... | "9"
<negation>          ::= "!"
```

**Note:** Following the [principle of least astonishment](https://en.wikipedia.org/wiki/Principle_of_least_astonishment), you should not define the `fields` query parameter using a default value, as the result is counter-intuitive and very likely not anticipated by the consumer.

### **[MUST]** document implicit filtering

> TODO: [REVIEW]

Sometimes certain collection resources or queries will not list all the possible elements they have, but only those for which the current client is authorized to access.

Implicit filtering could be done on:

- the collection of resources being return on a parent `GET` request
- the fields returned for the resource’s detail

In such cases, the implicit filtering must be in the API specification (in its description).

**Example**:

If an employee of the company *Foo* accesses one of our business-to-business service and performs a `GET /business-partners`, it must, for legal reasons, not display any other business partner that is not owned or contractually managed by her/his company. It should never see that we are doing business also with company *Bar*.

Response as seen from a consumer working at `FOO`:

```json
{
    "items": [
        { "name": "Foo Performance" },
        { "name": "Foo Sport" },
        { "name": "Foo Signature" }
    ]
}
```

Response as seen from a consumer working at `BAR`:

```json
{
    "items": [
        { "name": "Bar Classics" },
        { "name": "Bar pour Elle" }
    ]
}
```

The API Specification should then specify something like this:

```yaml
paths:
  /business-partner:
    get:
      description: >-
        Get the list of registered business partner.
        Only the business partners to which you have access to are returned.
```

## Embedded Resources

### [SHOULD] use HAL format for embedded resources

> TODO: [WIP]
>
> **TODO**: für interne APIs. Bei public APIs ist das ein MUST. Hinweis auf mögliche spätere Migration auf HAL
>
> 



### **[SHOULD]** allow optional embedding of sub-resources

> TODO: [REVIEW]

Embedding related resources (also know as *Resource expansion*) is a great way to reduce the number of requests. In cases where clients know upfront that they need some related resources they can instruct the server to prefetch that data eagerly. Whether this is optimized on the server, e.g. a database join, or done in a generic way, e.g. an HTTP proxy that transparently embeds resources, is up to the implementation.

See [**MUST** stick to conventional query parameters](#must-stick-to-conventional-query-parameters) for naming, e.g. "embed" for steering of embedded resource expansion. Please use the [BNF](https://en.wikipedia.org/wiki/Backus–Naur_form) grammar, as already defined above for filtering, when it comes to an embedding query syntax.

Embedding a sub-resource can possibly look like this where an order resource has its order items as sub-resource (/order/{orderId}/items):

```json
GET /order/123?embed=(items) HTTP/1.1

{
  "id": "123",
  "_embedded": {
    "item": [
      {
        "position": 1,
        "sku": "1234-ABCD-7890",
        "price": {
          "amount": 71.99,
          "currency": "EUR"
        }
      }
    ]
  }
}
```

## Collection Resources

### **[SHOULD]** design simple query languages using query parameters

> TODO: [REVIEW]

We prefer the use of query parameters to describe resource-specific query languages for the majority of APIs because it’s native to HTTP, easy to extend and has excellent implementation support in HTTP clients and web frameworks.

Query parameters should have the following aspects specified:

- Reference to corresponding property, if any
- Value range, e.g. inclusive vs. exclusive
- Comparison semantics (equals, less than, greater than, etc)
- Implications when combined with other queries, e.g. *and* vs. *or*

How query parameters are named and used is up to individual API designers. The following examples should serve as ideas:

- `name=Otto`, to query for elements based on property equality
- `age=5`, to query for elements based on logical properties
  - Assuming that elements don’t actually have an `age` but rather a `birthday`
- `maxLength=5`, based on upper and lower bounds (`min` and `max`)
- `shorterThan=5`, using terminology specific e.g. to *length*
- `createdBefore=2019-07-17` or `notModifiedSince=2019-07-17`
  - Using terminology specific e.g. to time: *before*, *after*, *since* and *until*

We don’t advocate for or against certain names because in the end APIs should be free to choose the terminology that fits their domain the best.

### **[SHOULD]** design complex query languages using JSON

> TODO: [REVIEW]

Minimalistic query languages based on [query parameters](#should-design-simple-query-languages-using-query-parameters) are suitable for simple use cases with a small set of available filters that are combined in one way and one way only (e.g. *and* semantics). Simple query languages are generally preferred over complex ones.

Some APIs will have a need for sophisticated and more complex query languages. Dominant examples are APIs around search (incl. faceting) and product catalogs.

Aspects that set those APIs apart from the rest include but are not limited to:

- Unusual high number of available filters
- Dynamic filters, due to a dynamic and extensible resource model
- Free choice of operators, e.g. `and`, `or` and `not`

APIs that qualify for a specific, complex query language are encouraged to use nested JSON data structures and define them using Open API directly. This provides the following benefits:

- Data structures are easy to use for clients
  - No special library support necessary
  - No need for string concatenation or manual escaping
- Data structures are easy to use for servers
  - No special tokenizers needed
  - Semantics are attached to data structures rather than text tokens
- Consistent with other HTTP methods
- API is defined in Open API completely
  - No external documents or grammars needed
  - Existing means are familiar to everyone

[JSON-specific rules](#json-guidelines) and most certainly needs to make use of the [`GET`-with-body](#get-with-body) pattern.

The following JSON document should serve as an idea how a structured query might look like.

```json
{
  "and": {
    "name": {
      "match": "Alice"
    },
    "age": {
      "or": {
        "range": {
          ">": 25,
          "<=": 50
        },
        "=": 65
      }
    }
  }
}
```

Feel free to also get some inspiration from:

- [Elastic Search: Query DSL](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl.html)
- [GraphQL: Queries](https://graphql.org/learn/queries/)

## Hypermedia

### **[MUST]** use REST maturity level 2 for internal APIs

> TODO: [WIP]
>
> **TODO**: Links prüfen, Hinweis auf internal APIs
>
> 

We strive for a good implementation of [REST Maturity Level 2](http://martinfowler.com/articles/richardsonMaturityModel.html#level2) as it enables us to build resource-oriented APIs that make full use of HTTP verbs and status codes. You can see this expressed by many rules throughout these guidelines, e.g.:

- [**MUST** avoid actions - think about resources](#must-avoid-actions-think-about-resources)
- [**MUST** keep URLs verb-free](#must-keep-urls-verb-free)
- [**MUST** use HTTP methods correctly](#must-use-http-methods-correctly)
- [**MUST** use standard HTTP status codes](#must-use-standard-http-status-codes)

Although this is not HATEOAS, it should not prevent you from designing proper link relationships in your APIs as stated in rules below.

### **[MUST]** use REST maturity level 3 - HATEOAS - for public APIs

> TODO: [WIP]
>
> **TODO** Vollständig überarbeiten bzw. ersetzen!
>
> 

We do not generally recommend to implement [REST Maturity Level 3](http://martinfowler.com/articles/richardsonMaturityModel.html#level3). HATEOAS comes with additional API complexity without real value in our SOA context where client and server interact via REST APIs and provide complex business functions as part of our e-commerce SaaS platform.

Our major concerns regarding the promised advantages of HATEOAS (see also [RESTistential Crisis over Hypermedia APIs](https://www.infoq.com/news/2014/03/rest-at-odds-with-web-apis), [Why I Hate HATEOAS](https://jeffknupp.com/blog/2014/06/03/why-i-hate-hateoas/) and others for a detailed discussion):

- We follow the [API First principle](https://opensource.zalando.com/restful-api-guidelines/#100) with APIs explicitly defined outside the code with standard specification language. HATEOAS does not really add value for SOA client engineers in terms of API self-descriptiveness: a client engineer finds necessary links and usage description (depending on resource state) in the API reference definition anyway.
- Generic HATEOAS clients which need no prior knowledge about APIs and explore API capabilities based on hypermedia information provided, is a theoretical concept that we haven’t seen working in practice and does not fit to our SOA set-up. The Open API description format (and tooling based on Open API) doesn’t provide sufficient support for HATEOAS either.
- In practice relevant HATEOAS approximations (e.g. following specifications like HAL or JSON API) support API navigation by abstracting from URL endpoint and HTTP method aspects via link types. So, Hypermedia does not prevent clients from required manual changes when domain model changes over time.
- Hypermedia make sense for humans, less for SOA machine clients. We would expect use cases where it may provide value more likely in the frontend and human facing service domain.
- Hypermedia does not prevent API clients to implement shortcuts and directly target resources without 'discovering' them.

However, we do not forbid HATEOAS; you could use it, if you checked its limitations and still see clear value for your usage scenario that justifies its additional complexity. If you use HATEOAS please share experience and present your findings in the [API Guild [internal link](https://confluence.zalando.net/display/GUL/API+Guild)].

### **[MUST]** use HAL for partner and public APIs

> 
>
> TODO: [WIP]
>
> 

### **[MUST]** use full, absolute URI

> TODO: [REVIEW]

Links to other resource must always use full, absolute URI.

**Motivation**: Exposing any form of relative URI (no matter if the relative URI uses an absolute or relative path) introduces avoidable client side complexity. It also requires clarity on the base URI, which might not be given when using features like embedding subresources. The primary advantage of non-absolute URI is reduction of the payload size, which is better achievable by following the recommendation to use gzip compression

### **[MUST]** use common hypertext controls

> TODO: [WIP]
>
> 
>
> **TODO** Vollständig überarbeiten bzw. ersetzen!
>
> 



When embedding links to other resources into representations you must use the common hypertext control object. It contains at least one attribute:

- [`href`](https://opensource.zalando.com/restful-api-guidelines/#href): The URI of the resource the hypertext control is linking to. All our API are using HTTP(s) as URI scheme.

In API that contain any hypertext controls, the attribute name [`href`](https://opensource.zalando.com/restful-api-guidelines/#href) is reserved for usage within hypertext controls.

The schema for hypertext controls can be derived from this model:

```yaml
HttpLink:
  description: A base type of objects representing links to resources.
  type: object
  properties:
    href:
      description: Any URI that is using http or https protocol
      type: string
      format: uri
  required:
    - href
```

The name of an attribute holding such a `HttpLink` object specifies the relation between the object that contains the link and the linked resource. Implementations should use names from the [IANA Link Relation Registry](http://www.iana.org/assignments/link-relations) whenever appropriate. As IANA link relation names use hyphen-case notation, while this guide enforces snake_case notation for attribute names, hyphens in IANA names have to be replaced with underscores (e.g. the IANA link relation type `version-history` would become the attribute `version_history`)

Specific link objects may extend the basic link type with additional attributes, to give additional information related to the linked resource or the relationship between the source resource and the linked one.

E.g. a service providing "Person" resources could model a person who is married with some other person with a hypertext control that contains attributes which describe the other person (`id`, `name`) but also the relationship "spouse" between the two persons (`since`):

```json
{
  "id": "446f9876-e89b-12d3-a456-426655440000",
  "name": "Peter Mustermann",
  "spouse": {
    "href": "https://...",
    "since": "1996-12-19",
    "id": "123e4567-e89b-12d3-a456-426655440000",
    "name": "Linda Mustermann"
  }
}
```

Hypertext controls are allowed anywhere within a JSON model. While this specification would allow[HAL](http://stateless.co/hal_specification.html), we actually don’t recommend/enforce the usage of HAL anymore as the structural separation of meta-data and data creates more harm than value to the understandability and usability of an API.

## HAL+JSON Guidelines

> TODO: [WIP]

### Linking

> TODO: [WIP]

### Embedding

> TODO: [WIP]

### Link-Relation Types

> TODO: [WIP]

### Curies

> TODO: [WIP]

## Media Types

> TODO: [WIP]

