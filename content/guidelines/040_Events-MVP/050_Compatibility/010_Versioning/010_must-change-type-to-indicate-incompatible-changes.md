---
type: MUST
id: R200014
---

# change `type` context attribute to indicate incompatible changes

The `type` context attribute is the primary means by which event consumers can identify the type of event they receive.
API providers must guarantee that the schema of an event `type` only changes in compatible ways, not breaking existing event consumers.

If an incompatible change is needed, a new `type` with an increased version segment must be introduced. With the introduction of the new event type, the old event type becomes deprecated. It may only be sunsetted once all consumers have migrated to the new event type. Until then, both event types need to be written by the event producer.

::: info Confluent Schema Registry version
Do not confuse the event type version with the schema version managed by the Confluent Schema Registry. The confluent schema registry issues a new schema version whenever the schema of a subject changes. In contrast to the event type version, the schema version is also increased for compatible changes.

Suppose compatibility checking is activated in the Confluent Schema Registry, thus not allowing incompatible schemas. In that case, the event type version can be seen as the major version and the schema version as the minor version of the event type.
:::

::: references

- [](@guidelines/R200009).
- [](@guidelines/R000054)
- [The role of the `type` attribute within versioning](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/primer.md#the-role-of-the-type-attribute-within-versioning)
  :::
