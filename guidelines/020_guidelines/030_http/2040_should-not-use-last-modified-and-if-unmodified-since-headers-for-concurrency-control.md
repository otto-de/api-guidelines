---
type: SHOULD NOT
id: R000072
---

# use `Last-Modified` and `If-Unmodified-Since` headers for concurrency control

APIs should not use the `Last-Modified` header to achieve concurrency control.
The header only provides a time resolution of one second, which is too coarse for most use cases.
You might be able to use this header in certain less constraint cases.

If you choose to implement this behavior nevertheless, you should communicate this to clients by responding with `428 Precondition Required` for requests that do not contain the corresponding `If-Unmodified-Since` header.

::: references

- [SHOULD follow concurrenct update pattern with `If-Modified-Since` header](./guidelines/020_guidelines/030_http/2050_should-follow-concurrenct-update-pattern-with-if-umodified-since-header.md)
- [SHOULD use `ETag` together with `If-Match`/`If-None-Match` header for concurrency control](./guidelines/020_guidelines/030_http/2020_should-use-etag-together-with-if-match-if-none-match-header-for-concurrrency-control.md)

:::
