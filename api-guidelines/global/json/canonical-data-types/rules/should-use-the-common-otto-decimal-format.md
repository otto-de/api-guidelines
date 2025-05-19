---
id: R100079
---

# SHOULD use the common `otto:decimal` format

When a business case processing JSON properties calls for a higher precision as available by using floats by default, using type `number` with format `otto:decimal` allows for custom conversion logic based on application programming language and not relying on [OpenAPI `number` data type][openapi-data-type] being automaticaly converted to `float` or `double`.


Examples for correct representations as monetary amounts (in EUR):

`42.20` or `42.2` = 42 Euros, 20 Cent

`0.23` = 23 Cent

`42.0` or `42` = 42 Euros

`1024.42` = 1024 Euros, 42 Cent

`1024.4225` = 1024 Euros, 42.25 Cent

Make sure that you don’t convert a field of type `number` using the `otto:decimal` format to `float` / `double` types when implementing this interface in a specific language or when doing calculations. Otherwise, you might lose precision. Instead, use exact formats like Java’s `BigDecimal`. See [Stack Overflow][stack-overflow] for more info.

[openapi-data-types]: https://spec.openapis.org/oas/v3.1.0.html#data-types
[stack-overflow]: https://stackoverflow.com/questions/3730019/why-not-use-double-or-float-to-represent-currency/3730040#3730040
