---
type: SHOULD
id: R100039
---

# define default and maximum page size

Every collection resource should define and document

- a reasonable default page size (`defaultPageSize`)
- a maximum page size (`maxPageSize`)

which can be used as the `pageSize` query parameter.

::: references

- [MUST stick to conventional query parameters](@guidelines/R000049).
  :::
