# Format

This section deals with the format of events.
[CloudEvents](https://cloudevents.io/) is defined as the standard format for encoding events.
CloudEvents is a [Cloud Native Computing Foundation (CNCF)](https://www.cncf.io/) project and can be seen as a de facto standard on common event metadata. CloudEvents makes it easier for middleware to extract needed context information from events without knowing the structure of the event data itself.

The CloudEvents standard defines two things:

1. Common event context metadata and semantics
2. How to encode events including metadata on the various protocols

The CloudEvents specification is designed to be [extensible](https://github.com/cloudevents/spec/blob/main/cloudevents/documented-extensions.md). Extensions need to be agreed on between consumer and producer. Some already defined extensions in the CloudEvents repository are used within the event guidelines to handle common concerns such as tracing.

The actual event payload (referred to as [event data](https://github.com/cloudevents/spec/blob/main/cloudevents/spec.md#event-data)) can be encoded in any format (e.g. JSON, Avro, Protobuf).
When using the JSON format, follow the rules defined in the section ["JSON"](../../global/json/README.md).

::: references

- [CloudEvents specification 1.0.2](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md)
  :::

[<!--INCLUDE-->CloudEvents](./cloudevents/README.md)

[<!--INCLUDE-->Naming conventions](./naming-conventions/README.md)

[<!--INCLUDE-->Test extension](./test-extension/README.md)
