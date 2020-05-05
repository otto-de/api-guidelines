## Embedded Resources

### [SHOULD] use HAL format for embedded resources

> TODO: [WIP]
>
> **TODO**: für interne APIs. Bei public APIs ist das ein MUST. Hinweis auf mögliche spätere Migration auf HAL
>
> 



### **[SHOULD]** allow optional embedding of sub-resources

> TODO: [REVIEW]
> TODO: LINK auf conventional query parameters

Embedding related resources (also know as *Resource expansion*) is a great way to reduce the number of requests. 
In cases where clients know upfront that they need some related resources they can instruct the server to prefetch 
that data eagerly. Whether this is optimized on the server, e.g. a database join, or done in a generic way, e.g. an 
HTTP proxy that transparently embeds resources, is up to the implementation.

See [**MUST** stick to conventional query parameters](#must-stick-to-conventional-query-parameters) for naming, e.g. 
"embed" for steering of embedded resource expansion. Please use the [BNF](https://en.wikipedia.org/wiki/Backus–Naur_form) 
grammar, as already defined above for filtering, when it comes to an embedding query syntax.

Embedding a sub-resource can possibly look like this where an order resource has its order items as sub-resource 
(/order/{orderId}/items):

```json
GET /order/123?embed=(items) HTTP/1.1

{
  "id": "123",
  "_embedded": {
    "item": [
      {
        "position": 1,
        "sku": "1234-ABCD-7890",
        "price": {
          "amount": 71.99,
          "currency": "EUR"
        }
      }
    ]
  }
}
```
