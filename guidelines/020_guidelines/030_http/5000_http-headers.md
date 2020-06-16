---
sideNav: true
navTitle: Headers
---

# HTTP headers

[TODO] place `ETag` definition at its proper location

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
        [RFC 7232 Section 2.3](https://tools.ietf.org/html/rfc7232#section-2.3)).

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

::: info
Make sure to not forget to double-quote the values of `ETag` as per [RFC 7232 Section 2.3](https://tools.ietf.org/html/rfc7232#section-2.3)!
:::

| Header Name             | Description                                                                                                                                                                                                     | Part of Request | Part of Response |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ---------------- |
| `Accept`                | Used for content negotiation, indicates which content types the client understands in a response.                                                                                                               | ✔               | ✗                |
| `Accept-Encoding`       | Used for content negotiation, indicates which content encoding algorithms the client understands in a response.                                                                                                 | ✔               | ✗                |
| `Authorization`         | Includes the credentials for accessing a given resource, see [[MUST] use Bearer Authentication](./guidelines/020_security/1060_must-use-bearer-authentication.md).                                              | ✔               | ✗                |
| `Content-Encoding`      | Indicates the content encoding used for the response body, see `Accept-Encoding`.                                                                                                                               | ✗               | ✔                |
| `Content-Length`        | The size of the response body in bytes.                                                                                                                                                                         | ✗               | ✔                |
| `Content-Type`          | Indicates the media type of a resource. Describes the payload format of requests and the content type of responses. Required for `PUT` & `POST` requests.                                                       | ✔               | ✔                |
| `Cookies`               | > [TODO] separate issue? Also `Set-Cookies`. Probably not relevant for the API.                                                                                                                                 | ✔               | ✔                |
| `Date`                  | Contains the timestamp of the request (client) and response (server) respectively. The timestamp format must follow [RFC 7231](https://tools.ietf.org/html/rfc7231#section-7.1.1.1)                             | ✔               | ✔                |
| `ETag`                  | Used for [caching](/guidelines/030_http/5010_may-use-etag-header-for-caching-resources.md) and [concurrency control](5030_may-use-etag-together-with-if-match-if-none-match-header-for-concurrrency-control.md) | ✗               | ✔                |
| `If-Match`              | Used for [caching](/guidelines/030_http/5010_may-use-etag-header-for-caching-resources.md) and [concurrency control](5030_may-use-etag-together-with-if-match-if-none-match-header-for-concurrrency-control.md) | ✔               | ✗                |
| `If-Modified-Since`     | Used for [caching](/guidelines/030_http/5010_may-use-etag-header-for-caching-resources.md) and [concurrency control](5030_may-use-etag-together-with-if-match-if-none-match-header-for-concurrrency-control.md) | ✔               | ✗                |
| `If-None-Match`         | Used for [caching](/guidelines/030_http/5010_may-use-etag-header-for-caching-resources.md) and [concurrency control](5030_may-use-etag-together-with-if-match-if-none-match-header-for-concurrrency-control.md) | ✔               | ✗                |
| `Location`              | -                                                                                                                                                                                                               | ✗               | ✔                |
| `Retry-After`           | Used for rate limiting, see [[MUST] use code 429 with headers for rate limits](./guidelines/030_http/3040_must-use-code-429-with-headers-for-rate-limits.md)                                                    | ✗               | ✔                |
| `X-Forwarded-*`         | > [TODO] Should we support -For -Host & -Proto or recommend the actual standard `Forwarded` header                                                                                                              | ✔               | ✗                |
| `X-RateLimit-Limit`     | Used for rate limiting, see [[MUST] use code 429 with headers for rate limits](./guidelines/030_http/3040_must-use-code-429-with-headers-for-rate-limits.md)                                                    | ✔               | ✗                |
| `X-RateLimit-Remaining` | Used for rate limiting, see [[MUST] use code 429 with headers for rate limits](./guidelines/030_http/3040_must-use-code-429-with-headers-for-rate-limits.md)                                                    | ✔               | ✗                |
| `X-RateLimit-Reset`     | Used for rate limiting, see [[MUST] use code 429 with headers for rate limits](./guidelines/030_http/3040_must-use-code-429-with-headers-for-rate-limits.md)                                                    | ✔               | ✗                |

> [TODO] Caching headers (Expires, Vary, Cache-Control etc.), `If-Unmodified-Since`

## Request Response Example

> [TODO] Provide some HTTP examples demonstrating different header combinations
