---
id: R006010
---

# SHOULD adhere to caching best practices

For consistent cache handling amongst services, adhere to the best practices shown below:

- Avoid client side and transparent web caching.
  - Read [RFC 7234](https://tools.ietf.org/html/rfc7234) before adding any client or proxy cache.
- Since all endpoints are [authorized via OAuth2](/guidelines/r000047), the default `Cache-Control` header should be `Cache-Control: private, must-revalidate` with a `max-age` value between some seconds to some hours.
- Use the `Cache-Control` (HTTP 1.1) header instead of the `Pragma` (HTTP 1.0) header.
- Consider using the `ETag` header when caching.
  - See: [MAY use `ETag` header for caching resources](/guidelines/r000010) and [SHOULD use `ETag` together with `If-Match`/`If-None-Match` header for concurrency control](/guidelines/r000060)
- Avoid the `Last-Modified` header when possible.
  - See: [SHOULD NOT use `Last-Modified` and `If-Unmodified-Since` headers for concurrency control](/guidelines/r000060)
- Avoid the `Expires` header to prevent redundant and ambiguous definition of cache lifetime.
