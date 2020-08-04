---
type: MUST
id: R000067
---

# reflect deprecation in OpenAPI specifications

The API deprecation must be part of the OpenAPI specification.

If an API endpoint (operation object), an input argument (parameter object), an in/out data object (schema object), or on a more fine grained level, a schema attribute or property should be deprecated, the producers must set `deprecated: true` for the affected element and add further explanation to the `description` section of the API specification. If a future shutdown is planned, the producer must provide a sunset date and document in details what consumers should use instead and how to migrate.
