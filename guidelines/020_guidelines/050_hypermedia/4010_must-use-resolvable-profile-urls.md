---
type: MUST
id: R100066
---

# use resolvable profile URLs

The URI that is identifying a profile MUST be resolvable. The URI must match
`https://api.otto.de/profiles/{name}+v{version}`.

The URL MUST point to a human-readable documentation of the profile. 

If the API is using [`application/hal+json`](./1010_must-implement-rest-maturity-level-2-for-private-apis.md),
the `_links` of the representation [MUST contain a `profile` link](./2020_must-provide-conventional-hyperlinks.md) with
an `href` containing the URL of the representation`s profile:
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