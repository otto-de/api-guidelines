---
id: R000059
---

# MAY use `PATCH` with JSON Patch `test` operation for concurrency control

In a situation where partial updates on different properties of an entity are common, chances of running into an optimistic locking situation increase with the number of concurrent updates, even if embracing [SHOULD use `ETag` together with `If-Match`/`If-None-Match` header for concurrency control](../../headers/rules/should-use-etag-together-with-if-match-if-none-match-header-for-concurrrency-control.md). Performing a partial update using `PATCH` with media type `application/json-patch+json` (see [RFC 6902](https://tools.ietf.org/html/rfc6902)) can guard against unnoticed concurrent updates of properties relevant for the particular update.

JSON Patch offers a [`test` operation](https://tools.ietf.org/html/rfc6902#section-4.6) that allows a server to reject a partial update, if the condition defined by the client cannot be met.

Example:

```http
PATCH /products/123 HTTP/1.1
Content-Type: application/json-patch+json
[
  { "op": "test",    "path": "description", "value": "An old description" },
  { "op": "replace", "path": "description", "value": "A new description" }
]

HTTP/1.1 200 OK
ETag: "sadfgerlasdgjrgg"
{ "id": "123", "description": "A new description", ... }
```

Or in an optimistic locking situation:

```http
PATCH /products/123 HTTP/1.1
Content-Type: application/json-patch+json
[
  { "op": "test",    "path": "description", "value": "An old description" },
  { "op": "replace", "path": "description", "value": "A new description" }
]

HTTP/1.1 409 Conflict
```
