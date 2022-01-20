---
type: MUST
id: R100036
---

# prefer IANA-registered link relation types

::: warning
This rule applies to public APIs. For private APIs it should be followed.
:::

Instead of defining [custom link relation types](R100037),
[IANA-registered](http://www.iana.org/assignments/link-relations/link-relations.xhtml) link relation types must be used, if the specified semantics are applicable.

Only if a more specific custom link relation type already exists, the custom option should be preferred.
For example, the collection of all products should use `o:product` instead of `item`.
A link relation type `o:author` must not be defined, because the IANA registry already defines `author`.

::: references

- [MUST implement REST maturity level 2 for private APIs](R000032)
- [MUST implement REST maturity level 3 for public APIs](R000033)
  :::
