---
id: R000062
---

# MUST support lists for multiple values of the same query parameter

Represent multiple values of the same query parameter as a single comma-separated list, for example `key=value1,value2`.

In OpenAPI, `key=value1,value2` can be represented as an array query parameter with `explode: false`.

```yaml
parameters:
  - in: query
    name: key
    explode: false
    schema:
      type: array
      items:
        type: string
```

::: warning
Don't represent multiple values by repeating the same query parameter, for example `key=value1&key=value2`.
:::