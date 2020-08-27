---
type: MUST
id: R100066
---

# use resolvable profile URLs

The URI that identifies a profile must be resolvable and must match `https://api.otto.de/profiles/{name}+v{version}`.
The URL must point to a human-readable documentation of the profile.

If the API uses [`application/hal+json`](./guidelines/020_guidelines/040_hypermedia/1010_must-implement-rest-maturity-level-2-for-private-apis.md), the `_links` of the representation [must contain a `profile` link](./guidelines/020_guidelines/040_hypermedia/2040_must-provide-conventional-hyperlinks.md) with an `href` containing the URL of the representation's profile:

```json
{
  "_links": {
    "self": { "href": "https://api.otto.de/orders/4711" },
    "profile": { "href": "https://api.otto.de/profiles/order+v1" }
  },
  "total": 3000,
  "currency": "EUR",
  "status": "shipped"
}
```

::: references

- [MUST implement REST maturity level 2 for private APIs](./guidelines/020_guidelines/040_hypermedia/1010_must-implement-rest-maturity-level-2-for-private-apis.md)
- [MUST implement REST maturity level 3 for public APIs](./guidelines/020_guidelines/040_hypermedia/1020_must-implement-rest-maturity-level-3-for-public-apis.md)
- [MUST provide conventional hyperlinks](./guidelines/020_guidelines/040_hypermedia/2040_must-provide-conventional-hyperlinks.md)
:::
