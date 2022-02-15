---
sideNav: true
navTitle: Headers
---

# Headers

## List of headers

:::: accordions
::: accordion Headers

The list of headers is not supposed to be exhaustive, but contains the most common headers used in the context of the API.
We do not prohibit the use of headers that are not listed below.
HTTP/1.1-related headers, for example, `Connection`, are not explicitly listed.

| Header Name             | Description                                                                                                                                                                                                                                                                              | Part of Request | Part of Response |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------: | :--------------: |
| `Accept`                | Used for content negotiation, indicates which content types the client understands in a response. Refer to [SHOULD use `Accept` and `Content-Type` headers with profile parameter](R000030).                                                                                             |        ✔        |        ✗         |
| `Accept-Encoding`       | Used for content negotiation, a client advertises which content encoding algorithms it understands in a response. Possible values are `gzip`, `compress`, `deflate`, `identity`, and `br`.                                                                                               |        ✔        |        ✗         |
| `Allow`                 | Contains the set of methods supported by a resource. This header must be set when responding with `405 Method Not Allowed`. Example: `Allow: GET, PUT, HEAD`.                                                                                                                            |        ✗        |        ✔         |
| `Authorization`         | Includes the credentials for accessing a given resource. Refer to [MUST use Bearer Authentication](R000021).                                                                                                                                                                             |        ✔        |        ✗         |
| `Content-Encoding`      | Indicates the content encoding used for the response body. Refer to `Accept-Encoding`.                                                                                                                                                                                                   |        ✗        |        ✔         |
| `Content-Length`        | The size of the request payload or response body in bytes.                                                                                                                                                                                                                               |        ✔        |        ✔         |
| `Content-Type`          | Indicates the media type of a resource. Describes the payload format of requests and the content type of responses. Required for `PUT` and `POST` requests. Refer to [SHOULD use `Accept` and `Content-Type` headers with profile parameter](R000030)                                    |        ✔        |        ✔         |
| `Date`                  | Contains the timestamp of the request (client) and response (server) respectively. The timestamp format must follow [RFC 7231](https://tools.ietf.org/html/rfc7231#section-7.1.1.1)                                                                                                      |        ✔        |        ✔         |
| `ETag`                  | Used for [caching](R000010) and [concurrency control](R000060).                                                                                                                                                                                                                          |        ✗        |        ✔         |
| `Forwarded`             | Contains information from the client side of proxy servers that is altered or lost when a proxy is involved. This can be the original `Host` requested by a client, for example to [generate absolute URLs in links](R100032). Refer to [RFC 7239](https://tools.ietf.org/html/rfc7239). |        ✔        |        ✗         |
| `Host`                  | Contains the hostname (and non-default port) of the client's request. Example: `Host: api.otto.de`                                                                                                                                                                                       |        ✔        |        ✗         |
| `If-Match`              | Used for [caching](R000010) and [concurrency control](R000060).                                                                                                                                                                                                                          |        ✔        |        ✗         |
| `If-None-Match`         | Used for [caching](R000010) and [concurrency control](R000060).                                                                                                                                                                                                                          |        ✔        |        ✗         |
| `Location`              | Contains the redirect URL. This URL must be fully qualified.                                                                                                                                                                                                                             |        ✗        |        ✔         |
| `Retry-After`           | Used for rate limiting. Refer to [MUST use code 429 with headers for rate limits](R000014).                                                                                                                                                                                              |        ✗        |        ✔         |
| `Server`                | The header describes the software used by the server that handled the request.                                                                                                                                                                                                           |        ✗        |        ✔         |
| `User-Agent`            | Used by a client to identify itself to the server. It should include a unique, human-readable identifier, optionally suffixed by a version string reflecting different software releases of the client. Example: [`User-Agent: otto-ready/v2.3.1`](R000025)                              |        ✔        |        ✗         |
| `X-RateLimit-Limit`     | Used for rate limiting. Refer to [MUST use code 429 with headers for rate limits](R000014).                                                                                                                                                                                              |        ✗        |        ✔         |
| `X-RateLimit-Remaining` | Used for rate limiting. Refer to [MUST use code 429 with headers for rate limits](R000014).                                                                                                                                                                                              |        ✗        |        ✔         |
| `X-RateLimit-Reset`     | Used for rate limiting. Refer to [MUST use code 429 with headers for rate limits](R000014).                                                                                                                                                                                              |        ✗        |        ✔         |

::: references

- [MUST NOT use link headers for JSON representations](R100034)

:::
::::

## Header fields

:::: accordions
::: accordion ETag
The RFC 7232 `ETag` header field in a response provides the entity tag of a selected resource. The entity tag is an opaque identifier for versions and representations of the same resource over time, regardless whether multiple versions are valid at the same time.
An entity tag consists of an opaque **quoted** string, possibly prefixed by a weakness indicator (refer to [RFC 7232 Section 2.3](https://tools.ietf.org/html/rfc7232#section-2.3)).
The contents of an `ETag: <entity tag>` header is either:

​ a) a hash of the response body,

​ b) a hash of the last modified field of the entity, or

​ c) a version number or identifier of the entity version.

Example: `W/"xy"`, `"5"`, `"5db68c06-1a68-11e9-8341-68f728c1ba70"`
:::

::: accordion If-Match
The RFC 7232 `If-Match` header field in a request requires the server to only operate on the resource that matches at least one of the provided entity-tags.
This allows clients to express a precondition that prevents the method from being applied if there have been any changes to the resource (refer to [RFC 7232 Section 3.1](https://tools.ietf.org/html/rfc7232#section-3.1)).

Example: `"5"`, `"7da7a728-f910-11e6-942a-68f728c1ba70"`
:::

::: accordion If-None-Match
The RFC 7232 `If-None-Match` header field in a request requires the server to only operate on the resource if it does **not** match any of the provided entity-tags. If the provided entity-tag is `*`, it is required that the resource does not exist at all (refer to [RFC 7232 Section 3.2](https://tools.ietf.org/html/rfc7232#section-3.2)).

Example: `"7da7a728-f910-11e6-942a-68f728c1ba70"`, `*`
:::

::: accordion Location
The `Location` header includes a fully qualified URL. This URL [must also be absolute](R100032) and respect any `Forwarded` header.
Use this for two use cases:

- Redirection: When answering a request with a `3xx` status code, the header value should point to where the resource moved.
- Creation: When succesfully creating a resource via `POST`, you should tell a client the final location of that resource using the `Location` header. If a resource was created via `PUT` the client is already aware of the resource location, in this instance you should not set the `Location` header.
  :::
  ::::
