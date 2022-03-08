# CloudEvents

The [CloudEvents](https://cloudevents.io/) standard defines two things:

1. Common event context metadata and semantics
2. How to encode events including metadata on the various transports

CloudEvents is a [Cloud Native Computing Foundation (CNCF)](https://www.cncf.io/) project and can be seen as a de facto standard on common event metadata.

CloudEvents makes it easier for middleware to extract needed context information from events without knowing the structure of the event data itself.

The CloudEvents specification is designed to be [extensible](https://github.com/cloudevents/spec/blob/main/cloudevents/documented-extensions.md). Extensions need to be agreed on between consumer and producer. Some already defined extensions in the CloudEvents repository are used within the guideline to handle common concerns such as tracing.

::: references

- [CloudEvents specification 1.0.2](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md)
  :::
