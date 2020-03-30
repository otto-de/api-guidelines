# RESTful API



[TOC]

## Resources

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

### Link-Relation Types

### Embedding

### Deprecation

## Media Types

## Collection Resources

[MUST]** collection-resource names must be in plural

## Pagination

## Versioning