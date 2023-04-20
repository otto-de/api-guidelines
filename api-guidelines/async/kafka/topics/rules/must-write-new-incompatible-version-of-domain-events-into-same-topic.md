---
id: R200017
---

# MUST write new incompatible version of domain events into the same topic

Event producers write different domain event types for the same entity type to the same topic to [provide order guarantees](/guidelines/r200007) for event consumers.
Therefore, topics for domain events usually contain multiple domain event types which are versioned independently.

Contrary to [incompatible versions of data events](/guidelines/r200016), incompatible versions of domain events also need to be written to the same topic as previous versions.
Having multiple independently versioned domain event types in the same topic allows event consumers to migrate to new domain event type versions one by one while still leveraging order guarantees.

If the event producer wrote incompatible new versions of domain events to a separate topic, the API provider would need to create a new topic for every new version of every contained domain event type. As every contained domain event type is versioned independently of other contained domain event types, this can very easily lead to many topics that need to be maintained.

Event consumers [must filter events by type](/guidelines/r200015). Thus, writing a new `type` to an already existing topic will not break correctly implemented event consumers.

::: references

- [MUST filter consumed events by `type`](/guidelines/r200015)
- [MUST follow kafka topic naming convention](/guidelines/r200006)
  :::
