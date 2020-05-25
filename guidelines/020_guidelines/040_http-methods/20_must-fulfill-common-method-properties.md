---
type: MUST
id: R000008
---

# fulfill common method properties

Request methods in RESTful services can be:

- [safe](https://tools.ietf.org/html/rfc7231#section-4.2.1) - the operation semantic is defined to be read-only, meaning it must not have _intended side effects_, i.e. changes, to the server state.
- [idempotent](https://tools.ietf.org/html/rfc7231#section-4.2.2) - the operation has the same _intended effect_ on the server state, independently whether it is executed once or multiple times.
  **Note:** this does not require that the operation is returning the same response or status code.
- [cacheable](https://tools.ietf.org/html/rfc7231#section-4.2.3) - to indicate that responses are allowed to be stored for future reuse.
  In general, requests to safe methods are cacheable, if no current or authoritative response from the server is required.

**Note:** The above definitions, of _intended (side) effect_ allows the server to provide additional state changing behavior as logging, accounting, pre-fetching, etc.
However, these actual effects and state changes, must not be intended by the operation so that it can be held accountable.

Method implementations must fulfill the following basic properties according to [RFC 7231](https://tools.ietf.org/html/rfc7231):

| Method                | Safe  | Idempotent                                                                      | Cacheable                                                                                                |
| --------------------- | ----- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [`GET`](#get)         | ✔ Yes | ✔ Yes                                                                           | ✔ Yes                                                                                                    |
| [`HEAD`](#head)       | ✔ Yes | ✔ Yes                                                                           | ✔ Yes                                                                                                    |
| [`POST`](#post)       | ✗ No  | ⚠️ No, but [**[SHOULD]** consider to design `POST` and `PATCH`idempotent](link) | ⚠️ May, but only if specific [`POST`](#post) endpoint is `safe`. **Hint:** not supported by most caches. |
| [`PUT`](#put)         | ✗ No  | ✔ Yes                                                                           | ✗ No                                                                                                     |
| [`PATCH`](#patch)     | ✗ No  | ⚠️ No, but [**SHOULD** consider to design `POST` and `PATCH` idempotent](link)) | ✗ No                                                                                                     |
| [`DELETE`](#delete)   | ✗ No  | ✔ Yes                                                                           | ✗ No                                                                                                     |
| [`OPTIONS`](#options) | ✔ Yes | ✔ Yes                                                                           | ✗ No                                                                                                     |
