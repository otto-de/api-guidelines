---
id: R200001
---

# MUST use CloudEvents format to encode events

Events must be encoded as [CloudEvents 1.0.2](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md).

The CloudEvents specification defines a number of required and optional [context attributes](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#context-attributes). Context attributes can be treated as metadata about the event, that can be extracted without knowing the structure of the event itself.

The following table shows the most important context attributes of the CloudEvents specification and includes event guidelines rules, which are specific to some context attributes.

| Context attribute                                                                                      | Event Guidelines rules                                                                         |
| ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| [id](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#id)                           |                                                                                                |
| [source](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#source-1)                 | [MUST provide meaningful source context attribute](./must-provide-meaningful-source-contex-attribute.md)                        |
| [specversion](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#specversion)         | only '1.0' allowed                                                                             |
| [type](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#type)                       | [MUST follow naming scheme for type context attribute](./must-follow-naming-schema-for-type-context-attribute.md)                    |
| [datacontenttype](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#datacontenttype) | [MUST provide datacontenttype context attribute if media type is defined](./must-provide-datacontenttype-context-attribute-if-media-type-is-defined.md) |
| [dataschema](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#dataschema)           |                                                                                                |
| [time](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#time)                       | [MUST provide event time in UTC](./must-provide-event-time-in-utc.md)                                          |
| [subject](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#subject)                 |                                                                                                |

The following table shows context attributes that are part of [CloudEvent extensions](https://github.com/cloudevents/spec/blob/main/cloudevents/spec.md#extension-context-attributes) and used within OTTO.

| Context attribute           | Event Guidelines rules                                                                                                                                                                  |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [test](../../test-extension/rules/may-use-test-extension.md) | [MAY use test extension](../../test-extension/rules/may-use-test-extension.md), [MUST forward test context attribute](../../test-extension/rules/must-forward-test-context-attribute.md), [MAY ignore events flagged with test context attribute](../../test-extension/rules/may-ignore-events-flagged-with-test.md) |
