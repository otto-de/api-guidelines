---
id: R000035
---

# SHOULD use extensible enums

Enums (represented by `enum` keyword) are not extensible in JSON schema. Adding a new enum value is considered as a breaking change if used in responses.

Clients need to be prepared that new enum values may be added to an enum without creating a new version. The extension property `x-extensible-enum` has been introduced to clearly signal this intention. The `x-extensible-enum` property contains an open list of values. Each value may have the following properties:

| Property    | Required | Default value | Description                                                          |
| ----------- | -------- | ------------- | -------------------------------------------------------------------- |
| value       | yes      | n/a           | The extensible enum value. Must adhere to the specified type.        |
| description | yes      | n/a           | Describes the semantic meaning of the value.                         |
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

::: warning Important
Do not use the `enum` keyword in combination with `x-extensible-enum`.
:::

::: info Info
Note that the "x-extensible-enum" extension property is ignored by most tools. When API clients need to process the different values, the logic must be added manually. This results in extra work for the consumers, but guarantees that automatically generated clients do not break when adding new values.
:::

::: references

- [SHOULD prefer compatible extensions](./should-prefer-compatible-extensions.md)
- [`enum` in JSON Schema](http://json-schema.org/understanding-json-schema/reference/generic.html#enumerated-values)
- [Zalando's rule for `x-extensible-enum`](https://opensource.zalando.com/restful-api-guidelines/#112)
