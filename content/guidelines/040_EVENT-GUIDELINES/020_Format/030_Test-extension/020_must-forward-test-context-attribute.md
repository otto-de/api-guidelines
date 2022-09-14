---
type: MUST
id: R200022
---

# forward `test` context attribute

An event producer that publishes domain events as a direct consequence of consumed test events must add the [`test` context attribute](@guidelines/r200021) of the triggering event to all published domain events.

This behavior enables downstream event consumers to choose if they want to participate in the test.
