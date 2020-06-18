---
sideNav: true
navTitle: Headers
---

# HTTP headers

The list of headers is not supposed to be exhaustive, but contains the most common headers used in the context of the API. We don't prohibit the use of headers **not** listed below. There are headers related to HTTP/1.1, for example `Connection`, which are not explicitly listed.

| Header Name             | Description                                                                                                                                                                                                                                      | Part of Request | Part of Response |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- | ---------------- |
| `Accept`                | Used for content negotiation, indicates which content types the client understands in a response.                                                                                                                                                | ✔               | ✗                |
| `Accept-Encoding`       | Used for content negotiation, a client advertises which content encoding algorithms it understands in a response. Possible values are `gzip`, `compress`, `deflate`, `identity` & `br`.                                                          | ✔               | ✗                |
| `Allow`                 | Contains the set of methods supported by a resource. This header must be set when responding with `405 Method Not Allowed`. Example: `Allow: GET, PUT, HEAD`.                                                                                    | ✗               | ✔                |
| `Authorization`         | Includes the credentials for accessing a given resource, see [[MUST] use Bearer Authentication](./guidelines/020_security/1060_must-use-bearer-authentication.md).                                                                               | ✔               | ✗                |
| `Content-Encoding`      | Indicates the content encoding used for the response body, see `Accept-Encoding`.                                                                                                                                                                | ✗               | ✔                |
| `Content-Length`        | The size of the request payload or response body in bytes.                                                                                                                                                                                       | ✔               | ✔                |
| `Content-Type`          | Indicates the media type of a resource. Describes the payload format of requests and the content type of responses. Required for `PUT` & `POST` requests.                                                                                        | ✔               | ✔                |
| `Date`                  | Contains the timestamp of the request (client) and response (server) respectively. The timestamp format must follow [RFC 7231](https://tools.ietf.org/html/rfc7231#section-7.1.1.1)                                                              | ✔               | ✔                |
| `ETag`                  | Used for [caching](/guidelines/030_http/5010_may-use-etag-header-for-caching-resources.md) and [concurrency control](5030_may-use-etag-together-with-if-match-if-none-match-header-for-concurrrency-control.md).                                 | ✗               | ✔                |
| `Forwarded`             | Identifies the original `Host` requested by a client, to be used for e.g. [generating absolute URLs in links](/guidelines/020_guidelines/050_hypermedia/2010_must-use-absolute-urls.md). See [RFC 7239](https://tools.ietf.org/html/rfc7239)     | ✔               | ✗                |
| `If-Match`              | Used for [caching](/guidelines/030_http/5010_may-use-etag-header-for-caching-resources.md) and [concurrency control](5030_may-use-etag-together-with-if-match-if-none-match-header-for-concurrrency-control.md).                                 | ✔               | ✗                |
| `If-None-Match`         | Used for [caching](/guidelines/030_http/5010_may-use-etag-header-for-caching-resources.md) and [concurrency control](5030_may-use-etag-together-with-if-match-if-none-match-header-for-concurrrency-control.md).                                 | ✔               | ✗                |
| `Location`              | Contains a URL to redirect to. This URL also [must be absolute](/guidelines/020_guidelines/050_hypermedia/2010_must-use-absolute-urls.md) and respect any `Forwarded` header.                                                                    | ✗               | ✔                |
| `Retry-After`           | Used for rate limiting, see [[MUST] use code 429 with headers for rate limits](./guidelines/030_http/3040_must-use-code-429-with-headers-for-rate-limits.md)                                                                                     | ✗               | ✔                |
| `Server`                | [TODO]                                                                                                                                                                                                                                           | ✗               | ✔                |
| `User-Agent`            | Used by a client to identify itself to the server. It should include a unique, human-readable identifier, optionally suffixed by a version string reflecting different software releases of the client. Example: `User-Agent: otto-ready-v2.3.1` | ✔               | ✗                |
| `X-RateLimit-Limit`     | Used for rate limiting, see [[MUST] use code 429 with headers for rate limits](./guidelines/030_http/3040_must-use-code-429-with-headers-for-rate-limits.md)                                                                                     | ✔               | ✗                |
| `X-RateLimit-Remaining` | Used for rate limiting, see [[MUST] use code 429 with headers for rate limits](./guidelines/030_http/3040_must-use-code-429-with-headers-for-rate-limits.md)                                                                                     | ✔               | ✗                |
| `X-RateLimit-Reset`     | Used for rate limiting, see [[MUST] use code 429 with headers for rate limits](./guidelines/030_http/3040_must-use-code-429-with-headers-for-rate-limits.md)                                                                                     | ✔               | ✗                |

||| accordion ETag { begin }
The RFC 7232 `ETag` header field in a response provides the entity tag of a selected resource. The entity tag is an opaque identifier for versions and representations of the same resource over time, regardless whether multiple versions are valid at the same time. An entity tag consists of an opaque **quoted** string, possibly prefixed by a weakness indicator (see [RFC 7232 Section 2.3](https://tools.ietf.org/html/rfc7232#section-2.3)). The contents of an `ETag: <entity tag>` header is either:

​ a) a hash of the response body,

​ b) a hash of the last modified field of the entity, or

​ c) a version number or identifier of the entity version.

Example: `W/"xy"`, `"5"`, `"5db68c06-1a68-11e9-8341-68f728c1ba70"`
|||

||| accordion If-Match
The RFC 7232 `If-Match` header field in a request requires the server to only operate on the resource that matches at least one of the provided entity-tags. This allows clients to express a precondition that prevents the method from being applied if there have been any changes to the resource (see [RFC 7232 Section 3.1](https://tools.ietf.org/html/rfc7232#section-3.1).

Example: `"5"`, `"7da7a728-f910-11e6-942a-68f728c1ba70"`
|||

||| accordion If-None-Match
The RFC 7232 `If-None-Match` header field in a request requires the server to only operate on the resource if it does **not** match any of the provided entity-tags. If the provided entity-tag is `*`, it is required that the resource does not exist at all (see [RFC 7232 Section 3.2](https://tools.ietf.org/html/rfc7232#section-3.2).

Example: `"7da7a728-f910-11e6-942a-68f728c1ba70"`, `*`
|||

||| accordion Location
The `Location` header includes a fully qualified URL. Use this for two use cases:

- Redirection: When answering a request with a `3xx` status code, the header value should point to where the resource moved.
- Creation: When succesfully creating a resource via `POST`, you should tell a client the final location of that resource using the `Location` header. If a resource was created via `PUT` the client is already aware of the resource location, in this instance you should not set the `Location` header.
  |||
