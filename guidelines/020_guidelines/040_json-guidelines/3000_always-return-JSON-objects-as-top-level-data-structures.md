---
type: must
---

The top-level data structure of your JSON response should always be a JSON object and not, for example, an array.

Do:

```json
{ 
  "searchSuggestions": ["gaming pc", "gaming laptop", "gaming monitor"] 
}
```

Don't:

```json
["gaming pc", "gaming laptop", "gaming monitor"]
```
