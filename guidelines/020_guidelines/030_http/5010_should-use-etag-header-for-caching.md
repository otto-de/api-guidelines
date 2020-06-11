---
type: SHOULD
id: R000010
---

# use `ETag` header for caching

> TODO: [REVIEW] Issue #57

Using the `ETag` header in combination with the `If-None-Matching` header is a powerful tool for caching resources. This approach offers a solution where other caching headers (e.g. `Cache-Control` or `Expires`) hint at a _stale_ resource on the client side.

Commonly the header value is (1) a hash of the response body, (2) a hash of the last modified field of the entity, or​ (3) a version number or identifier of the entity version.

```sh
GET /products/abc123 HTTP/1.1

# Server sends ETag with requested resource
200 OK
ETag: "5db68c06-1a68-11e9-8341-68f728c1ba70"
{/* big payload */}

# Client passes ETag in `If-None-Match` header on subsequent requests
GET /products/abc123 HTTP/1.1
If-None-Match: "5db68c06-1a68-11e9-8341-68f728c1ba70"

# Server compares ETag values, indicates that the client version is up to date.
# The payload is not transmitted again.
304 Not Modified

# Down the line the resource has been changed, the client requests it again
GET /products/abc123 HTTP/1.1
If-None-Match: "5db68c06-1a68-11e9-8341-68f728c1ba70"

# Server compares Etag values, determines that the clients version is stale.
# The GET request is fully excuted, the payload and updated ETag are transmitted.
200 OK
ETag: "8341-5db68c06-68f728c1ba70-1a68-11e9"
{/* big payload */}
```

The semantic is best described as: _"please give me the representation of the current state of the resource, if the state changed compared to the version I already know about."_

The purpose of the value is to indicate a change in the underlying resource. One must differentiate between _weakly_ and _strongly_ validating entity tags:

- A _strong_ entity tag indicates a byte-by-byte equality if matching and should be the **default**.
- A _weak_ entity tag, marked by a `W/` prefix, only indicates semantic equality of the underlying resource. It should be the **fallback** if generating a strong tag is unfeasible, e.g. due to performance reasons.

`Note`{ label } A strong ETag must change when the representation of an entity changes, so it has to be sensitive to `Content-Type`, `Content-Encoding` and other response characteristics in order to be compliant with [RFC 7232](https://tools.ietf.org/html/rfc7232#section-2.3).

> [TODO] Document ETag behaviour on collections

> [TODO] Document double quotes being part of ETag value in "common headers" section and link to that section from here.
