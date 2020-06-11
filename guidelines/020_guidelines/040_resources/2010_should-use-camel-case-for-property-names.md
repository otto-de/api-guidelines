---
type: SHOULD
id: R004010
---

# use camelCase for property names

Property names of JSON objects should be formatted in camel case.

## DO

````json
{
    "name": "Peter",
    "jobDescription": "product manager",
    "vacationDays": 37
}
````

## DON'T

````json
{
    "NAME": "Peter",
    "job-description": "product manager",
    "vacationdays": 37
}
````
