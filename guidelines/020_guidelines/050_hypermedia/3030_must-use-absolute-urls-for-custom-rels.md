---
type: MUST
id: R100037
---

# use absolute URLs for custom link-relation types

::: warning Public APIs only
This rule only applies to public APIs. For private APIs, this rule SHOULD be followed.

See also:

- [MUST implement REST maturity level 2 for private APIs](../050_hypermedia/1010_must-implement-rest-maturity-level-2-for-private-apis.md)
- [MUST implement REST maturity level 3 for public APIs](../050_hypermedia/1020_must-implement-rest-maturity-level-3-for-public-apis.md)
  :::

If no [IANA-registered](http://www.iana.org/assignments/link-relations/link-relations.xhtml) link-relation type
is applicable and no [custom link-relation type](./3010_must-prefer-existing-custom-rels.md) can be used instead,
a custom link-relation type can be used.

- Custom link-relation types MUST have a fully-qualified URL.
- The URL must be resolvable using the URI template `https://api.otto.de/link-relations/{rel}`.
- Custom link-relation types MUST be documented.
- The documentation MUST be accessible in human-readable format using the URL of the link-relation type.

Using link-relation type like `"variation": {"href":"https://api.otto.de/variations/4711"}` is therefore forbidden.

See also:

- [MUST use curied link-relation types](./3040_must-use-curied-rels.md)
