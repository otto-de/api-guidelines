---
type: MAY
id: R000035
---

# use extensible enums

Enums (represented by `enum` keyword) are not extensible in OpenAPI 3.0. Adding a new enum value is considered as a breaking change.

Converting the enum to an additional API endpoint which provides the possible values dynamically, is one way of mitigating this problem. For example a previously defined enum `PaymentType` may be converted to an API endpoint delivering all known payment types (i.e. `/payment-types`).

Another possibility is to prepare clients that new enum values may be added to an enum. The extension property `x-extensible-enum` has been introduced to clearly signal this intention.

Example:

```yaml
PaymentType:
  type: string
  description: |
    Description of the extended enum with a short description of the known values. 
      - "CREDIT_CARD" - Credit card payment
      - "INVOICE" - Payment by the customer by bank transfer
      - "DIRECT_DEBIT" - Deducting directly from a bank account
  x-extensible-enum:
    - CREDIT_CARD
    - INVOICE
    - DIRECT_DEBIT
```

::: warning
Do not use the `enum` keyword in combination with `x-extensible-enum`.
:::

::: info
Please be aware, that the `x-extensible-enum` extension property will be ignored by most of the OpenAPI 3.0 tools. If a client needs to handle the various values, logic has to be added manually. While this introduces additional work for clients, it guarantees that clients automatically generated with OpenAPI 3.0 tooling do not break when adding new values.
:::
