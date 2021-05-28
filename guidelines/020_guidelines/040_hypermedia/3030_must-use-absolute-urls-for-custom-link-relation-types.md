---
type: MUST
id: R100037
---

# use absolute URLs for custom link relation types

::: warning
This rule applies to public APIs. For private APIs it should be followed.
:::

If no [IANA-registered](http://www.iana.org/assignments/link-relations/link-relations.xhtml) link relation type is applicable and no [existing custom link relation type](./guidelines/020_guidelines/040_hypermedia/3010_must-prefer-existing-custom-link-relation-types.md) can be used instead, a custom link relation type can be introduced.

Custom link relations must comply with the following rules:

- Custom link relation types must have a fully qualified URL.
- The URL must be resolvable using the URI template `https://api.otto.de/portal/link-relations/{context-id}/{rel}`.
- Just as with [profile URLs](./guidelines/020_guidelines/040_hypermedia/4010_must-use-resolvable-profile-urls.md), link relation URLs must contain exactly one `context-id`. Context information prevent name collisions and allow grouping of link relations by domain.
- In the URL, `context-id` and `rel` must be kebab-case.
- Custom link relation types must be documented.
- The documentation must be accessible in a human-readable format using the URL of the link relation type.

Using a link relation type such as `"variation": {"href":"https://api.otto.de/variations/4711"}` is therefore not allowed.

::: references

- [MUST implement REST maturity level 2 for private APIs](./guidelines/020_guidelines/040_hypermedia/1010_must-implement-rest-maturity-level-2-for-private-apis.md)
- [MUST implement REST maturity level 3 for public APIs](./guidelines/020_guidelines/040_hypermedia/1020_must-implement-rest-maturity-level-3-for-public-apis.md)
- [MUST use curied link relation types](./guidelines/020_guidelines/040_hypermedia/3040_must-use-curied-link-relation-types.md)
  :::
