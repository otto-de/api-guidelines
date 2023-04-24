---
id: R100030
---

# MUST use common sorting query parameter

If simple sorting of the results is possible, the `sort` query parameter must be used.

- The parameter accepts a property and an optional direction suffix (e.g. `sort=price:desc`).
  The direction suffix can be `asc` or `desc` in any word case, i.e. `desc`. `dEsC`, `DESC` are all valid.
- The property name should correspond to the name used in the resource representation (e.g. `sort=price.grossValue`).
- Multiple sorting criteria [must be provided as a comma-separated list](../../naming-conventions/rules/must-support-lists-for-multiple-values-of-the-same-parameter.md) (e.g. `sort=price:asc,name:desc`).
- Services do not need to support all resource properties to be used for sorting and must respond with a `400 Bad Request` if they do not.
- If the use case cannot be expressed using this simple sorting parameter, you should introduce a separate query parameter or a separate endpoint that accepts a complex filter/query language as a JSON body instead of a query parameter.

::: info Info
Make sure to add the `sort` parameter to the to HAL links if necessary.
:::

::: references

- [MUST stick to conventional query parameters](../../naming-conventions/rules/must-stick-to-conventional-query-parameters.md)
  :::
