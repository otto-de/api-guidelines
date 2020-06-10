---
navTitle: Cursor based pagination
---

# Cursor based pagination

Offset based pagination is often preferred, especially when data sets increase quickly.

## Pros

- window moves: next page always refers to the following elements, even if new elements are prepended in the meantime

## Cons

- not well-known
- limited support for clients
- cursor might be invalid if the entry is deleted, breaking iteration

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
    "self": { "href": "/orders?cursor=911d39e987409c5b6fe7f913c9e568ca" },
    "prev": { "href": "/orders?before=911d39e987409c5b6fe7f913c9e568ca" },
    "next": { "href": "/orders?after=40770e2e3ce129faadd08663fa434c33" },
    "first": { "href": "/orders" }
  }
}
```
