---
type: SHOULD
id: R000063
---

# support optional embedding of sub-resources

Resources that are linking to sub-resources [SHOULD support embedding of sub-resources](./3010_should-embed-sub-resources.md).
In order to improve flexibility of the API for different use-cases, embedding of sub-resources SHOULD be optional,
using the request parameter `[embed](./1120_must-stick-to-conventional-query-parameters.md)` to select the
sub-resources to embed.

In cases where clients know upfront that they need some related resources they can instruct the server to prefetch
that data eagerly. Whether this is optimized on the server, e.g. a database join, or done in a generic way, e.g. an
HTTP proxy that transparently embeds resources, is up to the implementation.

_Example:_

```http request
GET https://api.otto.de/products?embed=(item) HTTP/1.1
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
        "productId": "4711",
        "price": {
          "amount": 71.99,
          "currency": "EUR"
        }
      }
    ]
  }
}
```

If parameter 'embed' is not provided by the client, the resources should be embedded by default. However, clients could
also decide to _not_ embed the linked resources:

```http request
GET https://api.otto.de/products?embed=() HTTP/1.1
```

```json
{
  "_links": {
    "item": [{ "href": "http://api.otto.de/products/4711" }]
  }
}
```

::: references

- [MUST stick to conventional query parameters](./1120_must-stick-to-conventional-query-parameters.md)
  :::
