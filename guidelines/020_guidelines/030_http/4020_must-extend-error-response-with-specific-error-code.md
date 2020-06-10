---
type: MUST
id: R000035
---

# extend error response with specific error code

> [REVIEW] Issue #27

Error responses must include the `"code"` field, representing an error code which uniquely identifies the error type in the global context of the API. Responses should [reuse existing error codes](./guidelines/030_http/4040_should-use-existing-error-types.md) if possible to keep error churn as low as possible. The error code is not to be confused with the [HTTP status code](./guidelines/030_http/3000_http-status.codes.md), it rather enables more fine grained error handling.

The error code may be used to localize content, especially in use cases including user interfaces: The error could can be used to look up a localized error message, which is subsequently displayed to the user.

See [**[SHOULD]** use existing error types](./guidelines/030_http/4040_should-use-existing-error-types.md) for details on establishing new error codes.
