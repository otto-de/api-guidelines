---
id: R200002
---

# MUST prepare consumers to consume events idempotently

Usually exactly-once delivery semantic is desired when it comes to messaging. In a distributed messaging system, exactly-once delivery is hard to achieve because of crashes that can occur on either producer or consumer side.

A producer may crash after successfully sending a message, but before a record was created, that the message has been sent. On restart, the producer will send the message a second time not knowing that the message has already been sent before.

A consumer may crash after successfully processing a received message, but before a record was created, that the message has been processed. On restart, the consumer receives and processes the already processed message a second time not knowing that the message has already been processed before.

Instead of an exactly-once delivery only an at-least-once delivery can be guaranteed, and API providers must prepare consumers for duplicate events.

API consumers can choose from multiple strategies to handle duplicate events:

### Idempotent Operation

When implementing the indempotent operation strategy, the consumer needs to guarantee that no matter how often the same event is processed, the result is always the same as if the event was processed once. Depending on the consumers' domain, designing the operation to be idempotent can be difficult or even impossible.

### Event deduplication

When using the event deduplication strategy, a consumer can become idempotent by discarding those events, which already have been processed once before.
This can be accomplished by storing the information that an event has been processed in addition to the operation's result from processing the event in the same persisted storage and the same transaction. For example, if a consumer updates a database row in response to an event, the information that the event was processed should also be stored in the database within the same transaction. By comparing new incoming events with the information stored in the database, consumers can detect and discard already processed duplicate events.

If the event itself contains information about the sequence in which it should be processed, deduplicating requires less effort. Instead of persisting every processed event id, a consumer only needs to store the last processed event sequence number for each event source. New events can be discarded, if the sequence number is not in line with the last processed sequence number.

In case the sequence is always monotonically increasing and contiguous, consumers can even process the events in the correct order but need to be aware that events do not always arrive in the correct order. The processing of a new event should be deferred if the sequence number follows the last processed event but is not the next expected sequence number.

::: warning Usage of `time` context attribute for deduplication
The event `time` context attribute might seem like a perfect fit for deduplicating events. One could persist the `time` of the last processed event and drop all events with a `time` &lt;= to the last processed event. For this to work out, the producer needs to garantuee the following:

- all producing instances of the same event source have clocks that are synced with a minimal clock drift.
- all events for the same source must be published in event `time` order to the messaging system. If this is not the case, events may be dropped by the consumers.
- the producer needs to make sure that no two events have the same event `time`.

As these requirements impose quite a restriction on the producer, a separate [`sequence` context attribute may be provided](../../../format/cloudevents/rules/may-provide-sequence-context-attribute.md).
:::

::: references

- [MAY provide `sequence` context attribute](../../../format/cloudevents/rules/may-provide-sequence-context-attribute.md)
- [You cannot have exactly-once delivery](https://bravenewgeek.com/you-cannot-have-exactly-once-delivery/)
- [Exactly-Once Semantics Are Possible: Here’s How Kafka Does It](https://www.confluent.io/de-de/blog/exactly-once-semantics-are-possible-heres-how-apache-kafka-does-it/)
- [Processing guarantees in kafka](https://medium.com/@andy.bryant/processing-guarantees-in-kafka-12dd2e30be0e)
  :::
