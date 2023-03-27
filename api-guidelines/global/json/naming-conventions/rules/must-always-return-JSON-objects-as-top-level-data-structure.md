---
type: MUST
id: R004030
reviewType: automatic
---

# always return JSON objects as top-level data structure

The top-level data structure of your JSON response should always be a JSON object and not, for example, an array.

DO

```json
{
  "searchSuggestions": ["gaming pc", "gaming laptop", "gaming monitor"]
}
```

DON'T

```json
["gaming pc", "gaming laptop", "gaming monitor"]
```
