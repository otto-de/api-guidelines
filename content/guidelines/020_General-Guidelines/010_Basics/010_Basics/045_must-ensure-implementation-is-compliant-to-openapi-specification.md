---
type: MUST
id: R000076
---

# ensure implementation complies with the contract

The contract defined in the specification (i.e. OpenAPI or AsyncAPI) is binding. Providers must ensure that the implementation complies with the agreed specification. Ideally, compliance tests are part of the build pipeline.

Use:

- Unit tests to validate the API against the specification.
- Consumer driven contract (CDC) tests for a more integrative and consumer-oriented approach.
