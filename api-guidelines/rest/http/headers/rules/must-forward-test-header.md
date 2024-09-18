---
id: R000081
---

# MUST forward `Test` header

An API provider or consumer must include the [`Test` header](./may-use-header.md) from the initial interaction in all subsequent requests and asynchronous events if the original API request or response is marked with a Test header.

This behavior enables downstream API providers and consumers to choose whether they would like to participate in the test.
