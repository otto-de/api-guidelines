# Common query parameters

This section describes common query parameters to provide the client a consistent API.

**Index:**

| name     | section                                           |
| :------- | :------------------------------------------------ |
| `after`  | [paging](#paging)                                 |
| `before` | [paging](#paging)                                 |
| `page`   | [paging](#paging)                                 |
| `q`      | [querying and filtering](#querying-and-filtering) |
| `size`   | [paging](#paging)                                 |
| `sort`   | [sorting](#sorting)                               |

## Paging

| name     | description                        | values | example        |
| :------- | :--------------------------------- | :----- | :------------- |
| `size`   | Number of elements in the response | `1..`  | `?size=1`      |
| `page`   | Page number (0-indexed)            | `0..`  | `?page=2`      |
| `after`  | Results after the cursor position  | \*     | `?after=e2e3c` |
| `before` | Results before the cursor position | \*     | `?after=129fa` |

## Sorting

| name   | description                                                                                                                                                                                                           | values                    | example                      |
| :----- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------ | :--------------------------- |
| `sort` | Property to sort by with optional ordering. Can be provided multiple times to sort by multiple properties. Naming _should_ correspond to JSON field names with dot-navigation if necessary (e.g. `price.grossValue`). | `<field>[,(asc \| desc)]` | `?sort=price,desc&sort=name` |

## Querying and filtering

| name | description       | values | example    |
| :--- | :---------------- | :----- | :--------- |
| `q`  | Simple text query | \*     | `?q=shoes` |

If more advanced queries are necessary, make them available via [separate endpoints that accept queries as JSON payloads](./../guidelines/020_guidelines/040_resources/4110_use-json-for-advanced-querying-and-filtering.md).

TODO: queries über request parameter
TODO: Filtering als separaten Punkt

## Embedding

| name    | description                                 | values | example                |
| :------ | :------------------------------------------ | :----- | :--------------------- |
| `embed` | Comma-separated list of link-relation types | \*     | `?embed=item,o:images` |
