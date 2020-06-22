---
type: SHOULD
id: R000065
---

# evaluate onsite experiment (OnEx) headers

Endpoints should evaluate on-site experiment headers and, if the experiment is applicable to the endpoint, change the response accordingly.

Examples:

```http
GET /special-offers HTTP/1.1
X-ONEXV3-EXP-E123: StatusQuo

# server returns the old variant
200 OK
{
    "offers": [
        { "title" : "10 % off, only today!" }
    ]
}
```

```http
GET /special-offers HTTP/1.1
X-ONEXV3-EXP-E123: LessUrgent

# server returns the new variant for the test group
200 OK
{
    "offers": [
        { "title" : "10 % off, only this week!" }
    ]
}
```
