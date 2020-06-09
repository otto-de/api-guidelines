# JSON

## yay/nay list

?? = not sure if we need/want this rule
(should/must) = we need to agree on strictness

- ?? do we distinguish requiredness / nullability? MUST use same semantics for null and absent properties [123]
  - do we want required, yet nullable values??
- (should/must) omit optional values OR explicitly null optional values
- SHOULD pluralize array names [120] <https://opensource.zalando.com/restful-api-guidelines/#120>
- SHOULD not use null for empty arrays [124] <https://opensource.zalando.com/restful-api-guidelines/#124>
- ?? enumerations as strings / enumerations in UPPER_SNAKE_CASE? <https://opensource.zalando.com/restful-api-guidelines/#125>
- [MUST] define dates properties compliant with RFC 3339 [126] <https://opensource.zalando.com/restful-api-guidelines/#126>
- SHOULD use standardized property formats [238] <https://opensource.zalando.com/restful-api-guidelines/#238>
- MUST use standard date and time formats [169] <https://opensource.zalando.com/restful-api-guidelines/#169> => nicht nur JSON, auch header (parameter?)
