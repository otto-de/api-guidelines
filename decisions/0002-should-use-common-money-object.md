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

#### Example

```json
{
  "price": 1239.95
}
```

### Option 1.3

As option 1.1, but instead of using an `integer` with format `int64`, use `string` containing euros and cents separated by a decimal point to force explicit conversion into a data type with sufficient precision in the programming language used to consume the API.

#### Example

```json
{
  "price": "1239.95"
}
```

`string` has been chosen as a type for amount because `number` is deserialized to an IEEE 754 float representation (see https://floating-point-gui.de/). The representation as float can lead to rounding and calculation errors. This is especially true for currencies with many decimal places (e.g., bitcoin). Example in Javascript:

```javascript
let a = 2.2
let b = 2.1
console.log(a+b) //logs 4.300000000000001
```

### Option 2.1

As option 1.1, but use a JSON object with separate properties for amount (as `integer` with format `int64`) and optional currency (as `string`) to allow for future support of multiple currencies.

Although currently not needed, a clear separation of currency and money amount is possible.
Easier to use in OpenAPI and AsyncAPI definitions, because one does not need to repeat the description of the money amount every time it is used in a property.

`currency` is optional and by default "EUR" and thus can be absent for most of OTTOs APIs. This reduces the payload for the current use cases.

#### Example

```json
{
  "price": {
    "amount": 123995,
    "currency": "EUR"
  }
}
```

### Option 2.2

As a mix of options 1.2 and 2.1.

#### Example

```json
{
  "price": {
    "amount": 1239.95,
    "currency": "EUR"
  }
}
```

### Option 2.3

As a mix of options 1.3 and 2.1.

#### Example

```json
{
  "price": {
    "amount": "1239.95",
    "currency": "EUR"
  }
}
```

## Decision

Option 2.2 is chosen as the best compromise between future-proofing and current use cases. It allows for a clear separation of amount and currency, while still being easy to use in OpenAPI and AsyncAPI definitions. The `otto:decimal` format ensures that the amount is represented with sufficient precision to avoid rounding errors. It is no breaking change for existing Partner APIs, which would be very difficult to communicate to partners.

## Consequences

Existing APIs will need to be updated to use the new money object format. This will require some effort and breaking changes, but it will lead to a more consistent and easier-to-use API landscape in the long run. As we cannot expect teams to update their incompatible APIs immediately, we will define this as a SHOULD rule, allowing teams to migrate their APIs at their own pace.

## Further reading

* [Async api guidelines community](https://otto-eg.atlassian.net/wiki/spaces/P20/pages/123274149/Async+api+guidelines+community#:~:text=Guideline%20missing%20for%20%E2%80%9Cmoney%E2%80%9D%20or%20%E2%80%9Cprice%E2%80%9D%20format)
* [otto-de GitHub Issue with comments](https://github.com/otto-de/api-guidelines/issues/29)
* [Zalando API guidelines](https://opensource.zalando.com/restful-api-guidelines/#173)

[rule-R100079]: ../api-guidelines/global/json/canonical-data-types/rules/should-use-common-otto-decimal-format.md




