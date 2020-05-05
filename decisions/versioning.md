# Versioning

After deciding to continue using HAL+JSON as the API format, we can cluster the [list of identified options](../topics/versioning.md) 
into three categories, including those relying on media types otherwise forbidden by using JSON:API.

We cannot support a single global version number for the whole OTTO API, because it would introduce way too much 
coordination overhead between functional teams. Also we want to use industry standards as much as possible, factoring 
out solutions that violate existing standards or rely on draft standards where incompatible changes might happen.

Both of the remaining options require some semantic of 'latest version' of an endpoint. For 
[resource versioned path](../topics/versioning.md#resource-versioned-paths) this can be solved by using a special 
version identifier of `latest` as part of the URI, e.g. https://api.otto.de/checkouts/latest. The option 
[Accept header with profile parameter](../topics/versioning.md#accept-header-using-standard-media-type-with-profile-parameter) 
needs some server-side logic to route to the correct endpoint in case an `Accept` header used for content negotiation 
does not include a versioned profile for the media type.

## Decision

Finally, we have come to the conclusion that we want to handle versioning in the following manner:

### <span style="color: #D4021D;">MUST</span> not break backward compatibility

Change APIs, but keep all consumers running. Consumers usually have independent release lifecycles, focus on stability, 
and avoid changes that do not provide additional value. APIs are contracts between service providers and service 
consumers that cannot be broken via unilateral decisions.

There are two techniques to change APIs without breaking them:

- follow rules for compatible extensions
- introduce new API versions and still support older versions

We strongly encourage using compatible API extensions and discourage versioning. The following guidelines for service 
providers ([SHOULD prefer compatible extensions](#should-prefer-compatible-extensions)) and consumers 
([MUST prepare clients accept compatible API extensions](#must-prepare-clients-accept-compatible-api-extensions)) 
enable us (having Postel’s Law in mind) to make compatible changes without versioning.

**Note:** There is a difference between incompatible and breaking changes. Incompatible changes are changes that are 
not covered by the compatibility rules below. Breaking changes are incompatible changes deployed into operation, and 
thereby breaking running API consumers. Usually, incompatible changes are breaking changes when deployed into operation. 
However, in specific controlled situations it is possible to deploy incompatible changes in a non-breaking way, if no 
API consumer is using the affected API aspects (see also Deprecation[TODO: link] guidelines).

### <span style="color: #F1B500;">SHOULD</span> prefer compatible extensions

API designers should apply the following rules to evolve RESTful APIs for services in a backward-compatible way:

- Add only optional, never mandatory fields.
- Never change the semantic of fields (e.g. changing the semantic from customer-number to customer-id, as both are 
  different unique customer keys)
- Input fields may have (complex) constraints being validated via server-side business logic. Never change the 
  validation logic to be more restrictive and make sure that all constraints are clearly defined in description.
- Enum ranges can be reduced when used as input parameters, only if the server is ready to accept and handle old range 
  values too. Enum range can be reduced when used as output parameters.
- Enum ranges cannot be extended when used for output parameters — clients may not be prepared to handle it. However, 
  enum ranges can be extended when used for input parameters.
- Support redirection in case an URL has to change `HTTP 301 Moved Permanently`.

### <span style="color: #D4021D;">MUST</span> prepare clients accept compatible API extensions

Service clients should apply the robustness principle:

- Be conservative with API requests and data passed as input, e.g. avoid to exploit definition deficits like passing 
  megabytes of strings with unspecified maximum length.
- Be tolerant in processing and reading data of API responses, more specifically…

Service clients must be prepared for compatible API extensions of service providers:

- Be tolerant with unknown fields in the payload (see also Fowler’s 
  ["TolerantReader"](http://martinfowler.com/bliki/TolerantReader.html) post), i.e. ignore new fields but do not 
  eliminate them from payload if needed for subsequent `PUT` requests.
- Be prepared that `enum` return parameter may deliver new values; either be agnostic or provide default behavior for 
  unknown values.
- Be prepared to handle HTTP status codes not explicitly specified in endpoint definitions. Note also, that status 
  codes are extensible. Default handling is how you would treat the corresponding `HTTP 2xx` code 
  (see [RFC 7231 Section 6](https://tools.ietf.org/html/rfc7231#section-6)).
- Follow the redirect when the server returns HTTP status code `HTTP 301 Moved Permanently`.

### <span style="color: #F1B500;">SHOULD</span> use `Accept` header with profile parameter

When changing your RESTful APIs, do so in a compatible way and avoid generating additional API versions. 
Multiple versions can significantly complicate understanding, testing, maintaining, evolving, operating and releasing 
our systems ([supplementary reading](http://martinfowler.com/articles/enterpriseREST.html)).

If changing an API can’t be done in a compatible way, versioning should be implemented using the 
[`Accept' header using standard media type with profile parameter](../topics/versioning.md#accept-header-using-standard-media-type-with-profile-parameter).

### <span style="color: #69AF1F;">SHOULD NOT</span> use resource versioned path

Version numbers in URLs should not be used. However, if the preferred versioning option is not possible, 
[resource versioned path](../topics/versioning.md#resource-versioned-paths) may be introduced, if absolutely required. 
