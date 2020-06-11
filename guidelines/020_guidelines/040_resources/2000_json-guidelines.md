---
sideNav: true
navTitle: JSON guidelines
---

# JSON guidelines

## yay/nay list

?? = not sure if we need/want this rule
(should/must) = we need to agree on strictness

- ?? do we distinguish requiredness / nullability?
  - do we want required, yet nullable values??
- (should/must) omit optional values OR explicitly null optional values
- ?? enumerations as strings / enumerations in UPPER_SNAKE_CASE? <https://opensource.zalando.com/restful-api-guidelines/#125>
- [MUST] define dates properties compliant with RFC 3339 [126] <https://opensource.zalando.com/restful-api-guidelines/#126>
- SHOULD use standardized property formats [238] <https://opensource.zalando.com/restful-api-guidelines/#238>
- MUST use standard date and time formats [169] <https://opensource.zalando.com/restful-api-guidelines/#169> => nicht nur JSON, auch header (parameter?)