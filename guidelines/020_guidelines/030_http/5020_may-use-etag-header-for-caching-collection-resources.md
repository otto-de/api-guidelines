---
type: MAY
id: R000021
---

# use `ETag` header for caching collection resources

> [REVIEW] Issue #57

Caching via the `ETag` & `If-None-Match` header may also be applicable for collection resources, though the semantics are not as straightforward as for single entities. While it's easy to determine whether a single underlying entity changed, it is nonobvious when the state of a whole collection changed. A collection may be viewed as changed when:

- a single entity of the given collection changed
- or the order of the collection items changed
- or the number of items in the collection changed

A _shallow_ comparison might be useful for some clients, while a _deep_ comparison could be necessary for use cases with stronger requirements. No general rule can be derived, the behaviour needs be defined on a case-by-case basis for the given application. It is also strongly recommended to incorporate the behaviour of the client into this decision.

If ETags for a collection resource should be implemented, the rules for single entities apply, see [[SHOULD] use `ETag` header for caching single entities](./guidelines/030_http/5010_should-use-etag-header-for-caching-single-entities.md) and [[MAY] use `ETag` together with `If-Match`/`If-None-Match` header for concurrency control](./guidelines/030_http/5030_may-use-etag-together-with-if-match-if-none-match-header-for-concurrrency-control.md).
