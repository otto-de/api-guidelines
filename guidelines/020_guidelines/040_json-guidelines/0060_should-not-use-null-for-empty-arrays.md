---
type: SHOULD
id: R004060
---

# not use null for empty arrays

Arrays should be empty and not null if there is no data to provide.

Do:

````json
{
    "entries": []
}
````

Don't:

````json
{
    "entries": null
}
````
