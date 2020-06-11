---
type: SHOULD
id: R000041
---

# support optional embedding of sub-resources

Embedding related resources (also know as Resource expansion) is a great way to reduce the number of requests.
In cases where clients know upfront that they need some related resources they can instruct the server to prefetch
that data eagerly. Whether this is optimized on the server, e.g. a database join, or done in a generic way, e.g. an
HTTP proxy that transparently embeds resources, is up to the implementation.

Resources that are linking to sub-resources SHOULD support embedding of sub-resources. In order to improve flexibility
of the API for different use-cases, embedding of sub-resources SHOULD be optional, using the request parameter
`[embed](./1120_must-stick-to-conventional-query-parameters.md)` to select the sub-resources to embed.

_Example:_

```json
GET /products?embed=(item) HTTP/1.1

{
  "id": "123",
  "_links": {
    "item": [
      { "href": "http://api.otto.de/products/4711" }
    ]
  },
  "_embedded": {
    "item": [
      {
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

See also:

- [MUST stick to conventional query parameters](./1120_must-stick-to-conventional-query-parameters.md)
