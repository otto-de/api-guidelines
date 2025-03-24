---
id: R200005
---

# MUST provide API specification using AsyncAPI for asynchronous APIs

We use the [AsyncAPI](https://www.asyncapi.com/) specification as a standard to define contracts for asynchronous APIs.
Any event published for integration with other services must be described using the AsyncAPI specification.

The API description format used must be [AsyncAPI 3.0.0](https://www.asyncapi.com/docs/reference/specification/v3.0.0) or newer.
We extend the specification to our needs by using [specification extensions](https://www.asyncapi.com/docs/reference/specification/v3.0.0#specificationExtensions) in order to describe the functionality that we require.

We publish the specification in [our internal developer portal](https://backstage.live.si.cloud.otto.de/startpage).
