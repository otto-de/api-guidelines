---
id: R000016
---

# MUST use nouns to represent resources

The API describes resources, so the only place where actions should appear is in the HTTP methods.
Keep URLs free of verbs and use only nouns.

DO

`/orders/{orderId}/processes/cancelations/{cancelationProcessId}`
