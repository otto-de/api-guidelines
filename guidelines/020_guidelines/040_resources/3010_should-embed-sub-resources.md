---
type: SHOULD
id: R000041
---

# embed sub-resources

Embedding related resources (also know as resource expansion) is a great way to reduce the number of requests.

Resources that are linking to sub-resources SHOULD return these sub-resources using the HAL `_embedded` object.

::: info Hint
In many cases, the linked resources will be provided by different services. In this case, the linked resources
sometimes can not be embedded without major effort and this rule should not be applied.
:::

_Example:_

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

- [SHOULD support optional embedding of sub-resources](./3020_should-support-optional-embedding-of-sub-resources.md)
  :::
