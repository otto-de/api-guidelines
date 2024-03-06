---
id: R100024
---

# MUST use common paging query parameters

::: info Info
This rule applies to public APIs. For private APIs it should be followed.
:::

API providers have two options for the implementation of offset-based pagination.
In both implementations, requested pages outside the valid range (e.g. page 10 of a collection with five elements) must return an empty collection.

## Paging with `limit` and `offset` parameters

- `limit`: The number of elements in the response or the chunk size.
- `offset`: The first position or starting point (zero-based) of the collection that is requested.

#### PROs

- The starting point can be freely adjusted.
- Both parameters are independent of each other.
- No conversion in the persistence layer is necessary.

#### CONs

- Client-side pagination is more complex if the UI displays results in pages.
- The UI and the API response could be different if the UI displays results in pages.

### Example

Request:

```http request
GET https://api.otto.de/orders?offset=9&limit=5
```

Response:

```json
{
  "_links": {
    "item": [
      { "href": "https://api.otto.de/orders/123" },
      ...
    ],
    "self": { "href": "https://api.otto.de/orders?offset=9&limit=5" },
    "prev": { "href": "https://api.otto.de/orders?offset=4&limit=5" },
    "next": { "href": "https://api.otto.de/orders?offset=14&limit=5" }
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
      ...
    ]
  },

  "_offsetPage": {
    "limit": 5,
    "offset": 9,
    "totalElements": 22
  },

  "currentlyProcessing": 14,
  "shippedToday": 20
}
```

## Paging using `page` and `pageSize` parameters

- `pageSize`: The number of elements in the response or the chunk size.
- `page`: The page number that is requested (0-indexed).

#### PROs

- For UIs that display results in pages, the API response matches the UI.
- Client-side pagination is easier if the UI displays results in pages.

#### CONs

- Both parameters depend on each other.
- It is not possible to set a flexible start position for a page. It always needs to be a multiple of the `pageSize`.
- A conversion in the persistence layer is necessary.
- The API is harder to use for UI implementations that use other paging approaches, such as infinite scrolling.

### Example

Request:

```http request
GET https://api.otto.de/orders?page=2&pageSize=10
```

Response:

```json
{
  "_links": {
    "item": [
      { "href": "https://api.otto.de/orders/123" },
      { "href": "https://api.otto.de/orders/124" },
      ...
    ],
    "self": { "href": "https://api.otto.de/orders?page=2&pageSize=10" },
    "next": { "href": "https://api.otto.de/orders?page=3&pageSize=10" },
    "prev": { "href": "https://api.otto.de/orders?page=1&pageSize=10" }
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
          "self": { "href": "https://api.otto.de/orders/124" }
        }
      },
      ...
    ]
  },

  "_page": {
    "size": 10,
    "totalElements": 100,
    "totalPages": 10,
    "number": 2
  },

  "currentlyProcessing": 14,
  "shippedToday": 20
}
```

## Paging using `before` or `after` parameters

- `after`: Results after the cursor position
- `before`: Results before the cursor position

#### PROs

- window moves: next page always refers to the following elements, even if new elements are prepended in the meantime

#### CONs

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
- [MUST support pagination](./must-support-pagination-for-collection-resources.md)
  :::
