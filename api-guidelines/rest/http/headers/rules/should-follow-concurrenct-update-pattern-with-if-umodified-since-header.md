---
type: SHOULD
id: R000073
---

# follow concurrent update pattern with `If-Unmodified-Since` header

If an API implements concurrency control via the `Last-Modified` header, clients should follow this pattern.
This means, a client should send a received `Last-Modified` timestamp using the `If-Unmodified-Since` header.
This allows the server to verify the conditional request.

If you do not provide the header, the server may respond with `428 Precondition Required`.

::: references

- [SHOULD NOT use `Last-Modified` and `If-Unmodified-Since` headers for concurrency control](@guidelines/R000072)
- [SHOULD use `ETag` together with `If-Match`/`If-None-Match` header for concurrency control](@guidelines/R000060)

:::
