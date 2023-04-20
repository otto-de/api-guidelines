---
id: R004050
---

# SHOULD pluralize array names

Arrays should have pluralized names whereas objects should be named in singular.

DO

````json
{
    "imageData": {
        "imageBrand": "i.otto.de/i/otto/2212",
        "imageShop": "i.otto.de/i/otto/86"
    },
    "keys": ["ffe6372af30", "d8e6372af40"]
}
````

DON'T

````json
{
    "images": {
        "imageBrand": "i.otto.de/i/otto/2212",
        "imageShop": "i.otto.de/i/otto/86"
    },
    "keyCollection": ["ffe6372af30", "d8e6372af40"]
}
````
