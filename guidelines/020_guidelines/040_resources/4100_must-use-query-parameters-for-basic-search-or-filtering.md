---
type: MUST
id: R100031
---

# use query parameters for basic search or filtering

Resource specific query parameters may be introduced for querying.
They should reference the property and the operation if necessary.

- `brand=Adidas`: Property `brand` matches `Adidas`
- `min_colors=5`: Either property `colors` or the computed number of colors (e.g. the resource only includes an array of colors) needs to be greater than `5`
- `released_after=2020-02-02`: Release date needs to be after `2020-02-02`

TODO: snake_case or camelCase? I see 3 variants: `last_modified_after` (all snake case), `lastModified_after` (property camelcase as it should be in the response but otherwise snake case), `lastModifiedAfter` (all camel case)

Different types may have different interpretations of equality, or have their own set of operators.
For example`color=blue` may include any shades of blue and also match `aquamarine`. `max_order_status=PACKED` may include all items that are packed, in delivery or already delivered.

Use common terminology, e.g.

- negation: `not`
- value ranges: `max`, `min`
- dates: `before`, `after`

For basic querying capabilities that are not specific to a property but the whole resource the `q` parameter should be used.
Usually this is a simple text query, satisfying simple search needs that might cover a lot of use cases.

TODO: Not sure if we should allow simple text based query languages, such as `shirt AND short OR blouse`.

Query parameters should be combinable (e.g. `brand=Puma&color=blue`) and otherwise respond with a `400 Bad Request`.

Multiple values or options may be provided by using the query parameter multiple times (e.g. `brand=Adidas&brand=Puma` will search for brands Adidas OR Puma)

These query parameters must be documented with their possible values (ranges), semantics and interactions with other query parameters (e.g. multiple values form a logical _or_, but with other query parameters an _and_ connection).

More complex search or filter capabilities should introduce a separate endpoint that accepts a complex filter/query language as a JSON body.

`Note`{ label } Make sure that you add the query parameters to the to HAL links if necessary.

See also [Conventional query parameters](./1120_must-stick-to-conventional-query-parameters.md).
