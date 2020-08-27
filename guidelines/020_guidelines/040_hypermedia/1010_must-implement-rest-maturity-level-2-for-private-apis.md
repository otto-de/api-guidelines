---
type: MUST
id: R000032
---

# implement REST maturity level 2 for private APIs

For private APIs, we strive for a good implementation of [REST Maturity Level 2](https://martinfowler.com/articles/richardsonMaturityModel.html#level2) as it enables us to build resource-oriented APIs that make full use of HTTP methods and status codes.
This is reflected in many rules of our guidelines, such as:

- [MUST use nouns to represent resources](./guidelines/020_guidelines/050_naming-conventions/1020_must-use-nouns-to-represent-resources.md)
- [MUST use HTTP methods correctly](./guidelines/020_guidelines/030_http/1010_must-use-http-methods-correctly.md)
- [MUST use standard HTTP status codes](./guidelines/020_guidelines/030_http/3020_must-use-standard-http-status-code.md)

Although this is not HATEOAS, it should not prevent you from designing proper link relations in your APIs.

If you do so, you should use application/hal+json as representation format, because:

- Later publication of the API will be easier if HAL is used from the beginning.
- Implementing API clients is easier if different parts of the API behave the same and if the same format is used for different purposes.

::: references

- Internet Draft [JSON Hypertext Application Language](https://tools.ietf.org/html/draft-kelly-json-hal-08)
  :::
