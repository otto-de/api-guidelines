---
type: MUST
id: R000062
---

# support lists for multiple values of the same query parameter

If multiple values need to be supported, they should be provided as a comma-separated list (e.g. `key=value1,value2`).

::: info
Must not promote usage of multiple occurrence of the same parameter in the query string (e.g. `key=value1&key=value2`), prefer lists instead.
:::
