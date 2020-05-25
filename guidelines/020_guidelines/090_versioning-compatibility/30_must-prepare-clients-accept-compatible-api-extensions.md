---
type: MUST
id: R000029
---

# prepare clients accept compatible API extensions

Service clients should apply the robustness principle:

- Be conservative with API requests and data passed as input, e.g. avoid to exploit definition deficits like passing megabytes of strings with unspecified maximum length.
- Be tolerant in processing and reading data of API responses, more specifically…

Service clients must be prepared for compatible API extensions of service providers:

- Be tolerant with unknown fields in the payload (see also Fowler’s ["TolerantReader"](http://martinfowler.com/bliki/TolerantReader.html) post), i.e. ignore new fields but do not eliminate them from payload if needed for subsequent `PUT` requests.
- Be prepared that `enum` return parameter may deliver new values; either be agnostic or provide default behavior for unknown values.
- Be prepared to handle HTTP status codes not explicitly specified in endpoint definitions. Note also, that status codes are extensible. Default handling is how you would treat the corresponding `HTTP 2xx` code (see [RFC 7231 Section 6](https://tools.ietf.org/html/rfc7231#section-6)).
- Follow the redirect when the server returns HTTP status code `HTTP 301 Moved Permanently`.
