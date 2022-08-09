---
type: SHOULD
id: R000074
---

# honor available `ETag` header on subsequent modifications

In addition to the normal payload, an optional `ETag` header can be part of the response to a `GET` or `HEAD` request.

A client should use the `ETag` response header value of a prior request as `If-Match: <entity tag>` request header on subsequent `PUT`, `PATCH` or `POST` requests for making modifications to a resource. This also applies for services, that introduced the `ETag` header with the sole intention of [improving cachability](@guidelines/R000010).
