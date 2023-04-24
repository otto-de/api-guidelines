---
id: R200023
---

# MAY ignore events flagged with `test` context attribute

While the decision to not take part in tests by other teams has to be made by each team individually, it is considered good practice to take part in all tests.

Tests events should only be ignored if they hinder the event consumer. Event consumers that decide to not participate in specific tests can ignore test events by interpreting the value of the [`test` context attribute](./may-use-test-extension.md). They should do so in a way that only filters out the specific tests that they want to ignore.
