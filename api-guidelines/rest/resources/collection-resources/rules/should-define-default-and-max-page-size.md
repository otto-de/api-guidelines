---
id: R100039
---

# SHOULD define default and maximum page size or limit

Every collection resource should define and document

- a reasonable default page size or limit (`defaultPageSize` or `defaultLimit`)
- a maximum page size or limit (`maxPageSize` or `maxLimit`)

which can be used as the `pageSize` or `limit` query parameter.

::: references

- [MUST stick to conventional query parameters](../../naming-conventions/rules/must-stick-to-conventional-query-parameters.md).
  :::
