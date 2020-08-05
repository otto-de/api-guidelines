---
type: MUST
id: R100036
---

# prefer IANA-registered link-relation types

::: warning Public APIs only
This rule only applies to public APIs. For private APIs, this rule SHOULD be followed.

See also:

- [MUST implement REST maturity level 2 for private APIs](../050_hypermedia/1010_must-implement-rest-maturity-level-2-for-private-apis.md)
- [MUST implement REST maturity level 3 for public APIs](../050_hypermedia/1020_must-implement-rest-maturity-level-3-for-public-apis.md)
  :::

Instead of defining [custom link-relation types](guidelines/020_guidelines/050_hypermedia/3030_must-use-absolute-urls-for-custom-rels.md),
[IANA-registered](http://www.iana.org/assignments/link-relations/link-relations.xhtml) MUST be used, if the specified
semantics are applicable.

Only if a more specific custom link-relation type already exists, the custom rel SHOULD be preferred. For example,
the collection of all products should use `o:product` instead of `item`, but a link-relation type `o:author` MUST NOT
be defined, as the IANA registry already contains an `author` rel.
