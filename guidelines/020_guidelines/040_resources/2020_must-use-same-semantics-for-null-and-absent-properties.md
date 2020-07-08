---
type: MUST
id: R004020
---

# use same semantics for null and absent properties

While JSON does allow null values, in the scope of this API, nullable properties that are _explicitly_ null and those that are absent should be considered semantically equivalent.

So this object:

```json
{
  "name": "Peter",
  "age": null
}
```

should be considered semantically equivalent to this object:

```json
{
  "name": "Peter"
}
```

In order to observe this rule, there are either unrequired and nullable or required and not nullable properties. See this table:

| required | nullable | {}  | {"property": null} | allowed by this rule |
|----------|----------|-----|--------------------|----------------------|
| true     | true     | no  | yes                | no                   |
| false    | true     | yes | yes                | yes                  |
| true     | false    | no  | no                 | yes                  |
| false    | false    | yes | no                 | no                   |

**Note**: The exception to this rule are `PATCH` endpoints (see: [**[MUST]** use HTTP methods correctly](2010_must-use-http-methods-correctly.md)). Regarding the example above, a `PATCH` request with the first object would set the `name` to Peter and the `age` to null, whereas a request with the second object would only modify the `name`.