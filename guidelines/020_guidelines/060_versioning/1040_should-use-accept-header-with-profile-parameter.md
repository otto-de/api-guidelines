---
type: SHOULD
id: R000030
---

# use `Accept` header with profile parameter

When changing your RESTful APIs, do so in a compatible way and avoid generating additional API versions.
Multiple versions can significantly complicate understanding, testing, maintaining, evolving, operating and releasing our systems ([supplementary reading](http://martinfowler.com/articles/enterpriseREST.html)).

If changing an API can’t be done in a compatible way, versioning should be implemented using the
[Accept header using standard media type with profile parameter](../topics/versioning.md#accept-header-using-standard-media-type-with-profile-parameter).

See also:
* [MUST use resolvable profile URLs](../050_hypermedia/4010_must-use-resolvable-profile-urls.md)
* [MUST provide OpenAPI spec for profiles](../050_hypermedia/4020_must-provide-openapi-spec-for-profiles.md)