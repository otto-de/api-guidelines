---
type: SHOULD
id: R004040
---

# represent maps as objects with keys being their property names

Strive to model your schema consumer-agnostic. That implies:

- don't expect your consumer to use a certain technology, library or framework
- don't fulfill consumer-specific requirements such as indexing data, as other consumers have different requirements.

DON'T

```json
{
  "availableVariantsByColor": [
    {
      "key": "red",
      "value": ["L", "XL"]
    },
    {
      "key": "blue",
      "value": ["S", "XL"]
    },
    {
      "key": "green",
      "value": ["L"]
    }
  ]
}
```

This example violates both of the above rules because:

- the data is grouped by color. Another consumer might require the data to be grouped by size
- the dictionary representation of data uses a custom meta-schema instead of native json objects.

DO

```json
{
  "availableVariants": [
    { "color": "red", "size": "L" },
    { "color": "red", "size": "XL" },
    { "color": "blue", "size": "S" },
    { "color": "blue", "size": "XL" },
    { "color": "green", "size": "L" }
  ]
}
```

If the consumer is not able to create a backend for the frontend, the API provider can provide a subresource e.g. `[...]/available-variants`, which allows filtering and sorting in different ways.
