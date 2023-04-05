---
id: R000062
---

# MUST support lists for multiple values of the same query parameter

If multiple values need to be supported, they should be provided as a comma-separated list (e.g. `key=value1,value2`).

Multiple occurrences of the same parameter in the query string (e.g. `key=value1&key=value2`) must not be promoted, prefer lists instead.
