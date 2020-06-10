# HTTP Idempotence

- https://github.com/otto-ec/ottoapi_manifest/issues/58
- https://api.develop.otto.de/api-docs/guidelines/#R000009

## Considerations

Idempotency for `PUT` and especially `POST` requests can be achieved using different patterns (conditional keys, secondary keys, idempotency key) covering multiple use cases. We opt to closely follow the guidelines provided in the [Zalando Api Guidelines](https://opensource.zalando.com/restful-api-guidelines/#229) with one adjustment: The `Idempotency-Key` header. We consciously decided **against** recommending this non-standard HTTP header in the initial version of the guidelines. It is a very strong solution to idempotence requirements, but it comes with a highly complex implementation in case of distributed systems. We currently don't see a use case warranting this complexity, which can not also be solved by other solutions (conditional/secondary keys). If a valid use case arrives in the future, we will reconsider this decision and add an additional recommendation.
