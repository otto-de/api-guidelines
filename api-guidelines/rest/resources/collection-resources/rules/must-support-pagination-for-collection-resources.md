---
id: R100023
---

# MUST support pagination for collection resources

Any sufficiently large collection resource must support pagination to handle the server load and support the client processing patterns.

## Offset or limit-based pagination
Offset or limit-based pagination allows the navigation of the result by specifying an offset.
This is the most common approach for pagination, especially for traditional RDBM systems.

PROs

- well-known pattern
- wide support for server and client

CONs

- assumes an immutable result set
- not suitable for frequently updated collections as the next paging response might contain previous elements or skip elements if elements were inserted or deleted in the meantime

## Cursor-based pagination
Cursor-based pagination is often preferred, especially when data sets increase quickly.

PROs

- window moves: next page always refers to the following elements, even if new elements are prepended in the meantime

CONs

- not well-known
- limited support for clients
- cursor might be invalid if the entry is deleted, breaking iteration

Example:

```json
{
  "_links": {
    "self": {
      "href": "https://api.otto.de/orders?after=532d39e987409c5b6fe7f913c9e568af"
    },
    "item": [
      { "href": "https://api.otto.de/orders/123" },
      { "href": "https://api.otto.de/orders/124" }
    ],
    "prev": {
      "href": "https://api.otto.de/orders?before=911d39e987409c5b6fe7f913c9e568ca"
    },
    "next": {
      "href": "https://api.otto.de/orders?after=40770e2e3ce129faadd08663fa434c33"
    },
    "first": { "href": "https://api.otto.de/orders" }
  },
  "_embedded": {
    "item": [
      {
        "total": 30.0,
        "currency": "USD",
        "status": "shipped",

        "_links": {
          "self": { "href": "https://api.otto.de/orders/123" }
        }
      },
      {
        "total": 20.0,
        "currency": "USD",
        "status": "processing",

        "_links": {
          "self": { "href": "/orders/124" }
        }
      }
    ]
  },

  "currentlyProcessing": 14,
  "shippedToday": 20
}
```

::: references

- [MUST stick to conventional query parameters](../../naming-conventions/rules/must-stick-to-conventional-query-parameters.md)
  :::
