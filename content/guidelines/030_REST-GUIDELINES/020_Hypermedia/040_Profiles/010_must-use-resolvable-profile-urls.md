---
type: MUST
id: R100066
---

# use resolvable profile URLs

To avoid name collisions for different domains and to allow grouping of profiles within the same context, the profile URI uses a `context-id`.
The URI that identifies a profile must be resolvable and must match `https://api.otto.de/portal/profiles/{context-id}/{name}+v{version}`.

Profile URIs must comply with the following conventions:

- must contain exactly one `context-id`
- `context-id` and `name` should be kebab-case
- use plurals or _list_ to indicate a collection, e.g. `https://api.otto.de/portal/profiles/search/products+v1`.
- must not contain team, task or use case shortcuts
- must not contain trailing slashes

The URL must point to a human-readable documentation of the profile.

If the API uses [HAL](@guidelines/R000036), the `_links` of the representation [should contain a `profile` link](@guidelines/R100033) with an `href` containing the URL of the representation's profile:

```json
{
  "_links": {
    "self": { "href": "https://api.otto.de/orders/4711" },
    "profile": {
      "href": "https://api.otto.de/portal/profiles/checkout/order+v1"
    }
  },
  "total": 3000,
  "currency": "EUR",
  "status": "shipped"
}
```

::: references

- [MUST implement REST maturity level 2](@guidelines/R000032)
- [MUST implement REST maturity level 3 for transitional APIs](@guidelines/R000033)
- [MUST provide conventional hyperlinks](@guidelines/R100033)
  :::
