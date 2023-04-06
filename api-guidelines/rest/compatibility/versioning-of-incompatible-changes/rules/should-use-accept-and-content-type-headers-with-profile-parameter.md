---
id: R000030
---

# SHOULD use `Accept` and `Content-Type` headers with profile parameter

Change your RESTful APIs in a compatible way and avoid generating additional API versions.
Multiple versions can significantly complicate understanding, testing, maintaining, evolving, operating and releasing our systems ([supplementary reading](http://martinfowler.com/articles/enterpriseREST.html)).

If the modification of an API cannot be done in a compatible way, versioning should be implemented using the `Accept` and `Content-Type` header with `profile` parameter.

If the client does not specify the required `profile` in the `Accept` header, the server may choose which version is returned.

If the client does not specify the `Content-Type` header with `profile` parameter in a request with a body, the server may refuse the request with status code `400 Bad Request`.

The server may decline invalid combinations of `Content-Type` and `Accept` headers with `406 Not Acceptable`. For endpoint methods featuring both a request and a response body (e.g. `POST`), only requests for the same profile version in request and response body (via `Content-Type` and `Accept` header) must be supported.

::: references

- [MUST use profiles for Public APIs](/guidelines/r000065)
- [MUST use absolute URIs for profiles](/guidelines/r100066)
- [RFC 7231, p. 59: 406 for unsupported versions](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.6)
  :::
