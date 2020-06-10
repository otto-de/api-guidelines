---
type: MUST
id: R100023
---

# support pagination for collection resources

Any sufficiently large collection resource must support pagination to handle the server load and support the client processing patterns.

There are two approaches to pagination:

- [offset based](#offset-based-pagination)
- [cursor based](#cursor-based-pagination)

Choosing the right approach depends entirely on the constraints of the service.
There is no preference over which one to choose, they both have their advantages.

## Offset based pagination

Offset based pagination allows navigation of the result by specifying an offset.

Page based pagination means the result set is further divided into pages of a certain size and you navigate by providing the page number instead of just an offset.

This is the most common approach to do pagination, especially for traditional RDBM systems.

### Pros

- well-known pattern
- wide support for server and client

### Cons

- assumes fixed length / window is fixed: next page might contain previous elements or skip elements if elements were inserted or deleted in the meantime. Should be avoided for quickly updating collections.

### Example

```json
{
  "_embedded": {
    "o:orders": [
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
          "curies": [{ "name": "o", "href": "https://api.otto.de/link-relations/{rel}", "templated": true}],
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

  "page": {
    "size": 10,
    "totalElements": 100,
    "totalPages": 1,
    "number": 0
  }
}
```

## Cursor based pagination

Cursor based pagination is often preferred, especially when data sets increase quickly.

### Pros

- window moves: next page always refers to the following elements, even if new elements are prepended in the meantime

### Cons

- not well-known
- limited support for clients
- cursor might be invalid if the entry is deleted, breaking iteration

### Example

```json
{
  "_embedded": {
    "o:orders": [
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
    "self": { "href": "/orders?after=532d39e987409c5b6fe7f913c9e568af" },
    "curies": [{ "name": "o", "href": "https://api.otto.de/link-relations/{rel}", "templated": true}],
    "prev": { "href": "/orders?before=911d39e987409c5b6fe7f913c9e568ca" },
    "next": { "href": "/orders?after=40770e2e3ce129faadd08663fa434c33" },
    "first": { "href": "/orders" }
  }
}
```
