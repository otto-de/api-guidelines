---
type: SHOULD
id: R000030
---

# use `Accept` header with profile parameter

Change your RESTful APIs in a compatible way and avoid generating additional API versions.
Multiple versions can significantly complicate understanding, testing, maintaining, evolving, operating and releasing our systems ([supplementary reading](http://martinfowler.com/articles/enterpriseREST.html)).

If the modification of an API cannot be done in a compatible way, versioning should be implemented using the `Accept` header with profile parameter. If the client does not specify the required profile version, the server is not obliged to return a compatible version.
In addition, the server may decline invalid combinations of `Content-Type` and `Accept` headers with `406 Not Acceptable`. For endpoint methods featuring both a request and a response body (e.g. `POST`), only requests for the same profile version in request and response body (via `Content-Type` and `Accept` header) must be supported.

::: references

- [API Versioning](./guidelines/020_guidelines/080_versioning/0000_index.md)
- [MUST use profiles for Public APIs](./guidelines/020_guidelines/080_versioning/0005_must_version_with_profiles.md)
- [MUST use resolvable profile URLs](./guidelines/020_guidelines/040_hypermedia/4010_must-use-resolvable-profile-urls.md)
- [MUST provide OpenAPI spec for profiles](./guidelines/020_guidelines/040_hypermedia/4030_must-provide-openapi-spec-for-profiles.md)
- [RFC 7231, p. 59: 406 for unsupported versions](https://datatracker.ietf.org/doc/html/rfc7231#section-6.5.6)
:::
