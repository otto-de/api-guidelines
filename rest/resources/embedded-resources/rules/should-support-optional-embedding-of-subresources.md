---
type: SHOULD
id: R000063
---

# support optional embedding of subresources

Resources that link to subresources [SHOULD support embedding of subresources](@guidelines/R000041).
In order to improve flexibility of the API for different use cases, embedding of subresources should be optional, using the request parameter [`embed`](@guidelines/R000049) to select the
subresources to embed.

In cases where clients know upfront that they need some related resources they can instruct the server to prefetch that data eagerly.
Whether this is optimized on the server, for example, by a database join, or done in a generic way, for example, with an HTTP proxy that transparently embeds resources, is up to the implementation.

Example:

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

If parameter `embed` is not provided by the client, the resources should be embedded by default.
However, clients could also decide to NOT embed the linked resources:

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
