---
type: MUST
id: R000032
---

# implement REST maturity level 2 for private APIs

For private APIs, we strive for a good implementation of [REST Maturity Level 2](https://martinfowler.com/articles/richardsonMaturityModel.html#level2) as it enables us to build resource-oriented APIs that make full use of HTTP methods and status codes.
You can see this in many rules in these guidelines, e.g.

* [MUST avoid actions - think about resources](../040_resources/1010_must-avoid-actions-think-about-resources.md)
* [MUST use nouns to represent resources](../040_resources/1020_must-use-nouns-to-represent-resources.md)
* [MUST use HTTP methods correctly](../030_http/2010_must-use-http-methods-correctly.md)
* [MUST use standard HTTP status code](../030_http/3020_must-use-standard-http-status-code.md)

Although this is not HATEOAS, it should not prevent you from designing proper link relationships in your APIs.

If you do so, you SHOULD use application/hal+json as representation format because
- Publishing the API later will be easier if HAL is used from the beginning.
- Implementation of API clients is easier if different parts of the API are behaving in the same way and if
  the same format is used for different purposes.

See also:
* Internet Draft [JSON Hypertext Application Language](https://tools.ietf.org/html/draft-kelly-json-hal-08).
