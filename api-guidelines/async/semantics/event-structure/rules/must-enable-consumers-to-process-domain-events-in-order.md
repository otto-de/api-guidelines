---
id: R200007
---

# MUST enable consumers to process domain events in order

The sequence of events produced by a unique event source is often important for consumers.
Consumers must be able to process domain events in the order in which they happened.

API provider can enable consumers to process domain events in order either by protocol-specific guarantees or by providing the [sequence context attribute](../../../format/cloudevents/rules/may-provide-sequence-context-attribute.md).

### Kafka

Kafka supports [idempotent producers](https://kafka.apache.org/documentation/#producerconfigs_enable.idempotence) to guarantee in-order delivery.
This is enabled by default from Kafka 3.0.1 on if no other configuration option prevents it from being idempotent.

::: info Info
If very high throughput and low latency is needed, an idempotent producer may not be the right option.
An idempotent producer needs to receive acknowledgement for each written record by a certain number of kafka nods (configured by [`min.insync.replicas`](https://kafka.apache.org/documentation/#producerconfigs_enable.idempotence)).
This introduces additional latency.
:::
::: references

- [KIP-679: Producer will enable the strongest delivery guarantee by default](https://cwiki.apache.org/confluence/display/KAFKA/KIP-679%3A+Producer+will+enable+the+strongest+delivery+guarantee+by+default)
- [Does Kafka really guarantee the order of messages?](https://blog.softwaremill.com/does-kafka-really-guarantee-the-order-of-messages-3ca849fd19d2)

:::
