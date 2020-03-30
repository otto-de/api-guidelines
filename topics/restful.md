# RESTful API

## Table of Contents

[TOC]

## API design principles

Comparing SOA web service interfacing style of SOAP vs. REST, the former tend to be centered around operations that are usually use-case specific and specialized. In contrast, REST is centered around business (data) entities exposed as resources that are identified via URIs and can be manipulated via standardized CRUD-like methods using different representations, and hypermedia. RESTful APIs tend to be less use-case specific and comes with less rigid client / server coupling and are more suitable for an ecosystem of (core) services providing a platform of APIs to build diverse new business services. We apply the RESTful web service principles to all kind of application (micro-) service components, independently from whether they provide functionality via the internet or intranet.

- We prefer REST-based APIs with JSON payloads
- We prefer systems to be truly RESTful

An important principle for API design and usage is Postel’s Law, aka [The Robustness Principle](http://en.wikipedia.org/wiki/Robustness_principle) (see also [RFC 1122](https://tools.ietf.org/html/rfc1122)):

> Be liberal in what you accept, be conservative in what you send

*Readings:* Some interesting reads on the RESTful API design style and service architecture:

- Book: [Irresistable APIs: Designing web APIs that developers will love](https://www.amazon.de/Irresistible-APIs-Designing-that-developers/dp/1617292559)
- Book: [REST in Practice: Hypermedia and Systems Architecture](http://www.amazon.de/REST-Practice-Hypermedia-Systems-Architecture/dp/0596805829)
- Book: [Build APIs You Won’t Hate](https://leanpub.com/build-apis-you-wont-hate)
- InfoQ eBook: [Web APIs: From Start to Finish](http://www.infoq.com/minibooks/emag-web-api)
- Lessons-learned blog: [Thoughts on RESTful API Design](http://restful-api-design.readthedocs.org/en/latest/)
- Fielding Dissertation: [Architectural Styles and the Design of Network-Based Software Architectures](http://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm)

## Compatibility and Versioning

### **[MUST]** not break backward compatibility

Change APIs, but keep all consumers running. Consumers usually have independent release lifecycles, focus on stability, and avoid changes that do not provide additional value. APIs are contracts between service providers and service consumers that cannot be broken via unilateral decisions.

There are two techniques to change APIs without breaking them:

- follow rules for compatible extensions
- introduce new API versions and still support older versions

We strongly encourage using compatible API extensions and discourage versioning (see [**SHOULD** avoid versioning](#should-avoid-versioning) below). The following guidelines for service providers ([**SHOULD** prefer compatible extensions](#should-prefer-compatible-extensions)) and consumers ([**MUST** prepare clients accept compatible API extensions](#must-prepare-clients-accept-compatible-api-extensions)) enable us (having Postel’s Law in mind) to make compatible changes without versioning.

**Note:** There is a difference between incompatible and breaking changes. Incompatible changes are changes that are not covered by the compatibility rules below. Breaking changes are incompatible changes deployed into operation, and thereby breaking running API consumers. Usually, incompatible changes are breaking changes when deployed into operation. However, in specific controlled situations it is possible to deploy incompatible changes in a non-breaking way, if no API consumer is using the affected API aspects (see also [Deprecation](#deprecation) guidelines).

**Hint:** Please note that the compatibility guarantees are for the "on the wire" format. Binary or source compatibility of code generated from an API definition is not covered by these rules. If client implementations update their generation process to a new version of the API definition, it has to be expected that code changes are necessary.

### **[SHOULD]** prefer compatible extensions

API designers should apply the following rules to evolve RESTful APIs for services in a backward-compatible way:

- Add only optional, never mandatory fields.
- Never change the semantic of fields (e.g. changing the semantic from customer-number to customer-id, as both are different unique customer keys)
- Input fields may have (complex) constraints being validated via server-side business logic. Never change the validation logic to be more restrictive and make sure that all constraints are clearly defined in description.
- Enum ranges can be reduced when used as input parameters, only if the server is ready to accept and handle old range values too. Enum range can be reduced when used as output parameters.
- Enum ranges cannot be extended when used for output parameters — clients may not be prepared to handle it. However, enum ranges can be extended when used for input parameters.
- Support redirection in case an URL has to change `HTTP 301 Moved Permanently`.

### **[MUST]** prepare clients accept compatible API extensions

Service clients should apply the robustness principle:

- Be conservative with API requests and data passed as input, e.g. avoid to exploit definition deficits like passing megabytes of strings with unspecified maximum length.
- Be tolerant in processing and reading data of API responses, more specifically…

Service clients must be prepared for compatible API extensions of service providers:

- Be tolerant with unknown fields in the payload (see also Fowler’s ["TolerantReader"](http://martinfowler.com/bliki/TolerantReader.html) post), i.e. ignore new fields but do not eliminate them from payload if needed for subsequent `PUT` requests.
- Be prepared that `enum` return parameter may deliver new values; either be agnostic or provide default behavior for unknown values.
- Be prepared to handle HTTP status codes not explicitly specified in endpoint definitions. Note also, that status codes are extensible. Default handling is how you would treat the corresponding `HTTP 2xx` code (see [RFC 7231 Section 6](https://tools.ietf.org/html/rfc7231#section-6)).
- Follow the redirect when the server returns HTTP status code `HTTP 301 Moved Permanently`.

### **[SHOULD]** avoid versioning

When changing your RESTful APIs, do so in a compatible way and avoid generating additional API versions. Multiple versions can significantly complicate understanding, testing, maintaining, evolving, operating and releasing our systems ([supplementary reading](http://martinfowler.com/articles/enterpriseREST.html)).

If changing an API can’t be done in a compatible way, then proceed in one of these three ways:

- create a new resource (variant) in addition to the old resource variant
- create a new service endpoint — i.e. a new application with a new API (with a new domain name)
- create a new API version supported in parallel with the old API by the same microservice

As we discourage versioning by all means because of the manifold disadvantages, we strongly recommend to only use the first two approaches.

### **[MUST]** use media type versioning

> **TODO**: Mit Entscheidungen zum Thema Versionierung abgleichen!!!

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

> **TODO**: Mit Entscheidungen zum Thema Versionierung abgleichen!!!

With URI versioning a (major) version number is included in the path, e.g. `/v1/customers`. The consumer has to wait until the provider has been released and deployed. If the consumer also supports hypermedia links — even in their APIs — to drive workflows (HATEOAS), this quickly becomes complex. So does coordinating version upgrades — especially with hyperlinked service dependencies — when using URL versioning. To avoid this tighter coupling and complexer release management we do not use URI versioning, and go instead with media type versioning and content negotiation (see above).

## Deprecation

Sometimes it is necessary to phase out an API endpoint, an API version, or an API feature, e.g. if a field or parameter is no longer supported or a whole business functionality behind an endpoint is supposed to be shut down. As long as the API endpoints and features are still used by consumers these shut downs are breaking changes and not allowed. To progress the following deprecation rules have to be applied to make sure that the necessary consumer changes and actions are well communicated and aligned using *deprecation* and *sunset* dates.

### **[MUST]** obtain approval of clients before API shut down

Before shutting down an API, version of an API, or API feature the producer must make sure, that all clients have given their consent on a sunset date. Producers should help consumers to migrate to a potential new API or API feature by providing a migration manual and clearly state the time line for replacement availability and sunset (see also [**SHOULD** add `Deprecation` and `Sunset` header to responses](#should-add-deprecation-and-sunset-header-to-responses)). Once all clients of a sunset API feature are migrated, the producer may shut down the deprecated API feature.

### **[MUST]** collect external partner consent on deprecation time span

If the API is consumed by any external partner, the API owner must define a reasonable time span that the API will be maintained after the producer has announced deprecation. All external partners must state consent with this after-deprecation-life-span, i.e. the minimum time span between official deprecation and first possible sunset, **before** they are allowed to use the API.

### **[MUST]** reflect deprecation in API specifications

The API deprecation must be part of the API specification.

If an API endpoint (operation object), an input argument (parameter object), an in/out data object (schema object), or on a more fine grained level, a schema attribute or property should be deprecated, the producers must set `deprecated: true` for the affected element and add further explanation to the `description` section of the API specification. If a future shut down is planned, the producer must provide a sunset date and document in details what consumers should use instead and how to migrate.

### **[MUST]** monitor usage of deprecated API scheduled for sunset

Owners of an API, API version, or API feature used in production that is scheduled for sunset must monitor the usage of the sunset API, API version, or API feature in order to observe migration progress and avoid uncontrolled breaking effects on ongoing consumers.

### **[SHOULD]** add `Deprecation` and `Sunset` header to responses

During the deprecation phase, the producer should add a `Deprecation: ` (see [draft: RFC Deprecation HTTP Header](https://tools.ietf.org/html/draft-dalal-deprecation-header)) and - if also planned - a `Sunset: ` (see [RFC 8594](https://tools.ietf.org/html/rfc8594#section-3)) header on each response affected by a deprecated element (see [**MUST** reflect deprecation in API specifications](#must-reflect-deprecation-in-api-specifications)).

The [`Deprecation`](https://tools.ietf.org/html/draft-dalal-deprecation-header) header can either be set to `true` - if a feature is retired -, or carry a deprecation time stamp, at which a replacement will become/became available and consumers must not on-board any longer (see [**MUST** not start using deprecated APIs](#must-not-start-using-deprecated-apis)). The optional [`Sunset`](https://tools.ietf.org/html/rfc8594) time stamp carries the information when consumers latest have to stop using a feature. The sunset date should always offer an eligible time interval for switching to a replacement feature.

```
Deprecation: Sun, 31 Dec 2024 23:59:59 GMT
Sunset: Sun, 31 Dec 2025 23:59:59 GMT
```

If multiple elements are deprecated the [`Deprecation`](https://tools.ietf.org/html/draft-dalal-deprecation-header) and [`Sunset`](https://tools.ietf.org/html/rfc8594) headers are expected to be set to the earliest time stamp to reflect the shortest interval consumers are expected to get active.

**Note:** adding the [`Deprecation`](https://tools.ietf.org/html/draft-dalal-deprecation-header) and [`Sunset`](https://tools.ietf.org/html/rfc8594) header is not sufficient to gain client consent to shut down an API or feature.

### **[SHOULD]** add monitoring for `Deprecation` and `Sunset` header

Clients should monitor the [`Deprecation`](https://tools.ietf.org/html/draft-dalal-deprecation-header) and [`Sunset`](https://tools.ietf.org/html/rfc8594) headers in HTTP responses to get information about future sunset of APIs and API features (see [**SHOULD** add `Deprecation` and `Sunset` header to responses](#should-add-deprecation-and-sunset-header-to-responses)). We recommend that client owners build alerts on this monitoring information to ensure alignment with service owners on required migration task.

### **[MUST]** not start using deprecated APIs

Clients must not start using deprecated APIs, API versions, or API features.

## REST Resources

### **[MUST]** avoid actions — think about resources

REST is all about your resources, so consider the domain entities that take part in web service interaction, and aim to model your API around these using the standard HTTP methods as operation indicators. For instance, if an application has to lock articles explicitly so that only one user may edit them, create an article lock with `PUT` or `POST` instead of using a lock action.

Request:

```
PUT /article-locks/{article-id}
```

The added benefit is that you already have a service for browsing and filtering article locks.

### **[SHOULD]** model complete business processes

An API should contain the complete business processes containing all resources representing the process. This enables clients to understand the business process, foster a consistent design of the business process, allow for synergies from description and implementation perspective, and eliminates implicit invisible dependencies between APIs.

In addition, it prevents services from being designed as thin wrappers around databases, which normally tends to shift business logic to the clients.

### **[SHOULD]** define *useful* resources

As a rule of thumb resources should be defined to cover 90% of all its client’s use cases. A *useful* resource should contain as much information as necessary, but as little as possible. A great way to support the last 10% is to allow clients to specify their needs for more/less information by supporting filtering and [embedding](#embedding).

### **[MUST]** keep URLs verb-free

The API describes resources, so the only place where actions should appear is in the HTTP methods. In URLs, use only nouns. Instead of thinking of actions (verbs), it’s often helpful to think about putting a message in a letter box: e.g., instead of having the verb *cancel* in the url, think of sending a message to cancel an order to the *cancellations* letter box on the server side.

### **[MUST]** use domain-specific resource names

API resources represent elements of the application’s domain model. Using domain-specific nomenclature for resource names helps developers to understand the functionality and basic semantics of your resources. It also reduces the need for further documentation outside the API definition. For example, "sales-order-items" is superior to "order-items" in that it clearly indicates which business object it represents. Along these lines, "items" is too general.

### **[MUST]** use URL-friendly resource identifiers: `a-zA-Z0-9:._\-/\]*`

To simplify encoding of resource IDs in URLs, their representation must only consist of ASCII strings using letters, numbers, underscore, minus, colon, period, and - on rare occasions - slash.

**Note:** slashes are only allowed to build and signal resource identifiers consisting of [compound keys](#may-expose-compound-keys-as-resource-identifiers).

### **[MUST]** identify resources and sub-resources via path segments

Some API resources may contain or reference sub-resources. Embedded sub-resources, which are not top-level resources, are parts of a higher-level resource and cannot be used outside of its scope. Sub-resources should be referenced by their name and identifier in the path segments as follows:

```
/resources/{resource-id}/sub-resources/{sub-resource-id}
```

In order to improve the consumer experience, you should aim for intuitively understandable URLs, where each sub-path is a valid reference to a resource or a set of resources. E.g. if `/customers/12ev123bv12v/addresses/DE_100100101` is valid, then `/customers/12ev123bv12v/addresses`, `/customers/12ev123bv12v` and `/customers` must be valid as well in principle. E.g.:

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

If a sub-resource is only accessible via its parent resource and may not exist without parent resource, consider using a nested URL structure, for instance:

```
/shoping-carts/de/1681e6b88ec1/cart-items/1
```

However, if the resource can be accessed directly via its unique id, then the API should expose it as a top-level resource. For example, customer has a collection for sales orders; however, sales orders have globally unique id and some services may choose to access the orders directly, for instance:

```
/customers/1637asikzec1
/sales-orders/5273gh3k525a
```

### **[SHOULD]** only use UUIDs if necessary

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

There are main resources (with root url paths) and sub-resources (or *nested* resources with non-root urls paths). Use sub-resources if their life cycle is (loosely) coupled to the main resource, i.e. the main resource works as collection resource of the subresource entities. You should use <= 3 sub-resource (nesting) levels — more levels increase API complexity and url path length. (Remember, some popular web browsers do not support URLs of more than 2000 characters.)

## HTTP Methods

## HTTP Status Codes

## Common Headers

## Hypermedia

## JSON Guidelines

These guidelines provides recommendations for defining JSON data at OTTO. JSON here refers to [RFC 7159](https://tools.ietf.org/html/rfc7159) (which updates [RFC 4627(https://tools.ietf.org/html/rfc4627)]), the "application/json" media type and custom JSON media types defined for APIs. The guidelines clarifies some specific cases to allow OTTO JSON data to have an idiomatic form across teams and services.

The first some of the following guidelines are about property names, the later ones about values.

### **[MUST]** use JSON to encode structured data

Use JSON-encoded body payload for transferring structured data. The JSON payload must follow [RFC 7159](https://tools.ietf.org/html/rfc7159) using a JSON object as top-level data structure (if possible) to allow for future extension. This also applies to collection resources, where one naturally would assume an array. 

Additionally, the JSON payload must comply to [RFC 7493](https://tools.ietf.org/html/rfc7493), particularly

- [Section 2.1](https://tools.ietf.org/html/rfc7493#section-2.1) on encoding of characters, and
- [Section 2.3](https://tools.ietf.org/html/rfc7493#section-2.3) on object constraints.

As a consequence, a JSON payload must

- use [`UTF-8` encoding](https://tools.ietf.org/html/rfc7493#section-2.1)
- consist of [valid Unicode strings](https://tools.ietf.org/html/rfc7493#section-2.1), i.e. must not contain non-characters or surrogates, and
- contain only [unique member names](https://tools.ietf.org/html/rfc7493#section-2.3) (no duplicate names).

### **[MUST]** always return JSON objects as top-level data structures

In a response body, you must always return a JSON object (and not e.g. an array) as a top level data structure to support future extensibility. JSON objects support compatible extension by additional attributes. This allows you to easily extend your response and e.g. add pagination later, without breaking backwards compatibility. See [**SHOULD** use pagination links where applicable](https://opensource.zalando.com/restful-api-guidelines/#161) for an example.

## JSON Property Names

### **[MUST]** property names must be named in english

Generally speaking, only english should be used to name things: properties, property values, resources, etc. pp.

### **[MUST]** property names must be ASCII camelCase (and never snake_case): `[a-z_][a-zA-Z0-9]*`

Property names are restricted to ASCII strings. The first character must be a letter, or an underscore, and subsequent characters can be a letter or a number.

(It is highly recommended to use _ at the start of property names only for keywords like _links or _embedded.)

*Rationale*: No established industry standard exists, but the currently existing OTTO APIs prefer camelCase. While many popular Internet companies prefer snake_case: e.g. GitHub, Stack Exchange, Twitter. Others, like Google and Amazon, use both - not only camelCase. It’s essential to establish a consistent look and feel such that JSON looks as if it came from the same hand.

### **[MUST]** array names must be in plural

To indicate they contain multiple values prefer to pluralize array names. This implies that object names should in turn be singular.

## JSON Property Values

### **[MUST]** not use `null` for boolean properties

Schema based JSON properties that are by design booleans must not be presented as nulls. A boolean is essentially a closed enumeration of two values, true and false. If the content has a meaningful `null` value, strongly prefer to replace the boolean with enumeration of named values or statuses - for example `acceptedTermsAndConditions` with `true` or `false` can be replaced with `acceptedTermsAndConditions` with values `yes`, `no` and `unknown`.

### **[MUST]** represent enumerations as strings

Strings are a reasonable target for values that are by design enumerations.

### **[MUST]** declare enum values using UPPER_SNAKE_CASE format

Enum values need to consistently use the upper-snake case format, e.g. `VALUE` or `YET_ANOTHER_VALUE`. This approach allows to clearly distinguish values from properties or other elements.

### **[MUST]** use same semantics for `null` and absent properties

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

Empty array values can unambiguously be represented as the empty list, `[]`.

### **[MUST]** define dates and times properties compliant with [RFC 3339](https://tools.ietf.org/html/rfc3339) 

Use the date and time formats defined by [RFC 3339](https://tools.ietf.org/html/rfc3339#section-5.6):

- for "date" use strings matching `date-fullyear "-" date-month "-" date-mday`, for example: `2015-05-28`
- for "date-time" use strings matching `full-date "T" full-time`, for example `2015-05-28T14:07:17Z`

Note that the [Open API format](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#data-types) "date-time" corresponds to "date-time" in the RFC) and `2015-05-28`for a date (note that the Open API format "date" corresponds to "full-date" in the RFC). Both are specific profiles, a subset of the international standard [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601).

A zone offset may be used (both, in request and responses) — this is simply defined by the standards. However, we encourage restricting dates to UTC and without offsets. For example `2015-05-28T14:07:17Z` rather than `2015-05-28T14:07:17+00:00`. From experience we have learned that zone offsets are not easy to understand and often not correctly handled. Note also that zone offsets are different from local times that might be including daylight saving time. Localization of dates should be done by the services that provide user interfaces, if required.

When it comes to storage, all dates should be consistently stored in UTC without a zone offset. Localization should be done locally by the services that provide user interfaces, if required.

Sometimes it can seem data is naturally represented using numerical timestamps, but this can introduce interpretation issues with precision, e.g. whether to represent a timestamp as 1460062925, 1460062925000 or 1460062925.000. Date strings, though more verbose and requiring more effort to parse, avoid this ambiguity.

### **[SHOULD]** define time durations and intervals properties conform to ISO 8601 

Schema based JSON properties that are by design durations and intervals could be strings formatted as recommended by [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)([Appendix A of RFC 3339 contains a grammar](https://tools.ietf.org/html/rfc3339#appendix-A) for durations).

## HAL+JSON Guidelines

### Linking

### Embedding

### Link-Relation Types

### Curies

## Media Types

## Collection Resources

[MUST]** collection-resource names must be in plural

## Pagination

