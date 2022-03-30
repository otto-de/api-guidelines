---
type: MUST
id: R200007
---

# enable consumers to process domain events in order

The sequence of events produced by a unique event source is often important for consumers.
Consumers must be able to process domain events in order. This must either be done by guaranteeing the order by transport specific guarantees or by providing the [sequence context attribute](@guidelines/R200003).

### Kafka
Kafka supports [idempotent producers](https://kafka.apache.org/documentation/#producerconfigs_enable.idempotence) to guarantee in-order delivery.
This is enabled by default from Kafka 3.0.1 on if no other configuration option prevents it from being idempotent.

::: info
If very high throughput and low latency is needed, an idempotent producer may not be the right option.
An idempotent producer needs to receive acknowledgement for each written record by a certain number of kafka nods (configured by [`min.insync.replicas`](https://kafka.apache.org/documentation/#producerconfigs_enable.idempotence)).
This introduces additional latency.
:::
::: references

- [KIP-679: Producer will enable the strongest delivery guarantee by default](https://cwiki.apache.org/confluence/display/KAFKA/KIP-679%3A+Producer+will+enable+the+strongest+delivery+guarantee+by+default)
- [Does Kafka really guarantee the order of messages?](https://blog.softwaremill.com/does-kafka-really-guarantee-the-order-of-messages-3ca849fd19d2)
  :::
