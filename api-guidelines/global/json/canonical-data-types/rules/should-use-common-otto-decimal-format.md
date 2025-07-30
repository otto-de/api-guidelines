---
id: R100079
---

# SHOULD use common `otto:decimal` format

When using JSON properties for calculations where a high level of precision is required, it is not an option to rely on floating point arithmetic. Instead, using the type `number` with format `otto:decimal` allows for custom conversion logic without losing precision.

This logic is based on application programming language and does not rely on [OpenAPI `number` data type][openapi-data-types] being automatically converted to `float` or `double`. Instead, a carefully chosen JSON decoder should be used that uses exact formats like Java’s `BigDecimal`.
See [Stack Overflow][stack-overflow] for more information.


Examples for `otto:decimal` format used in `otto:money` object with default `otto:currency-code` of EUR:

`0.01` = 0 Euros and 1 Cent

`23.0` or `23` = 23 Euros and 0 Cent

`45.60` or `45.6` = 45 Euros and 60 Cent

`-789.01` = negative 789 Euros and 01 Cent

`1234.5678` = 1234 Euros and 56.78 Cent


[openapi-data-types]: https://spec.openapis.org/oas/v3.1.0.html#data-types
[stack-overflow]: https://stackoverflow.com/questions/3730019/why-not-use-double-or-float-to-represent-currency/3730040#3730040
