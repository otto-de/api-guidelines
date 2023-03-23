---
type: MUST
id: R004020
---

# use same semantics for null and absent properties

If a property is `nullable` and `not required`, a property `null` value and an absent property must be considered semantically equivalent.

So this object with `null property value`:

```json
{
  "name": "John",
  "age": null
}
```

should be considered semantically equivalent to this object with `absent property`:

```json
{
  "name": "John"
}
```

::: info Info
`PATCH` endpoints are an exception to this rule (see [MUST use HTTP methods correctly](R000007)). Referring to the example above, a `PATCH` request with the first object would set the `name` to `John` and the `age` to `null`, whereas a request with the second object would only modify the `name`.
:::
