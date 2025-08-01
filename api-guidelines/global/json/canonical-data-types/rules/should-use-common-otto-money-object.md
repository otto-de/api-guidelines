---
id: R100080
---

# SHOULD use common `otto:money` object

As monetary amounts are commonly used in our APIs, for example, in the `Checkout`, `Order management`, and `Transactional communication` API, this guideline aims to ensure that monetary amounts are always formatted in the same way.

The defined money object directly benefits from existing common data types such as [otto:decimal][otto-decimal] and [otto:currency-code][otto-currency-code].

## Schema definition

```yaml
title: Money
description: Common format for monetary amounts.
type: object
required:
  - amount
properties:
  amount:
    type: number
    format: otto:decimal
    example: 99.95
    description: The numerical value of the monetary amount.
  currency:
    type: string
    description: |
      The currency related to the monetary amount, specified as a three-letter currency code as defined in ISO 4217.
      Defaults to `EUR`. 
    format: otto:currency-code
    x-extensible-enum:
      - value: EUR
        description: The currency code for Euro, the official currency of the eurozone.
```

## Example

```json
{
  "price": {
    "amount":  99.95, 
    "currency": "EUR"
  }
}
```

[otto-decimal]: ./should-use-common-otto-decimal-format.md
[otto-currency-code]: ./must-use-common-data-formats.md
