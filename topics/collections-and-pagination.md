# Collection resources and pagination

## Example

See also [HAL RFC](https://tools.ietf.org/html/draft-kelly-json-hal-08#section-6).

``` json
{
  "_embedded": {
    "orders": [
        {
          "total": 30.00,
          "currency": "USD",
          "status": "shipped",
          
          "_links": {
            "self": { "href": "/orders/123" },
            "basket": { "href": "/baskets/98712" },
            "customer": { "href": "/customers/7809" }
          }
        },
        {
          "total": 20.00,
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

  "page" : {
    "size" : 10,
    "totalElements" : 100,
    "totalPages" : 10,
    "number" : 0
  }
}
```

## **MUST** respect embedded resources guidelines

??? TODO: add link

See [embedded resources](#embedded-resources) section.

## **MUST** support pagination

Any sufficiently large collection resource **MUST** support pagination to handle the server load and support the client processing patterns.

## **MUST** provide hypermedia controls

??? **SHOULD** for internal, **MUST** for public/partner?

**MUST** provide links to navigate the result set.
The [IANA link relations](http://www.iana.org/assignments/link-relations/link-relations.xhtml) **SHOULD** be used whenever applicable.

The most common ones are:

* `self` : the current page
* `next` : the next page
* `prev` : the previous page
* `first` : the first page
* `last` : the last page

 *Page* might have different meanings depending on the implementation, see below.

 ## **MUST** use common query parameters

??? TODO

## Pagination variants

There are two main ways to do pagination.
There is no preference over which one to choose, it depends entirely on the implementation and constraints of the service.

### 1. Offset based

The most common approach to do pagination, especially for RDBM systems.

#### **MUST** provide page metadata

If offset based pagination is chosen, it **SHOULD** be page based.

??? should or must? Any reason why for example only offset&limit is possible (page 2 would be something like `?offset=21&limit=20` ) or any other approach is the only viable one

The page metadata structure **MUST** match the following structure.

``` json
{
  "page" : {
    "size" : 5,
    "number" : 0,
    "totalElements" : 50,
    "totalPages" : 10
  }
} 
```

??? naming: Maybe prefix `page` with with `_` ? Only `_embedded` and `_links` are reserved in the HAL RFC.

* `size` : Number of elements in the response (page size)
* `number` : Current page number (0-based)
* `totalElements` (*optional*): Overall number of elements
* `totalPages` (*optional*): Overall number of pages

??? naming: others are names are also pretty common, e.g. limit, page, total, pages, page

The total number of elements/pages **CAN** be omitted if the implementation is not feasable, e.g. when the calculation has a big performance impact.

#### Pros

* well-known pattern
* wide support for server and client

#### Cons

* window is fixed: next page might contain previous elements or skip elements if elements were inserted or deleted in the meantime. **SHOULD** be avoided for quickly updating collections.

### 2. Cursor based

Offset based pagination is often preferred, especially when data sets increase quickly.

#### **MUST** provide cursor metadata

``` json
{
  "cursors" : {
    "self" : "e22e7ab6abd8c7886ef1c1f6c444c9ed",
    "after" : "40770e2e3ce129faadd08663fa434c33",
    "before" : "911d39e987409c5b6fe7f913c9e568ca",
    "first" : "911d39e987409c5b6fe7f913c9e568ca",
    "last": "4e9d5f51bc95eb9efe203737ff0f4f13"
  }
}
```

??? Naming: Maybe prefix `cursors` with `_` ?
??? Naming: `after` , `before` vs `next` , `previous` - see page metadata?

* `self` : Cursor to the first element in the result. Same as *first* if results
* `after` : Cursor to the last element in this subset. To be used to get the next elements
* `before` : Cursor to the first element of this subset. To be used to get the previous elements
* `last` (*optional*): Cursor to the last element of all results. To be used to get the end of all results (and iterate backwards)
* `first` (*optional*): Cursor to the first element of all results. To be used to get the beginning of all results

#### Pros

* window moves: next page always refers to the following elements, even if new elements are prepended in the meantime

#### Cons

* not well-known
* limited support for clients
* cursor might be invalid if the entry is deleted, breaking iteration

## TODO

* check MUST/SHOULD
  + distinguishing between internal and public APIs?
* templated links
* common query paramters
* basic filters
* adjust example
* separate topics/issues for
  + finders/search/queries
  + embedded resouces, i.e. embedding products in `/orders/123`
