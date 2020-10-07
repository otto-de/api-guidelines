---
type: MUST
id: R000049
---

# stick to conventional query parameters

To provide clients with a consistent API, the following query parameters must be used instead of introducing custom parameters for the same functionality.

**Index**:

| name       | section                 |
| :--------- | :---------------------- |
| `after`    | paging      |
| `before`   | paging       |
| `embed`    | embedding |
| `fields`   | filtering |
| `page`     | paging         |
| `pageSize` | paging        |
| `q`        | querying  |
| `sort`     | sorting    |

||| accordion Paging { begin }

| name       | description                        | values | example         |
| :--------- | :--------------------------------- | :----- | :-------------- |
| `pageSize` | Number of elements in the response | `1..`  | `?pageSize=10`  |
| `page`     | Page number (0-indexed)            | `0..`  | `?page=2`       |
| `after`    | Results after the cursor position  | \*     | `?after=e2e3c`  |
| `before`   | Results before the cursor position | \*     | `?before=129fa` |
|||

||| accordion Sorting

| name   | description                                                                                                                                                                                                         | values                 | example                 |
| :----- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------- | :---------------------- |
| `sort` | Property to sort by with optional ordering. Can be provided multiple times to sort by multiple properties. Naming should correspond to JSON field names with dot-navigation if necessary (e.g. `price.grossValue`). | `<field>[:(asc|desc)]` | `?sort=price:desc,name` |
|||

||| accordion Querying

| name | description       | values | example    |
| :--- | :---------------- | :----- | :--------- |
| `q`  | Simple text query | \*     | `?q=shoes` |

Introduce [your own descriptive query parameters for querying](./guidelines/020_guidelines/060_resources/2100_must-use-query-parameters-for-basic-search-or-filtering.md).

If more advanced queries are necessary, make them available via [separate endpoints that accept queries as JSON payloads](./guidelines/020_guidelines/060_resources/2110_use-json-for-advanced-querying-and-filtering.md).
|||

||| accordion Filtering

Depending on your use case and payload size, you can significantly reduce network bandwidth need by supporting filtering of returned entity fields.

| name     | description                                 | values | example                         |
| :------- | :------------------------------------------ | :----- | :------------------------------ |
| `fields` | Selection of fields that should be returned | \*     | `?fields=name,friends(id,name)` |

See also [Filtering of fields using common query parameter](./guidelines/020_guidelines/050_naming-conventions/2080_should-support-filtering-of-fields-using-common-query-parameter.md)
|||

||| accordion Embedding { end }

| name    | description                               | values | example                        |
| :------ | :---------------------------------------- | :----- | :----------------------------- |
| `embed` | Selection of link-relation types to embed | \*     | `?embed=(item,item(o:images))` |

Examples:

- Do not embed anything: `?embed=()`
- Embed products into the response: `?embed=(o:product)`
- Embed all products and for every product also embed its variations: `?embed=(o:product, o:product(o:variation))`
|||
