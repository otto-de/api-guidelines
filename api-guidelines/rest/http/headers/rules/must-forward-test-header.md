---
id: R0000XX
---

# MUST forward `Test` header

An API provider or consumer that makes API requests as a direct consequence of an API request or response flagged with a test header, must add the [`test` header](./may-use-header.md) of the triggering interaction to all following requests.

This behavior enables downstream API providers to choose if they want to participate in the test.
