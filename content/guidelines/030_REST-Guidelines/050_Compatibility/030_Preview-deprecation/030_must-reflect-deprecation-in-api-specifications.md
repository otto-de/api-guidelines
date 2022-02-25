---
type: MUST
id: R000067
---

# reflect deprecation in OpenAPI specifications

The API deprecation must be part of the OpenAPI specification.

The API provider must set `deprecated: true` for the affected element and add further explanation to the `description` section of the API specification if one of the following is about to be deprecated:

* an API endpoint (operation object)
* an input argument (parameter object)
* an in/out data object (schema object)
* or, on a more fine grained level, a schema attribute or property.

If a future shutdown is planned, the API provider must specify a sunset date and document in detail what consumers should use instead and how to migrate.
