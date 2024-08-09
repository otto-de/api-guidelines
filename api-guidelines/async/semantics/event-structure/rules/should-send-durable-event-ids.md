---
id: R000058
---

# SHOULD send durable event IDs 

An event is a message containing information about something factual that has happened in the past. An event MUST have an ID that identifies the event. In case of retries or sending over multiple channels the event ID SHOULD be the same. Consumers SHOULD assume that Events with identical source and id are duplicates.

See also [cloud event spec](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#id)