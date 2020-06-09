---
type: should
---

# use camelCase for property names

Property names of JSON objects should be formatted in camel case.

Do:

````json
{
    "name": "Peter",
    "jobDescription": "product manager",
    "vacationDays": 37
}
````

Don't

````json
{
    "NAME": "Peter",
    "job-description": "product manager",
    "vacationdays": 37
}
````
