---
type: SHOULD NOT
id: R000042
---

# swap out links for embedded resources

Servers SHOULD NOT entirely "swap out" a link for an embedded
resource (or vice versa) because client support for this technique is
OPTIONAL.

_Example:_

```http request
GET https://api.otto.de/products HTTP/1.1
```
```json
{
  "_links": {
    "item": [
      { "href": "http://api.otto.de/products/4711" }
    ]
  },
  "_embedded": {
    "item": [
      {
        "_links": {
          "self": [
            { "href": "http://api.otto.de/products/4711" }
          ]
        },
        "productId": "4711",
      }
    ]
  }
}
```

But don't render the item like this:

```http request
GET https://api.otto.de/products HTTP/1.1
```
```json
{
  "_links": {
    "item": [
      { "href": "http://api.otto.de/products/4711" }
    ]
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