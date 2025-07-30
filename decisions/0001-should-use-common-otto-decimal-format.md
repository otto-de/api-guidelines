# [0001] Use `otto:decimal` format for higher precision in amounts specified in APIs

- Status: `proposed`
- Decided by: <jens.fischer@otto.de>, <max.edenharter@otto.de>
- Date: 2025-05-19

## Context

Using a unified format for decimals supports precision when relying on default conversion from `number` to `double` or `float`, as described in the [Zalando API guidelines][zalando-notes].
Implementing a new API guideline to define the data type and format can help with higher precision in decimals as used, for example, in calculation with monetary amounts.
This rule will be part of the JSON chapter applicable for both synchronous REST APIs and asynchronous events.

Not having such a unified format could lead to losing precision when relying on default conversion from `number` to `double` or `float`.

## Options

### Option 1

Keep using formats `double` or `float` and accept that naive implementations that implicitly accept the default conversion run at risk of introducing calculation errors.

### Option 2

Use a custom format `otto:decimal` that enforces making informed decisions on how to convert it during implementation.

## Decision

Introduce [new API guideline rule][rule-R100079].

## Consequences

This new format is defined as a SHOULD rule, giving teams the option to benefit from less risky default type conversion.


[zalando-notes]: https://opensource.zalando.com/restful-api-guidelines/#_notes
[rule-R100079]: ../api-guidelines/global/json/canonical-data-types/rules/should-use-common-otto-decimal-format.md
