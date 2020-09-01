---
type: SHOULD
id: R000030
---

# use `Accept` header with profile parameter

Change your RESTful APIs in a compatible way and avoid generating additional API versions.
Multiple versions can significantly complicate understanding, testing, maintaining, evolving, operating and releasing our systems ([supplementary reading](http://martinfowler.com/articles/enterpriseREST.html)).

If changing an API cannot be done in a compatible way, versioning should be implemented using the [Accept header with profile parameter](./guidelines/020_guidelines/080_versioning/1040_should-use-accept-header-with-profile-parameter.md).

::: references

- [MUST use resolvable profile URLs](./guidelines/020_guidelines/040_hypermedia/4010_must-use-resolvable-profile-urls.md)
- [MUST provide OpenAPI spec for profiles](./guidelines/020_guidelines/040_hypermedia/4030_must-provide-openapi-spec-for-profiles.md)
  :::
