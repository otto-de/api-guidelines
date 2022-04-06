---
type: MUST
id: R200002
---

# consume events idempotently

Usually exactly-once delivery semantic is desired when it comes to messaging. Exactly-once delivery means, that every message is delivered exactly once. In a distributed messaging system exactly-once delivery is very hard to archive.

A producer may crash after a message has been successfully received by the messaging system, but before he received an acknowledgement. On restart, the producer will send the message a second time not knowing that the message has already been published.

A consumer may crash after successfully processing a message, but before he has sent an acknowledgement. On restart, the consumer receives the already processed message a second time, because the messaging system does not know that it already has been processed.

Consumers must be prepared for duplicate events, due to this at-least-once delivery guarantee.

Multiple strategies exist to implement a consumer that handles duplicate events:

### Idempotent Operation

The operation of the consumer is in itself idempotent. No matter how often the same event is processed, the result is the same as if it is processed once. Depending on the consumers' domain, designing the operation to be idempotent can be difficult or even impossible.

### Event deduplication

The consumer needs to deduplicate the events, thus becoming an idempotent consumer. This is usually been implemented by storing which events already have been handled. New events will be ignored if they have been processed before. The information which events have already been processed should be persisted in the same persistent storage in which results of the operation are persisted. If for example a consumer updates a database row as a reaction to an event, the information that the event has been processed should also be stored in the db within the same transaction. This guarantees that events are only processed once or not at all without introducing additional complexity such as distributed transactions. If the event itself contains information about the sequence in which it should be processed, deduplicating will be easier. Instead of persisting every processed event id, the consumer only needs to store the last processed event sequence number for each event source. New events will be ignored, if the sequence number is not after the last processed sequence number. If the sequence is monotonically increasing and contiguous, the consumer can even process the events in the correct order. The processing of a new event will be deferred if the sequence number is after the last processed event but not the next expected sequence number.

::: warning Usage of `time` context attribute for deduplication
The event `time` context attribute might seem like a perfect fit for deduplicating events. One could persist the `time` of the last processed event and drop all events with a `time` &lt;= to the last processed event. For this to work out, the producer needs to garantuee the following:

- all producing instances of the same event source have clocks that are synced with a minimal clock drift.
- all events for the same source must be published in event `time` order to the messaging system. If this is not the case, events may be dropped by the consumers.
- the producer needs to make sure that no two events have the same event `time`.

As these requirements impose quite a restriction on the producer, a separate [`sequence` context attribute may be provided](@guidelines/R200003).
:::

::: references

- [MAY provide `sequence` context attribute](@guidelines/R200003)
- [You cannot have exactly-once delivery](https://bravenewgeek.com/you-cannot-have-exactly-once-delivery/)
- [Exactly-Once Semantics Are Possible: Here’s How Kafka Does It](https://www.confluent.io/de-de/blog/exactly-once-semantics-are-possible-heres-how-apache-kafka-does-it/)
- [Processing guarantees in kafka](https://medium.com/@andy.bryant/processing-guarantees-in-kafka-12dd2e30be0e)
  :::
