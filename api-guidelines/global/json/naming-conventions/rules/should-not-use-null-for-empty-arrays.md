---
id: R004060
---

# SHOULD NOT use null for empty arrays

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
