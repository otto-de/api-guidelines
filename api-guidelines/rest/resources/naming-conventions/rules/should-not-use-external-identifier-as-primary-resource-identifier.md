---
id: R100077
---

# SHOULD NOT use external identifiers as primary resource identifiers

When you create an API endpoint that requires a resource identifier, you SHOULD NOT use an external identifier as resource identifier. Example: You're about to implement `some-resource/{external-id}`, assuming that `some-resource` is your resource and `external-id` is an ID that is not under your control - you'd better not do that.

Use one of the following options for your implementation instead:

1. Use your own unique identifier representing the external identifier, e.g. `some-resource/{your-unique-id}`.
2. Use a templated hypermedia link, such as `o:templated-link`.
3. Use querying capabilities, e.g. `/some-resource?external-id-name={external-id}`.

This is why using an external identifier as primary resource identifier is not recommended:

- The API will often respond with a 404 status for consumer requests with existing identifiers, causing issues for error monitoring.
- 404 errors should be reserved for rare cases, where an API forgets to notify a consumer about a resource being deleted and the consumer accesses this (now) stale link.
- Business need might change the relation.

