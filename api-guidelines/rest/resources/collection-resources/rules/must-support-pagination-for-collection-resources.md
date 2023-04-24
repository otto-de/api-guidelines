---
id: R100023
---

# MUST support pagination for collection resources

Any sufficiently large collection resource must support pagination to handle the server load and support the client processing patterns.

Offset or limit-based pagination allows the navigation of the result by specifying an offset.
This is the most common approach for pagination, especially for traditional RDBM systems.

PROs

- well-known pattern
- wide support for server and client

CONs

- assumes an immutable result set
- not suitable for frequently updated collections as the next paging response might contain previous elements or skip elements if elements were inserted or deleted in the meantime

::: references

- [MUST stick to conventional query parameters](../../naming-conventions/rules/must-stick-to-conventional-query-parameters.md)
  :::
