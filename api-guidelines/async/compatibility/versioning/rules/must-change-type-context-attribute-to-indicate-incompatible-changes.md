---
id: R200014
---

# MUST change `type` context attribute to indicate incompatible changes

The `type` context attribute is the primary means by which event consumers can identify the type of event they receive.
API providers must guarantee that the schema of an event `type` only changes in compatible ways, not breaking existing event consumers.

If an incompatible change is needed, a new `type` with an increased version segment must be introduced. With the introduction of the new event type, the old event type becomes deprecated. It may only be sunsetted once all consumers have migrated to the new event type. Until then, both event types need to be written by the event producer.

::: info Confluent Schema Registry version
Do not confuse the event type version with the schema version managed by the Confluent Schema Registry. The Confluent Schema Registry issues a new schema version whenever the schema of a subject changes. In contrast to the event type version, the schema version is also increased for compatible changes.

Assuming incompatible schemas are not allowed due to enabling compatibility checking in the Confluent Schema Registry, the event type version can be considered as the major version, and the schema version as the minor version.
:::

::: references

- [MUST follow naming scheme for `type` context attribute](../../../format/cloudevents/rules/must-follow-naming-schema-for-type-context-attribute.md).
- [MUST obtain approval of consumers before API shutdown](../../../../global/compatibility/deprecation/rules/must-obtain-approval-of-consumers-before-api-shutdown.md)
- [The role of the `type` attribute within versioning](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/primer.md#the-role-of-the-type-attribute-within-versioning)
  :::
