# Hypermedia Format

In our system with many distributed resources connected by HTTP links, it is important to provide the client with the current state of the application from the resources of our REST interface. In addition, we transmit all possible state transitions to the client in the form of links.
In addition to the need of resource links we want to establish a consistent JSON response format with the goal of increasing productivity and efficiency. Instead of spending valuable time developing different own formats we will adopt conventions from an existing format and extend where necessarry.

## HATEOAS

HATEOAS is short for "Hypermedia As The Engine Of Application State" and describes a design model for REST interfaces.
If we wouldn't use hypermedia in the design of our interfaces, clients would be forced to construct URLs themselves, which can only be done with knowledge of the resource's internals. Furthermore, without links there is no workflow at all, but at best a static API. Apart from the absence of a workflow, this creates a close and fragile coupling. If resource URLs change, the clients will no longer work. If the clients should not have to change, the resource must not change.
There are several candidates for hypermedia formats, such as [HAL](http://stateless.co/hal_specification.html), [JSON API](https://jsonapi.org/), [JSON-LD](https://json-ld.org/), [Collection+JSON](http://amundsen.com/media-types/collection/) or [SIREN](https://github.com/kevinswiber/siren).
We took a closer look at HAL and JSON API in particular.

## Formats

### HAL+JSON

**Example Document**

```json
GET /orders HTTP/1.1
Host: example.org
Accept: application/hal+json

HTTP/1.1 200 OK
Content-Type: application/hal+json

{
  "_links": {
    "self": { "href": "/orders" },
    "next": { "href": "/orders?page=2" },
    "find": { "href": "/orders{?id}", "templated": true }
  },
  "_embedded": {
    "orders": [{
        "_links": {
          "self": { "href": "/orders/123" },
          "basket": { "href": "/baskets/98712" },
          "customer": { "href": "/customers/7809" }
        },
        "total": 30.00,
        "currency": "USD",
        "status": "shipped",
      },{
        "_links": {
          "self": { "href": "/orders/124" },
          "basket": { "href": "/baskets/97213" },
          "customer": { "href": "/customers/12369" }
        },
        "total": 20.00,
        "currency": "USD",
        "status": "processing"
    }]
  },
  "currentlyProcessing": 14,
  "shippedToday": 20
}
```

**Pros**

- Currently used by most present OTTO API endpoints.
- The format supports the most important features. Missing details can easily be specified.
- The simplicity, compared to other formats like JSON API, ensures a rapid induction to the format.
- Every JSON document is a valid HAL+JSON document. This gives us the possibility to start with any given JSON API and later decide to add hyperlinks and embedded resources in a non-breaking way.
- Hyperlink are represented as link objects with a couple of helpful attributes. It defines link titles, types, profiles, deprecation information and other things that are helpful to evolve APIs.
- Embedded resources can be nested. Using this feature, servers can compose aggregate representations from the single aggregated parts in a simple, straightforward way.
- All kinds of versioning is supported. Beside of URI-based versioning, the specification is explicitly supporting profile parameters in the accept header. Links may have type, profile and deprecation attributes to link to different representations of a resources.
- While not explicitly specified, filtering and sorting is supported using templated links. The RFC specifying templated links is [RFC6580](https://tools.ietf.org/html/rfc6570).
- While not explicitly specified, paging is supported using the standardized IANA link-relation types like, for example, next, prev, first, last. An example is also contained in the specification [Section 6](https://tools.ietf.org/html/draft-kelly-json-hal-08#section-6).

**Cons**

- The standard is no longer actively maintained. The published [IETF Draft](https://tools.ietf.org/html/draft-kelly-json-hal-08) expired in november 2016.
- Quite minimalistic, leaving out a couple of aspects that we might need to define, such as pagination, filtering and error messages.

### JSON API

**Example Document**

```json
GET /articles?page[number]=3&page[size]=1 HTTP/1.1
HTTP/1.1 200 OK
Content-Type: application/vnd.api+json

{
  "meta": {
    "totalPages": 13
  },
  "data": [
    {
      "type": "articles",
      "id": "3",
      "attributes": {
        "title": "JSON:API paints my bikeshed!",
        "body": "The shortest article. Ever.",
        "created": "2015-05-22T14:56:29.000Z",
        "updated": "2015-05-22T14:56:28.000Z"
      }
    }
  ],
  "links": {
    "self": "http://example.com/articles?page[number]=3&page[size]=1",
    "first": "http://example.com/articles?page[number]=1&page[size]=1",
    "prev": "http://example.com/articles?page[number]=2&page[size]=1",
    "next": "http://example.com/articles?page[number]=4&page[size]=1",
    "last": "http://example.com/articles?page[number]=13&page[size]=1"
  }
}
```

**Pros**

- JSON API ist an active standard which is continuously improved and has an active community. A stable version 1.0 is available, version 1.1 is currently under development.
- The coverage of the specification is more comprehensive, e.g. error responses are standardized and allow multiple error messages in one response. Pagination is a build in feature.
- Support for [Compound Documents](https://jsonapi.org/format/#document-compound-documents) to include related resources.
- Support for [Sparse Fields](https://jsonapi.org/format/#fetching-sparse-fieldsets) to limit the response to specific fields.
- JSON API has an argueably broader industry support.

**Cons**

- Successive adoption of JSON API always means a breaking change due to the given top level structure.
- Versioning options are limited as changes to the media type are strictly prohibited.
- Does not support any attributes for links beside of custom (unspecified) meta-data attributes.
- The format is quite complex and thus leaves a lot of room for different interpretations.

## Decision

We choose to keep _hal+json_ as the primary format for hypermedia documents.
The decision was made after careful consideration of various aspects. Sticking to the already adopted format will prevent pointless migration of already established APIs to a different format. The minimalist approach of HAL and the resulting flexibility supports the incremental enhancement of simple JSON responses.

Specification shortcomings such as pagination, filtering and error responses are documented and addressed by the API working group.

## Resources

- [HAL - Hypertext Application Language](http://stateless.co/hal_specification.html)
- [IETF Draft - JSON Hypertext Application Language](https://tools.ietf.org/html/draft-kelly-json-hal-08)
- [JSON API Specification](https://jsonapi.org)
- [Blog: Choosing a hypermedia type](https://sookocheff.com/post/api/on-choosing-a-hypermedia-format/)
- [Edison HAL](https://github.com/otto-de/edison-hal)
