---
type: MUST
id: R100035
---

# prefer existing custom link-relation types

::: warning Public APIs only
This rule only applies to public APIs. For private APIs, this rule SHOULD be followed.

See also:

- [MUST implement REST maturity level 2 for private APIs](../050_hypermedia/1010_must-implement-rest-maturity-level-2-for-private-apis.md)
- [MUST implement REST maturity level 3 for public APIs](../050_hypermedia/1020_must-implement-rest-maturity-level-3-for-public-apis.md)
  :::

Already specified [custom link-relation types](guidelines/020_guidelines/050_hypermedia/3030_must-use-absolute-urls-for-custom-rels.md),
MUST be used instead of introducing new ones, if the specified semantics are applicable.
