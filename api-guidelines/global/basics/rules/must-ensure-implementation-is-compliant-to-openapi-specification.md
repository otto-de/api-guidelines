---
id: R000076
---

# MUST ensure implementation complies with the contract

The contract defined in the specification (i.e. OpenAPI or AsyncAPI) is binding.
API providers must ensure that the implementation complies with the agreed specification.
Ideally, compliance tests are part of the build pipeline.

Use

- unit tests to validate the API against the specification
- Consumer Driven Contract (CDC) tests for a more inclusive and consumer-oriented approach.
