---
id: R200005
---

# MUST provide API specification using AsyncAPI for asynchronous APIs

We use the [AsyncAPI](https://www.asyncapi.com/) specification as a standard to define contracts for asynchronous APIs.
Any event published for integration with other services must be described using the AsyncAPI specification.

The API description format used must be [AsyncAPI 2.3.0](https://www.asyncapi.com/docs/specifications/v2.3.0) or newer.
We will extend it according to our needs by using [specification extensions](https://www.asyncapi.com/docs/specifications/v2.3.0#specificationExtensions) in order to describe the functionality that we require.
