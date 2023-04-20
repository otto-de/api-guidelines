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
| [source](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#source-1)                 | [MUST provide meaningful source context attribute](/guidelines/r200010)                        |
| [specversion](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#specversion)         | only '1.0' allowed                                                                             |
| [type](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#type)                       | [MUST follow naming scheme for type context attribute](/guidelines/r200009)                    |
| [datacontenttype](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#datacontenttype) | [MUST provide datacontenttype context attribute if media type is defined](/guidelines/r200013) |
| [dataschema](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#dataschema)           |                                                                                                |
| [time](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#time)                       | [MUST provide event time in UTC](/guidelines/r200011)                                          |
| [subject](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#subject)                 |                                                                                                |

The following table shows context attributes that are part of [CloudEvent extensions](https://github.com/cloudevents/spec/blob/main/cloudevents/spec.md#extension-context-attributes) and used within OTTO.

| Context attribute           | Event Guidelines rules                                                                                                                                                                  |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [test](/guidelines/r200021) | [MAY use test extension](/guidelines/r200021), [MUST forward test context attribute](/guidelines/r200022), [MAY ignore events flagged with test context attribute](/guidelines/r200023) |
