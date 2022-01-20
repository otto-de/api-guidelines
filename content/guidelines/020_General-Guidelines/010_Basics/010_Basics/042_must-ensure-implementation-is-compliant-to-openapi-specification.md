---
type: MUST
id: R000076
---

# ensure implementation is compliant to OpenAPI specification

The contract defined as OpenAPI specification must be agreed upon by API providers and consumers and is therefore binding. Providers must ensure that the implementation complies with the agreed specification. Ideally, compliance tests are part of the build pipeline.
Use:

- unit tests for requests/response validation
- CDC tests for a more integrative, consumer-oriented approach
