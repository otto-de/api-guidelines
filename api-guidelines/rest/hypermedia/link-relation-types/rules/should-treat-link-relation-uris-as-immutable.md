---
id: R100042
---

# SHOULD treat link relation URIs as immutable

The URI used as the link relation type should be treated as an identifier that does not change over time.

This ensures that clients can rely on the URI as a stable identifier for the link relation type, preventing breaking changes in API contracts.

::: references

- [MUST use absolute URIs for custom link relation types](./must-use-absolute-uris-for-custom-link-relation-types.md)
  :::