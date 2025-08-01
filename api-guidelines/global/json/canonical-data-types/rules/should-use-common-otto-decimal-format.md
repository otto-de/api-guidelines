---
id: R100079
---

# SHOULD use common `otto:decimal` format

When using JSON properties for calculations requiring a high level of precision, it is not recommended to rely on floating point arithmetic.
Instead, using the type `number` with format `otto:decimal` allows for custom conversion logic without losing precision.
The conversion logic is based on application programming language and does not rely on the [OpenAPI `number` data type][openapi-data-types] being automatically converted to `float` or `double`.
Instead, a carefully chosen JSON decoder should be used that uses exact formats like Java's `BigDecimal`.
See [Stack Overflow][stack-overflow] for more information.

Examples for the `otto:decimal` format:

Representing fractional values between -1 and 1

```json
{
  "value": 0.01
}
```

Representing whole numbers (integers)

```json
{
  "count": 23
}
```

Example of the [`otto:money` object](./should-use-common-otto-money-object.md) for monetary amounts

```json
{
  "price": {
      "amount": 45.60,
      "currency": "EUR"
  }
}
```

Representing negative values


```json
{
  "temperature": -23.4
}
```

Representing values with multiple decimal places

```json
{
  "weight": 12.345
}
```


[openapi-data-types]: https://spec.openapis.org/oas/v3.1.0.html#data-types
[stack-overflow]: https://stackoverflow.com/questions/3730019/why-not-use-double-or-float-to-represent-currency/3730040#3730040