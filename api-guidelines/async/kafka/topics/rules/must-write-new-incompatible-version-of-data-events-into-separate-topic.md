---
id: R200016
---

# MUST write new incompatible version of data events into a separate topic

If a [new `type`](../../../compatibility/versioning/rules/must-change-type-context-attribute-to-indicate-incompatible-changes.md) for a data event is defined, its instances must be written to a separate topic than the currently defined data event types. Thus, not breaking existing event consumers.

If the API provider deprecates the old topic, the API provider needs to [obtain approval of consumers before API shutdown](../../../../global/compatibility/deprecation/rules/must-obtain-approval-of-consumers-before-api-shutdown.md).

`Example`{ label} If the data event type de.otto.data.checkout.payment.v1 is currently written to the topic de.otto.data.checkout.payments.v1 and a new type de.otto.data.checkout.payment.v2 is defined, it should be written to de.otto.data.checkout.payments.v2.

::: info Compacted topics
This rule enables the usage of compacted topics for data events. If multiple versions of the same event would be written to a compacted topic, the record key must include the event type version to not lose any events due to topic compaction. While this is a potential technical solution, it complicates the usage of compacted topics and imposes a technical restriction on the record key.
:::
