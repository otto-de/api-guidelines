---
type: MUST
id: R000073
---

# follow concurrent update pattern with `If-Unmodified-Since` header

If an API implements concurrency control via the `Last-Modified` header, clients must follow this pattern. This means a client has to send a received `Last-Modified` timestamp using the `If-Unmodified-Since` header. This will allow the server to verified the conditional request.

If you don't provide the header the server may respond with `428 Precondition Required`.

::: references

- [[SHOULD NOT] use `Last-Modified` & `If-Unmodified-Since` headers for concurrency control]()
- [[SHOULD] use `ETag` together with `If-Match`/`If-None-Match` header for concurrency control]()

:::
