---
id: R000082
---

# SHOULD send durable event IDs 

An event is a message that contains information about something factual that occurred in the past. 
Each event must have an ID that identifies the event. 
The event ID should be the same for retries or when sending via multiple channels. Consumers should assume that events with an identical source and ID are duplicates.

::: references

- [id message attribute in cloud event spec](https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md#id)
  :::