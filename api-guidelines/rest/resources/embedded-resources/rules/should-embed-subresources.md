---
id: R000041
---

# SHOULD embed subresources

Embedding related resources (also known as resource expansion) is a great way to reduce the number of requests.
Resources that link to subresources should return these subresources using the HAL `_embedded` object.

::: info Info
Do not embed a resource or at least embed it optional (via embed query param), if it generates unnecessary load, traffic, or response bloat.
:::

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

::: references

- [SHOULD support optional embedding of subresources](./should-support-optional-embedding-of-subresources.md)
  :::
