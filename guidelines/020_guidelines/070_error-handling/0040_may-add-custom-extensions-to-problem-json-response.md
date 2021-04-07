---
type: MAY
id: R000040
---

# add custom extensions to `problem+json` response

As described in [section 3.2](https://tools.ietf.org/html/rfc7807#section-3.2) of [RFC 7807](https://tools.ietf.org/html/rfc7807) "problem type definitions may extend the problem details object with additional members."
In general, clients must ignore any extension they do not recognize.
This allows problem types to evolve and include additional information in the future.

There may be use cases, where you need to convey more information than the standard elements of a problem detail allow.
In this case client and server can agree on adding a custom extension to support this information to be conveyed.
For example, an additional `link` attribute below the `path` attribute might contain the URL of the resource causing the validation error - in the example below, a specific item in the shopping cart:

```json
{
  "type": "https://api.otto.de/api-docs/errors/ValidationError",
  "title": "Your request cannot be validated.",
  "status": 400,
  "validationErrors": [
    {
      "in": "body",
      "path": "$.cart.variationId[3].amount",
      "link": "/checkouts/dcd1d70a-71c6-4350-bad1-35b1026ae47e/items/8b957550-faac-4c86-90a1-7becbe8881ec",
      "details": [
        {
          "key": "checkout.variation.maxReached",
          "message": "Maximum allowed amount is 1"
        }
      ]
    }
  ]
```

::: info
If a custom extension is developed it is mandatory to add a corresponding error type documentation.
:::
