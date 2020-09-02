---
type: SHOULD NOT
id: R004060
---

# use null for empty arrays

Arrays should be empty and not null if there is no data to provide.

DO

````json
{
    "entries": []
}
````

DON'T

````json
{
    "entries": null
}
````
