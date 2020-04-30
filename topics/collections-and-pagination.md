# Collection resources and pagination


## **MUST** support pagination

Any sufficiently large collection resource **MUST** support pagination to handle the server load and support the client processing patterns.

## **MUST** provide hypermedia controls

Links must provide link to navigate the result set.
The [IANA link relations](http://www.iana.org/assignments/link-relations/link-relations.xhtml) **SHOULD** be used whenever applicable.

The most common ones are:
 - `self`: the current page
 - `next`: the next page
 - `prev`: the previous page
 - `first`: the first page
 - `last`: the last page

 *Page* might have different meanings depending on the implementation.


## Pagination variants

There are two main ways to do pagination.
There is no preference over which one to choose, it depends entirely on the implementation and constraints of the service.

### 1. Offset based

The most common approach to do pagination, especially for RDBM systems.


#### **MUST** provide page metadata

If offset based pagination is chosen, it **SHOULD** be page based.

??? should or must? Any reason why for example only offset+limit is possible (page 2 would be something like `?offset=21&limit=20`) or any other approach is the only viable one

The page metadata structure must match the following structure.

```json
{
  "page" : {
    "size" : 5,
    "totalElements" : 50,
    "totalPages" : 10,
    "number" : 0
  }
} 
```

??? naming: Maybe prefix `page` with with `_`?


- `size`: number of elements in the response (page size)
- `number`: page number (0-based)
- `totalElements` (*optional*): Overall number of elements
- `totalPages` (*optional*): Overall number of pages

The total number of elements/pages **CAN** be omitted if the implementation is not feasable, e.g. when the calculation has a big performance impact.


### **SHOULD** provide a templated link with query parameters. 
*MUST* use common query parameters.

MUST NOT use offset based navigation 

#### Pros

- well-known pattern
- wide support for server and client

#### Cons

- window is fixed: next page might contain previous elements or skip elements if elements were inserted or deleted in the meantime. **SHOULD** be avoided for quickly updating collections.


### Cursor based

Offset based pagination is often preferred, especially when data sets increase quickly.

#### **MUST** provide cursor metadata

```json
{
  "cursors" : {
    "self" : 5,
    "first" : 50,
    "previous" : 10,
    "number" : 0
  }
} 
```
??? Naming: Maybe prefix `cursors` with `_`?

- `size`: number of elements in the response (page size)
- `number`: page number (0-based)
- `totalElements` (*optional*): Overall number of elements
- `totalPages` (*optional*): Overall number of pages


#### Pros

- window moves: next page always refers to the following elements, even if new elements are prepended in the meantime

#### Cons

- not well-known
- limited support for clients
- cursor might be invalid if the entry is deleted, breaking iteration
