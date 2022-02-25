---
type: SHOULD
id: R000035
---

# use extensible enums

Enums (represented by `enum` keyword) are not extensible in OpenAPI. Adding a new enum value is considered as a breaking change if used in responses.

Clients need to be prepared that new enum values may be added to an enum without creating a new version. The extension property `x-extensible-enum` has been introduced to clearly signal this intention. The `x-extensible-enum` property contains an open list of values. Each value may have the following properties:

| Property    | Required | Default value | Description                                                   |
|-------------|----------|---------------|---------------------------------------------------------------|
| value       | yes      | n/a           | The extensible enum value. Must adhere to the specified type. |
| description | yes      | n/a           | Describes the semantic meaning of the value.                  |
| deprecated  | no       | false         | A boolean value specifying the deprecation state of this enum value. |
| preview     | no       | false         | A boolean value specifying the preview state of this enum value.     |

`x-extensible-enum` should be used instead of `enum` unless the following applies:

- The service providing the API owns the enum values. It is part of its domain knowledge.
- The enum represents a closed set in the business domain that will never be extended, even in the future.

Example usage:

```yaml
PaymentType:
  type: string
  description: Describes the payment further.  
  x-extensible-enum:
    - value: CREDIT_CARD
      description: Credit card payment
    - value: INVOICE
      description: Payment by the customer by bank transfer.
      deprecated: true
    - value: DIRECT_DEBIT
      description: Direct debit from a bank account.
      preview: true
```

::: warning
Do not use the `enum` keyword in combination with `x-extensible-enum`.
:::

::: info
Note that the "x-extensible-enum" extension property is ignored by most OpenAPI 3.0 tools. When a client needs to process the different values, the logic must be added manually. This means extra work for the clients, but guarantees that clients automatically generated with OpenAPI 3.0 tooling do not break when adding new values.
:::

::: references

- [SHOULD prefer compatible extensions](#R000028)
- [`enum` in OpenAPI 3.0 Specification](https://swagger.io/docs/specification/data-models/enums/)
- [Zalando's rule for `x-extensible-enum`](https://opensource.zalando.com/restful-api-guidelines/#112)
