# [0001] New API guideline rule for `otto:decimal` format

- Status: `proposed`
- Decided by: <jens.fischer@otto.de>, <max.edenharter@otto.de>
- Date: 2025-05-19

## Context

We want to introduce a new API guideline rule for defining the data type and format for higher precision decimals as used e.g. in calculation with monetary amounts. This rule will be part of the JSON chapter applicable for both synchronous REST APIs and asynchronous Events.

Not having such a format could lead to lose precision when reyling on default conversion from `number` to `double` or `float` as described at [Zalando's API guidelines][zalando-notes].

## Options

### Option 1

Keep using formats `double` or `float` and accept that naive implementations that implicitly accept the default conversion run at risk of introducing calculation errors.

### Option 2

Use a custom format `otto:decimal` that forces implementation to make informed decisions how to convert it.

## Decision

Introduce [new API guideline rule][rule-R100079]

## Consequences

This new format is defined as a SHOULD rule, giving teams the option to benefit from less risky default type conversion.


[zalando-notes]: https://opensource.zalando.com/restful-api-guidelines/#_notes
[rule-R100079]: ../api-guidelines/global/json/canonical-data-types/rules/should-use-common-otto-decimal-format.md
