---
id: R100079
---

# SHOULD use common `otto:decimal` format

When using JSON properties for calculations requiring a high level of precision, it is not recommended to rely on floating point arithmetic.
Instead, using the type `number` with format `otto:decimal` allows for custom conversion logic without losing precision.
The conversion logic is based on application programming language and does not rely on the [OpenAPI `number` data type][openapi-data-types] being automatically converted to `float` or `double`.
Instead, a carefully chosen JSON decoder should be used that uses exact formats like Java's `BigDecimal`.
See [Stack Overflow][stack-overflow] for more information.

Examples for the `otto:decimal` format being used in an `otto:money` object with EUR as the default `otto:currency-code`:


`0.01` = 0 Euros and 1 Cent

`23.0` or `23` = 23 Euros and 0 Cent

`45.60` or `45.6` = 45 Euros and 60 Cent

`-789.01` = negative 789 Euros and 1 Cent

`1234.5678` = 1234 Euros and 56.78 Cent


[openapi-data-types]: https://spec.openapis.org/oas/v3.1.0.html#data-types
[stack-overflow]: https://stackoverflow.com/questions/3730019/why-not-use-double-or-float-to-represent-currency/3730040#3730040
