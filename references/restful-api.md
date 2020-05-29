# RESTful API

As described in [api-scope](api-scope.md), we are distinguishing between three kinds of APIs: **public**,
**partner** and **private** APIs.

For **private APIs**, we strive for a good implementation of
[REST Maturity Level 2](http://martinfowler.com/articles/richardsonMaturityModel.html#level2) as it
enables us to build resource-oriented APIs that make full use of HTTP verbs and status codes.
You can see this expressed by many rules throughout these guidelines, e.g.:

- [**MUST** avoid actions - think about resources](../topics/restful.md#must-avoid-actions-think-about-resources)
- [**MUST** keep URLs verb-free](../topics/restful.md#must-keep-urls-verb-free)
- [**MUST** use HTTP methods correctly](../topics/restful.md#must-use-http-methods-correctly)
- [**MUST** use standard HTTP status codes](../topics/restful.md#must-use-standard-http-status-codes)

Although this is not HATEOAS, it should not prevent you from designing proper link relationships in
your APIs. If you do so, it is highly recommended to use
[application/hal+json](https://tools.ietf.org/html/draft-kelly-json-hal-08) as representation format,
so the API can be published later without breaking changes.

For **partner APIs** and especially **public APIs**, we require the API to implement
[REST Maturity Level 3](http://martinfowler.com/articles/richardsonMaturityModel.html#level3), using
the HAL+JSON format as described in [hypermedia-format](hypermedia-format.md).

All APIs are required to follow common guidelines for the representation of resources:

- [Resources](../topics/restful.md#resources)
- [JSON Guidelines](../topics/restful.md#json-guidelines)
- [JSON Property Names](../topics/restful.md#json-property-names)
- [JSON Property Values](../topics/restful.md#json-property-values)
