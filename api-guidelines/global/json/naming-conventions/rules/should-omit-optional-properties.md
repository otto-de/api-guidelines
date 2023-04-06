---
id: R004021
---

# SHOULD omit optional properties

Although [null and absent properties are semantically equivalent](/guidelines/r004020), optional properties should be omitted instead of null whenever applicable.

DO

```json
{
  "paymentMethod": "INVOICE_SINGLE"
}
```

DON'T

```json
{
  "paymentMethod": "INVOICE_SINGLE",
  "installments": null
}
```
