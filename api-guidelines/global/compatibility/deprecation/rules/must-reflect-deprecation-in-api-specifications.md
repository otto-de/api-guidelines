---
id: R000067
---

# MUST reflect deprecation in specifications

The deprecation of API elements must be part of the specification (e.g. OpenAPI or AsyncAPI). Each specification format allows for different elements to be deprecated.

The API provider must set `deprecated: true` for the affected element and add further explanation to the `description` section of the API specification.

If an API version or feature is deprecated, the API provider must:

- specify a sunset date in the description
- document in detail what consumers should use instead
- document how to migrate.

::: references

- [OpenAPI deprecated attribute for Schema Object](https://swagger.io/specification/#schema-object)
- [AsyncAPI deprecated attribute for Schema Object](https://www.asyncapi.com/docs/specifications/v2.3.0#schemaObject)
