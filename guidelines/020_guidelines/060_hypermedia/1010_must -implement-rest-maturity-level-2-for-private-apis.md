---
type: MUST
id: R000032
---

# implement REST Maturity Level 2 for private APIs

For private APIs, we strive for a good implementation of [REST Maturity Level 2](https://martinfowler.com/articles/richardsonMaturityModel.html#level2) as it enables us to build resource-oriented APIs that make full use of HTTP methods and status codes.
You can see this in many rules in these guidelines, e.g.

TODO (links)

* MUST avoid actions - think about resources
* MUST keep URLs verb-free
* MUST use HTTP methods correctly
* MUST use standard HTTP status codes

Although this is not HATEOAS, it should not prevent you from designing proper link relationships in your APIs.
If you do so, it is highly recommended to use application/hal+json as representation format, so the API can be published later without breaking changes.
