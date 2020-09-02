---
type: SHOULD
id: R004021
---

# omit optional properties

Although [null and absent properties are semantically equivalent](./guidelines/020_guidelines/050_naming-conventions/2020_must-use-same-semantics-for-null-and-absent-properties.md), optional properties should be omitted instead of null whenever applicable.

DO

````json
{
    "paymentMethod": "INVOICE_SINGLE"
}
````

DON'T

````json
{
    "paymentMethod": "INVOICE_SINGLE",
    "installments": null
}
````
