---
type: MUST
id: R000049
---

# stick to conventional query parameters

In order to provide clients a consistent API, the following query parameters MUST be used instead of introducing custom
parameters for the same functionality.

**Index:**

| name       | section                 |
| :--------- | :---------------------- |
| `after`    | [paging](#paging)       |
| `before`   | [paging](#paging)       |
| `embed`    | [embedding](#embedding) |
| `fields`   | [filtering](#filtering) |
| `page`     | [paging](#paging)       |
| `pageSize` | [paging](#paging)       |
| `q`        | [querying](#querying)   |
| `sort`     | [sorting](#sorting)     |

## Paging

| name       | description                        | values | example         |
| :--------- | :--------------------------------- | :----- | :-------------- |
| `pageSize` | Number of elements in the response | `1..`  | `?pageSize=10`  |
| `page`     | Page number (0-indexed)            | `0..`  | `?page=2`       |
| `after`    | Results after the cursor position  | \*     | `?after=e2e3c`  |
| `before`   | Results before the cursor position | \*     | `?before=129fa` |

## Sorting

| name   | description                                                                                                                                                                                                           | values                    | example                      |
| :----- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------ | :--------------------------- |
| `sort` | Property to sort by with optional ordering. Can be provided multiple times to sort by multiple properties. Naming _should_ correspond to JSON field names with dot-navigation if necessary (e.g. `price.grossValue`). | `<field>[,(asc \| desc)]` | `?sort=price,desc&sort=name` |

TODO: Alternativ: comma-separated list of fields (as defined by MUST define collection format of header and query parameters) to define the sort order. To indicate sorting direction, fields may be prefixed with + (ascending) or - (descending), e.g. /sales-orders?sort=+id.

## Querying

| name | description       | values | example    |
| :--- | :---------------- | :----- | :--------- |
| `q`  | Simple text query | \*     | `?q=shoes` |

If more advanced queries are necessary, they should be made available via separate endpoints that accept queries as
JSON payloads.

TODO: queries über request parameter

## Filtering

Depending on your use case and payload size, you can significantly reduce network bandwidth need by supporting
filtering of returned entity fields.

| name     | description                                 | values | example                            |
| :------- | :------------------------------------------ | :----- | :--------------------------------- |
| `fields` | Selection of fields that should be returned | \*     | `?fields=(name,friends(id, name))` |

Examples:

- Include only field name: `fields=(name)`
- Include field name and id: `fields=(name,id)`
- Include field name and friends, with friends only having id and name properties: `fields=(name,friends(id, name))`

## Embedding

| name    | description                               | values | example                        |
| :------ | :---------------------------------------- | :----- | :----------------------------- |
| `embed` | Selection of link-relation types to embed | \*     | `?embed=(item,item(o:images))` |

Examples:

- Do not embed anything: `?embed=()`
- Embed products into the response: `?embed=(o:product)`
- Embed all products, and for every product also embed it's variations: `?embed=(o:product, o:product(o:variation))`
