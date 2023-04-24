---
id: R000008
---

# MUST fulfill common method properties

Request methods in RESTful services can be:

- [safe](https://tools.ietf.org/html/rfc7231#section-4.2.1) - the operation semantic is defined to be read-only, meaning it must not have _intended side effects_, i.e. changes, to the server state.
- [idempotent](https://tools.ietf.org/html/rfc7231#section-4.2.2) - the operation has the same _intended effect_ on the server state, independently whether it is executed once or multiple times.
  This does not require that the operation is returning the same response or status code. Especially executing a `DELETE` twice might yield a `200 OK` followed by a `404 Not Found` or even `410 Gone`.
- [cacheable](https://tools.ietf.org/html/rfc7231#section-4.2.3) - to indicate that responses are allowed to be stored for future reuse.
  In general, requests to safe methods are cacheable, if no current or authoritative response from the server is required.

::: info Info
Requests can result in numerous server actions such as logging, accounting, collecting metrics, pre-fetching, etc. Clients, however, cannot expect or be held accountable for these _side effects_.
Some server actions, such as rate limiting, may also cause a server-side state change and produce a different response code as a result. This behavior would still allow the methods to be considered safe or idempotent.
:::

Method implementations must fulfill the following basic properties according to [RFC 7231](https://tools.ietf.org/html/rfc7231):

| Method    | Safe | Idempotent | Cacheable |
| --------- | ---- | ---------- | --------- |
| `GET`     | ✔    | ✔          | ✔         |
| `HEAD`    | ✔    | ✔          | ✔         |
| `POST`    | ✗    | ✗ [^1]     | ✗ [^2]    |
| `PUT`     | ✗    | ✔          | ✗         |
| `PATCH`   | ✗    | ✗ [^3]     | ✗         |
| `DELETE`  | ✗    | ✔          | ✗         |
| `OPTIONS` | ✔    | ✔          | ✗         |

[^1]: No, but you [SHOULD consider to design `POST` and `PATCH` idempotent](./should-consider-to-design-post-and-patch-idempotent.md).
[^2]: May, but only if the specific `POST` endpoint is `safe`. Not supported by most caches.
[^3]: No, but you [SHOULD consider to design `POST` and `PATCH` idempotent](./should-consider-to-design-post-and-patch-idempotent.md).
