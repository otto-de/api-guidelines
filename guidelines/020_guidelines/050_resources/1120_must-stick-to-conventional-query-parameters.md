---
type: MUST
id: R000049
---

# stick to conventional query parameters

In order to provide clients a consistent API, the following query parameters MUST be used instead of introducing custom
parameters for the same functionality.

**Index:**

| name       | section                                           |
| :--------- | :------------------------------------------------ |
| `after`    | [paging](#paging)                                 |
| `before`   | [paging](#paging)                                 |
| `embed`    | [embedding](#embedding)                           |
| `fields`   | [filtering](#filtering)                           |
| `page`     | [paging](#paging)                                 |
| `pageSize` | [paging](#paging)                                 |
| `q`        | [querying](#querying)                             |
| `sort`     | [sorting](#sorting)                               |

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

The syntax of the query fields value is defined by the following BNF grammar.

```
<fields>            ::= [ <negation> ] <fields_struct>
<fields_struct>     ::= "(" <field_items> ")"
<field_items>       ::= <field> [ "," <field_items> ]
<field>             ::= <field_name> | <fields_substruct>
<fields_substruct>  ::= <field_name> <fields_struct>
<field_name>        ::= <dash_letter_digit> [ <field_name> ]
<dash_letter_digit> ::= <dash> | <letter> | <digit>
<dash>              ::= "-" | "_"
<letter>            ::= "A" | ... | "Z" | "a" | ... | "z"
<digit>             ::= "0" | ... | "9"
<negation>          ::= "!"
```
## Embedding

| name     | description                                 | values | example                |
| :------- | :------------------------------------------ | :----- | :--------------------- |
| `embed`  | Comma-separated list of link-relation types | \*     | `?embed=item,o:images` |

