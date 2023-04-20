---
id: R200013
---

# MUST provide `datacontenttype` context attribute if media type is defined

The `datacontenttype` describes how the CloudEvents [event data](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#event-data) is encoded.
Event producers must provide the [`datacontenttype`](https://github.com/cloudevents/spec/blob/main/cloudevents/spec.md#datacontenttype) context attribute to allow generic event consumers to determine the content type of the event data.

In some situations, this is not possible because no media type exists for the used format.
One prominent example is the [wire format](https://docs.confluent.io/platform/current/schema-registry/serdes-develop/index.html#wire-format) produced by Confluent's Kafka serializers in combination with the binary content mode.
For CloudEvents written with Confluent's Kafka serializers, `datacontenttype` should contain the correct media type for Confluent's wire format because the serializers encode the CloudEvents data in this format.
Confluent, however, never defined a media type for the wire format. Thus, it is impossible to fill the `datacontenttype` attribute in a meaningful way.
