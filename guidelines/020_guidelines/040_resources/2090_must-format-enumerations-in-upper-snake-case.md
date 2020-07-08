---
type: MUST
id: R004090
---

# format enumerations in UPPER_SNAKE_CASE

In order to be able to easily distinguish between values and properties, it is best practice to write enumerations in UPPER_SNAKE_CASE format.

## DO

````json
{
    "eventType": "EMAIL",
    "clientStatus": "STOPPED_AFTER_ERROR"
}
````

## DON'T

````json
{
    "eventType": "Email",
    "clientStatus": "stoppedAfterError"
}
````