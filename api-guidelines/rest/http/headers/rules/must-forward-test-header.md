---
id: R000081
---

# MUST forward `Test` header

An API provider or consumer that makes API requests as a direct consequence of an API request or response flagged with a test header must add the [`Test` header](./may-use-header.md) of the triggering interaction to all following requests.

This behavior enables downstream API providers and consumers to choose whether or not they would like to participate in the test.
