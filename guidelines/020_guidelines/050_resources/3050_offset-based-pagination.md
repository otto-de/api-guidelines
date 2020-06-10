---
navTitle: Offset based pagination
---

# Offset based pagination

Offset based pagination allows navigation of the result by specifying an offset.

Page based pagination means the result set is further divided into pages of a certain size and you navigate by providing the page number instead of just an offset.

This is the most common approach to do pagination, especially for traditional RDBM systems.

### Pros

- well-known pattern
- wide support for server and client

### Cons

- assumes fixed length / window is fixed: next page might contain previous elements or skip elements if elements were inserted or deleted in the meantime. Should be avoided for quickly updating collections.

## Example

```json
{
  "_embedded": {
    "orders": [
      {
        "total": 30.0,
        "currency": "USD",
        "status": "shipped",

        "_links": {
          "self": { "href": "/orders/123" },
          "basket": { "href": "/baskets/98712" },
          "customer": { "href": "/customers/7809" }
        }
      },
      {
        "total": 20.0,
        "currency": "USD",
        "status": "processing",

        "_links": {
          "self": { "href": "/orders/124" },
          "basket": { "href": "/baskets/97213" },
          "customer": { "href": "/customers/12369" }
        }
      }
    ]
  },

  "currentlyProcessing": 14,
  "shippedToday": 20,

  "_links": {
    "prev": { "href": "/orders?page=1" },
    "self": { "href": "/orders?page=2" },
    "next": { "href": "/orders?page=3" },
    "first": { "href": "/orders" },
    "last": { "href": "/orders?page=9" }
  },

  "_page": {
    "size": 10,
    "totalElements": 100,
    "totalPages": 10,
    "number": 0
  }
}
```
