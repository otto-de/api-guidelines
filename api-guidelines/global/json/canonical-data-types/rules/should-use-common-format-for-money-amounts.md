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
    type: string
    description: The money amount without currency. "." is used as a decimal separator.
    pattern: ^\d+(\.\d+)?$
  currency:
    type: string
    description: The alphabetic currency code for the amount as defined in ISO 4217.
    enum:
      - "EUR"
    default: "EUR"
    pattern: "^[A-Z]{3}$"
```

### Example 
```json
{
  "price": {"amount":  "1.45", "currency": "EUR" /* optional, defaults to EUR */}
}
```
