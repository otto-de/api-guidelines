---
id: Rxxxx
---

# SHOULD use the money object

As money amounts are very common in our APIs (checkout, order-positions, transactional-communication), we would like to 
introduce a rule that ensures that money amounts are always formatted the same.

TODO Link to rules (otto:currency, otto:decimal)

## Schema definition

```yaml
title: Money
description: Common format for money amounts.
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

### Example 
```json
{
  "price": {"amount":  99.95, "currency": "EUR" /* optional, defaults to EUR */}
}
```
