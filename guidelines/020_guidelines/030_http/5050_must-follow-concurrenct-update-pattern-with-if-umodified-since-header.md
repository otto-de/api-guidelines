---
type: MUST
id: R000073
---

# follow concurrent update pattern with `If-Unmodified-Since` header

If an API implements concurrency control via the `Last-Modified` header, clients must follow this pattern. This means a client has to send a received `Last-Modified` timestamp using the `If-Unmodified-Since` header. This will allow the server to verify the conditional request.

If you don't provide the header the server may respond with `428 Precondition Required`.

::: references

- [[SHOULD NOT] use `Last-Modified` & `If-Unmodified-Since` headers for concurrency control](./guidelines/030_http/5040_should-not-use-last-modified-&-if-unmodified-since-headers-for-concurrency-control.md)
- [[SHOULD] use `ETag` together with `If-Match`/`If-None-Match` header for concurrency control](./guidelines/030_http/5020_should-use-etag-together-with-if-match-if-none-match-header-for-concurrrency-control.md)

:::
