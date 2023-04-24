---
id: R006030
---

# SHOULD avoid `Vary` header for caching

The `Vary` header as specified in [RFC7231#section-7.1.4](https://tools.ietf.org/html/rfc7231#section-7.1.4) is difficult to setup in order to support correct caching. For example, implementing secondary key calculation as described in [RFC7234#section-4.1](https://tools.ietf.org/html/rfc7234#section-4.1) has a high potential for mistakes. Whenever possible, use the `ETag` header instead of `Vary` for caching.

See:

- [MAY use `ETag` header for caching resources](../../headers/rules/may-use-etag-header-for-caching-resources.md)
- [SHOULD use `ETag` together with `If-Match`/`If-None-Match` header for concurrency control](../../headers/rules/should-use-etag-together-with-if-match-if-none-match-header-for-concurrrency-control.md)
