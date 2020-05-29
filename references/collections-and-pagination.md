# Collection resources and pagination

A collection resource is a resource that represents a list of resources like, for example the collection of all 
products.

## **MUST** use HAL format for collection resources

All collection resources **MUST** use application/hal+json to represent lists of items.

## **MUST** contain hyperlinks to the items of the collection

The items of the collection **MUST** be linked using HAL `_links`. In most cases, the link-relation type of the links 
**SHOULD** be [`item`](https://www.iana.org/assignments/link-relations/link-relations.xhtml).

## **SHOULD** support embedding of the items
 
Lists of items **SHOULD** be embedded using the HAL `_embedded` object using the same link-relation type that is used
in the `_links` section.

The list resource **MAY** only include a subset of the properties of the resource, e.g. because of performance considerations.

The embedded [resources guidelines](./embedding.md) **MUST** be respected.

## **MUST** support pagination

Any sufficiently large collection resource **MUST** support pagination to handle the server load and support the client processing patterns.

Exposing the total number of elements should consider the performance implications, not only now but over the lifespan of the service.

## **MUST** provide hypermedia controls

**SHOULD** for internal non-cursor-based APIs: For internal APIs it is only a recommendation to use HAL as a format to represent linking and embedding.
However, as for partner and public APIs the HAL format is mandatory, publishing an internal API would require breaking changes to the API, if a different format than HAL would be used.

For cursor based navigation, you **MUST** to provide links as the paging metadata is not defined and the client should have a consistent paging API and the implementations may differ.

**MUST** provide links to navigate the result set.
The [IANA link relations](http://www.iana.org/assignments/link-relations/link-relations.xhtml) **SHOULD** be used whenever applicable.

The most common ones are:

- `self` : the current page
- `next` : the next page
- `prev` : the previous page
- `first` : the first page
- `last` : the last page

  _Page_ might have different meanings depending on the implementation, see below.

## **MUST** use common query parameters

To provide a consistent look and feel of pagination patterns, you must stick to the common query parameter names.

Relevant query parameters are:

- paging (offset): `size`, `page`
- paging (cursor): `after`, `before`
- sorting: `sort`
- querying, filtering: `q`

Please refer to the [common query parameters](./common-query-parameters.md) section for more details.

Make sure to add query parameters (that differ from the default) to HAL links if necessary.

## Pagination variants

There are two main ways to do pagination.
There is no preference over which one to choose, it depends entirely on the implementation and constraints of the service.

### 1. Offset based

The most common approach to do pagination, especially for traditional RDBM systems.

If offset based pagination is chosen, it **MUST** be page based.

#### **MUST** provide page metadata

**MUST** provide page metadata so clients can build their own links.

The page metadata structure **MUST** match the following structure.
Some fields can be omitted.

```json
{
  "_page": {
    "size": 5,
    "number": 0,
    "totalElements": 50,
    "totalPages": 10
  }
}
```

- `size` : Number of elements in the response (page size)
- `number` : Current page number (0 indexed)
- `totalElements` (_optional_): Overall number of elements
- `totalPages` (_optional_): Overall number of pages

`totalElements` and `totalPages` **CAN** be omitted if the implementation is not feasable, e.g. when the calculation has a big performance impact.

#### Pros

- well-known pattern
- wide support for server and client

#### Cons

- window is fixed: next page might contain previous elements or skip elements if elements were inserted or deleted in the meantime. **SHOULD** be avoided for quickly updating collections.

### 2. Cursor based

Offset based pagination is often preferred, especially when data sets increase quickly.

#### **SHOULD** provide cursor metadata

**SHOULD** provide cursor metadata so clients can build their own links.

TODO: Define cursor metadata. There are different approaches

#### Pros

- window moves: next page always refers to the following elements, even if new elements are prepended in the meantime

#### Cons

- not well-known
- limited support for clients
- cursor might be invalid if the entry is deleted, breaking iteration

## Example

### Offset based

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

### Cursor based

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

## References

- [HAL RFC: Example document](https://tools.ietf.org/html/draft-kelly-json-hal-08#section-6)
- [Zalando's guidelines on pagination](https://opensource.zalando.com/restful-api-guidelines/#pagination)
- [JSON: API Spec: Pagination](https://jsonapi.org/format/#fetching-pagination)
- [Facebook API: Paging](https://developers.facebook.com/docs/graph-api/using-graph-api/v2.4#paging)
- [Spring data REST](https://docs.spring.io/spring-data/rest/docs/current/reference/html/#paging-and-sorting)
- [Offset/Limit-based pagination](https://developer.infoconnect.com/paging-results): numeric offset identifies the first page entry
- [Cursor/Limit-based](https://dev.twitter.com/overview/api/cursoring) — aka key-based — pagination: a unique key element identifies the first page entry (see also [Facebook's guide](https://developers.facebook.com/docs/graph-api/using-graph-api/v2.4#paging))

The technical conception of pagination should also consider user experience related issues. As mentioned in this [article](https://www.smashingmagazine.com/2016/03/pagination-infinite-scrolling-load-more-buttons/), jumping to a specific page is far less used than navigation via `next`/`prev` page links
