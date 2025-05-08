---
id: XXXX
---

# Should use common format for money amounts

As money amounts are very common in our APIs (checkout, order-positions, transactional-communication), we would like to 
introduce a rule that ensures that money amounts are always formatted the same.

## Schema

The schema definition is as follows:

```yaml
title: Money
description: Common format for money amounts.
type: object
required:
  - amount
properties:
  amount:
    type: number
    format: decimal
    example: 99.95
    description: The money amount without currency.
  currency:
    type: string
    description: The alphabetic currency code for the amount as defined in ISO 4217.
    format: otto:currency-code
    x-extensible-enum:
      - value: EUR
        description: Euro
```

### Example 
```json
{
  "price": {"amount":  "1.45", "currency": "EUR" /* optional, defaults to EUR */}
}
```
