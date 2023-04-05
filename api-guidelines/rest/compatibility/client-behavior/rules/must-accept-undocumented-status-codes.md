---
id: R000080
---

# MUST accept undocumented status codes

Clients must be prepared to handle HTTP status codes not explicitly specified in endpoint definitions.

Clients are not required to understand every status code returned, but they must at least understand the class of each status code (i.e. 1xx, 2xx, 3xx, 4xx, 5xx) as defined in [RFC 7231 Section 6](https://tools.ietf.org/html/rfc7231#section-6). Clients must treat an unrecognized status code equivalent to the x00 status code (i.e. 100, 200, 300, 400, 500) of its class.
