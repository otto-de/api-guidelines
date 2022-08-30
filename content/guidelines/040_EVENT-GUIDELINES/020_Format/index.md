# Format

This section deals with [CloudEvents](https://cloudevents.io/) which is the standard format to use when encoding events.
CloudEvents is a [Cloud Native Computing Foundation (CNCF)](https://www.cncf.io/) project and can be seen as a de facto standard on common event metadata. CloudEvents makes it easier for middleware to extract needed context information from events without knowing the structure of the event data itself.

The CloudEvents standard defines two things:

1. Common event context metadata and semantics
2. How to encode events including metadata on the various protocols

The CloudEvents specification is designed to be [extensible](https://github.com/cloudevents/spec/blob/main/cloudevents/documented-extensions.md). Extensions need to be agreed on between consumer and producer. Some already defined extensions in the CloudEvents repository are used within the event guidelines to handle common concerns such as tracing.

::: references

- [CloudEvents specification 1.0.2](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md)
  :::
