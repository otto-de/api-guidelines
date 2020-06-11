---
type: SHOULD
id: R004040
---

# represent maps as objects with keys being their property names

Strive to model map like data structures as JSON objects with the keys of the map encoded as the property names and the values being the property values of the JSON object.

## DO

````json
{
    "availableSizesByColor": {
      "red": ["L", "XL"],
      "blue": ["S", "XL"],
      "green": ["L"]
    }
}
````

## DON'T

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

Note that the map keys need not follow the rule for using camel case for property names and can follow whatever format is
natural to their domain.

I.e. a map of currencies to prices could be encoded as such
as

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
