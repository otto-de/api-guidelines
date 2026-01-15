---
id: R004010
---

# SHOULD use camelCase for property names

Property names of JSON objects should be formatted in camelCase, and digits should be avoided.

DO

````json
{
    "name": "John",
    "jobDescription": "product manager",
    "vacationDays": 37,
    "entryDate": "2023-01-15"
}
````

DON'T

````json
{
    "NAME": "John",
    "job-description": "product manager",
    "vacationdays": 37,
    "1stDay": "2023-01-15"
}
````
