---
id: R100031
---

# MUST use query parameters for basic search or filtering

Resource-specific query parameters may be introduced for querying.
They should reference the property and the operation if necessary.

- `brand=Adidas`: Property `brand` matches `Adidas`
- `minColors=5`: Either property `colors` or the computed number of colors (e.g. the resource only includes an array of colors) needs to be greater than `5`
- `releasedAfter=2020-02-02`: Release date needs to be after `2020-02-02`

Different types may have different interpretations of equality, or have their own set of operators.
For example`color=blue` may include any shades of blue and also match `aquamarine`. `maxOrderStatus=PACKED` may include all items that are packed, in delivery or already delivered.

Use common terminology, e.g.

- negation: `not`
- value ranges: `max`, `min`
- dates: `before`, `after`

For basic querying capabilities that are not specific to a property but the whole resource the `q` parameter should be used.
Usually this is a simple text query, satisfying simple search needs that might cover a lot of use cases.

Query parameters should be combinable (e.g. `brand=Puma&color=blue`) and otherwise respond with a `400 Bad Request`.

If multiple values need to be supported, they [should be provided as a comma-separated list](../../naming-conventions/rules/must-support-lists-for-multiple-values-of-the-same-parameter.md) (e.g. `brand=Adidas,Puma`).

These query parameters must be documented with their possible values (ranges), semantics and interactions with other query parameters (e.g. multiple values form a logical _or_, but with other query parameters an _and_ connection).
This may be obvious for single valued properties, but not necessarily for lists (e.g. `tags=sporty,retro`)

::: info Info
Make sure to add the query parameters to the HAL links if necessary.
:::
::: references

- [MUST stick to conventional query parameters](../../naming-conventions/rules/must-stick-to-conventional-query-parameters.md)
  :::
