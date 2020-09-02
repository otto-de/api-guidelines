---
type: SHOULD
id: R004040
---

# represent maps as objects with keys being their property names

Strive to model map-like data structures as JSON objects, with map's keys encoded as property names and the values as property values of the JSON object.

DO

````json
{
    "availableSizesByColor": {
      "red": ["L", "XL"],
      "blue": ["S", "XL"],
      "green": ["L"]
    }
}
````

DON'T

````json
{
    "availableSizesByColor": [
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
````

`Note`{ label } The map keys don't need to follow the rule for using camelCase for property names and can follow whatever format is natural to their domain.

That means, a map of currencies to prices could be encoded like this:

```json
{
  "translations": {
    "de": "Farbe",
    "en-US": "color",
    "en-GB": "colour",
    "eo": "koloro",
    "nl": "kleur"
  }
}
```
