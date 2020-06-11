---
type: MAY
id: R000040
---

# add custom extensions to `problem+json` response

The standard members of a problem detail consist of type, title, status, detail and instance.

```json
{
  "type": "https://example.com/probs/out-of-credit",
  "title": "You do not have enough credit.",
  "status": 400,
  "detail": "Your current balance is 30, but that costs 50.",
  "instance": "/account/12345/msgs/abc"
}
```

Usually the client MUST ignore any extension that they don't recognize. This allows problem types to evolve and include additional information in the future.

There may be usecases, where you need to convey more information than the standard member of a problem detail allows. In this case client and server can agree on adding a custom extension to support these information to be conveyed. See [Input Validation Errors](./guidelines/020_guidelines/030_http/4050_must-use-extension-for-input-validation-errors.md) for an example.
