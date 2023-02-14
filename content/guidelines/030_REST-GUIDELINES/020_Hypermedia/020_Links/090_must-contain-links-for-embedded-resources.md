---
type: MUST
id: R000042
---

# contain links for embedded resources

::: info Info
This rule applies to APIs that have to comply with [REST maturity level 3](@guidelines/R000033).
:::

Servers must not entirely "swap out" a link for an embedded resource (or vice versa) because client support for this technique is OPTIONAL.

For every embedded resource, a corresponding link MUST be contained in the `_links` object of the embedding resource.

Example:

```http request
GET https://api.otto.de/products HTTP/1.1
```

```json
{
  "_links": {
    "item": [{ "href": "http://api.otto.de/products/4711" }]
  },
  "_embedded": {
    "item": [
      {
        "_links": {
          "self": [{ "href": "http://api.otto.de/products/4711" }]
        },
        "productId": "4711"
      }
    ]
  }
}
```

But do not render the item like this:

```http request
GET https://api.otto.de/products HTTP/1.1
```

```json
{
  "_links": {
    "item": [{ "href": "http://api.otto.de/products/4711" }]
  },
  "_embedded": {
    "item": [
      {
        "productId": "4711"
      }
    ]
  }
}
```
