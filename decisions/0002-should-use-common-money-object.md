# [0002] Use `otto:money` object to specify monetary amounts in APIs

- Status: `proposed`
- Decided by: <jens.fischer@otto.de>, <max.edenharter@otto.de>
- Date: 2025-05-19

## Context

Currently, there is no common format for monetary amounts across the OTTO APIs. This leads to inconsistencies and makes it harder to use the APIs in a consistent way. As teams don't share a common format for monetary amounts, they need to implement custom format conversions for use cases spanning multiple APIs from different teams. This is especially true for APIs that are used in the context of payments, orders, and pricing.

For example, the OTTO Consumer REST APIs with the context IDs `product`, `checkout` and `order-position-items` define properties that refer to eurocents without explicitly mentioning the currency. For monetary amounts, they use one of the formats `string`, `number` or `integer` (with format `int64`), while Partner APIs from OTTO Market use a JSON object that contains an amount property using `number` and a currency property using `string`.

## Options

### Option 1

As OTTO only uses euro as currency, there is currently no need for a separate currency property.
In order to prevent rounding errors in calculations, represent the monetary amount in eurocents as an `integer`, with format `int64`.

Example:

```json
{
  "price": 123995
}
```

### Option 2

Represent the monetary amount as a `number` containing euros and cents separated by a decimal point according to the common format [`otto:decimal`][rule-R100079] to prevent accidental rounding errors.

Example:

```json
{
  "price": 1239.95
}
```

### Option 3

Represent the monetary amount as a `string` containing euros and cents separated by a decimal point to force explicit conversion into a data type with sufficient precision in the programming language used to consume the API.

Example:

```json
{
  "price": "1239.95"
}
```

The type `string` is the preferred option as a type for the `amount` property because the type `number` is deserialized to an IEEE 754 float representation (see https://floating-point-gui.de/).
The representation as float can lead to rounding and calculation errors.
This is especially true for currencies with many decimal places (e.g., bitcoin).

Example in Javascript:

```javascript
let a = 2.2
let b = 2.1
console.log(a+b) //logs 4.300000000000001
```

### Option 4

Use a JSON object with separate properties:

- Amount as `integer` with format `int64`
- (Optional) Currency as `string` 
  
This allows for future support of multiple currencies.

Although currently not needed, a clear separation of currency and monetary amount is possible.
It is easier to use in OpenAPI and AsyncAPI definitions, because it is not necessary to repeat the description of the monetary amount every time it is used in a property.

The `currency` property is optional and defaults to the value `EUR`. It can thus be omitted for most OTTO APIs. This reduces the payload for the current use cases.

Example:

```json
{
  "price": {
    "amount": 123995,
    "currency": "EUR"
  }
}
```

### Option 5

Use a JSON object `price` with separate properties:

- Amount as `number` containing euros and cents separated by a decimal point according to the common format [`otto:decimal`][rule-R100079] 
- Currency as `string` 

This option prevents accidental rounding errors and allows for future support of multiple currencies.

Example:

```json
{
  "price": {
    "amount": 1239.95,
    "currency": "EUR"
  }
}
```

### Option 6

Use a JSON object `price` with separate properties:

- Amount as `string` containing euros and cents separated by a decimal point according to the common format [`otto:decimal`][rule-R100079] 
- Currency as `string` 

Example:

```json
{
  "price": {
    "amount": "1239.95",
    "currency": "EUR"
  }
}
```

## Decision

Option 5 is chosen as the best compromise between being future-proof and the current use cases.
It allows for a clear separation of monetary amount and currency, while it is still easy to use in OpenAPI and AsyncAPI definitions.
The `otto:decimal` format ensures that the amount is represented with sufficient precision to avoid rounding errors.
It is not a breaking change for existing Partner APIs.

## Consequences

Existing APIs need to be updated to use the new money object format.
This requires some effort and breaking changes, but it will lead to a more consistent and easier-to-use API landscape in the long run.
As teams cannot be expected to update their incompatible APIs immediately, the related rule is defined as a SHOULD rule, allowing teams to migrate their APIs at their own pace.

## Further reading

* [Async API guidelines community](https://otto-eg.atlassian.net/wiki/spaces/P20/pages/123274149/Async+api+guidelines+community#:~:text=Guideline%20missing%20for%20%E2%80%9Cmoney%E2%80%9D%20or%20%E2%80%9Cprice%E2%80%9D%20format)
* [otto-de GitHub Issue with comments](https://github.com/otto-de/api-guidelines/issues/29)
* [Zalando API guidelines](https://opensource.zalando.com/restful-api-guidelines/#173)

[rule-R100079]: ../api-guidelines/global/json/canonical-data-types/rules/should-use-common-otto-decimal-format.md




