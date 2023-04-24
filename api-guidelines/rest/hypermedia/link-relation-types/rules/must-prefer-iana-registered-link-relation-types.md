---
id: R100036
---

# MUST prefer IANA-registered link relation types

::: info Info
This rule applies to APIs that have to comply with [REST maturity level 3](../../maturity-level/rules/must-implement-rest-maturity-level-3-for-transitional-apis.md).
:::

Instead of defining [custom link relation types](./must-use-absolute-uris-for-custom-link-relation-types.md),
[IANA-registered](http://www.iana.org/assignments/link-relations/link-relations.xhtml) link relation types must be used, if the specified semantics are applicable.

Only if a more specific custom link relation type already exists, the custom option should be preferred.
For example, the collection of all products should use `o:product` instead of `item`.
A link relation type `o:author` must not be defined, because the IANA registry already defines `author`.

::: references

- [MUST implement REST maturity level 2](../../maturity-level/rules/must-implement-rest-maturity-level-2.md)
- [MUST implement REST maturity level 3 for transitional APIs](../../maturity-level/rules/must-implement-rest-maturity-level-3-for-transitional-apis.md)
  :::
