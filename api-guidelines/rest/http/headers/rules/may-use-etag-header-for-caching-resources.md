---
id: R000010
---

# MAY use `ETag` header for caching resources

Using the `ETag` response header in combination with the `If-None-Match` request header is a powerful tool for caching resources.
This approach offers a solution where other caching headers (e.g. `Cache-Control` or `Expires`) hint at a _stale_ resource on the client side.

:::warning
When implementing `ETag` for caching, also "[SHOULD use `ETag` together with `If-Match`/`If-None-Match` header for concurrency control](./should-use-etag-together-with-if-match-if-none-match-header-for-concurrrency-control.md)" applies, see below "pitfalls".
:::

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

The purpose of the value is to indicate a change in the underlying resource.
One must differentiate between _weakly_ and _strongly_ validating entity tags:

- A _strong_ entity tag indicates a byte-by-byte equality if matching and should be the **default**.
- A _weak_ entity tag, marked by a `W/` prefix, only indicates semantic equality of the underlying resource. It should be the **fallback** if generating a strong tag is unfeasible, e.g. due to performance reasons.

There are [several pitfalls](https://www.mnot.net/blog/2007/08/07/etags) to consider when implementing the `ETag` header correctly:

- A strong `ETag` value must change when the representation of an entity changes, so it has to be sensitive to `Content-Type`, `Content-Encoding` and other response characteristics in order to be compliant with [RFC 7232](https://tools.ietf.org/html/rfc7232#section-2.3).
- Using `gzip` compression will include a timestamp in your compressed resource representation, resulting in a different `ETag` value when compressed at another time even though the resource has not changed at all.
- Handing out `ETag` headers for caching also implies, that your API also supports concurrency control/optimistic locking via `ETag`. This might add unwanted development and operational overhead.
- You might find yourself doing a bunch of (CPU-bound) work on the server only to validate incoming `If-None-Match` request headers. In this case using `ETag` will only save network bandwidth, while still incurring compute costs, dwarfing the actual returns expected from implementing `ETag`.
- `ETag` for collection resources are nontrivial to implement (see below).

## Caching collection resources

Caching via the `ETag` and `If-None-Match` header may also be applicable for collection resources, though the semantics are not as straightforward as for single entities.
While it is easy to determine whether a single underlying entity changed, it is nonobvious when the state of a whole collection changed.
A collection may be viewed as changed when:

- a single entity of the given collection changed
- or the order of the collection items changed
- or the number of items in the collection changed.

A _shallow_ comparison might be useful for some clients, while a _deep_ comparison could be necessary for use cases with stronger requirements.
No general rule can be derived, the behavior needs be defined on a case-by-case basis for the given application.
