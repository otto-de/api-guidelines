---
id: R200015
---

# MUST filter consumed events by `type`

Event consumers must filter consumed events by the `type` context attribute to ensure that they don't break when an event producer writes a [new event type version with incompatible changes](./must-change-type-context-attribute-to-indicate-incompatible-changes.md) on a subscribed channel (i.e., topic/queue).

If the event producer guarantees that the subscribed channel only contains the required event type and will _never_ contain another event type, event consumers do not need to filter.

::: references

- [MUST follow naming scheme for `type` context attribute](../../../format/cloudevents/rules/must-follow-naming-schema-for-type-context-attribute.md)
  :::
