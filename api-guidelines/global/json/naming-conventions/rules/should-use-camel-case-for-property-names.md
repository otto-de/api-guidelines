---
id: R004010
---

# SHOULD use camelCase for property names

Property names of JSON objects should be formatted in camelCase and avoid digits.

DO

````json
{
    "name": "John",
    "jobDescription": "product manager",
    "vacationDays": 37
}
````

DON'T

````json
{
    "NAME": "John",
    "job-description": "product manager",
    "vacationdays": 37
}
````
