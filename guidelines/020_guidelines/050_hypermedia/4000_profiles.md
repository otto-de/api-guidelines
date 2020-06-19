---
sideNav: true
---

# Profiles

The OTTO APIs must either support `application/json`, or `application/hal+json` as a media type. As these formats are
not specific enough for our purposes, all APIs [MUST be documented](../010_general-guidelines/1030_must-provide-api-specification-using-openapi.md)
using [OpenAPI Spec 3.0](http://spec.openapis.org/oas/v3.0.3).

A 'product' representation, for example, might use `application/hal+json` as a media type. Using OpenAPI Spec, the
structure of the representation must be specified, so developers of an API client know about the different properties
of the 'product' representation.

The specification must be identifiable by an URL like, for example, `https://api.otto.de/profiles/product+v1`. If
later a second version of the 'product' representation is added, the new version of the spec (`https://api.otto.de/profiles/product+v2`)
can be distinguished from the earlier version.

Using the [Accept header with profile parameter](../060_versioning/1040_should-use-accept-header-with-profile-parameter.md),
clients can now specify the requested version of the specification like this:

```http request
GET https://api.otto.de/products/42 HTTP/1.1
Accept: application/hal+json; profile="https://api.otto.de/profiles/product+v1"
```

The returned product representation (beeing an `application/hal+json` document) [MUST](./2020_must-provide-conventional-hyperlinks.md) contain
a link to the profile:

```json
{
  "_links": {
    "self": { "href": "https://api.otto.de/products/42" },
    "profile": { "href": "https://api.otto.de/profiles/product+v1" }
  },
  "etc": "..."
}
```

[Following the `profile` link](./4010_must-use-resolvable-profile-urls.md), an API client developer can now find the
human-readable specification of the returned document.

In many cases, the representation of a HAL resource will contain hyperlinks to other resources. In our case, the
representation might contain N links to product images (using a link-relation type like, for example, `o:product-image`),
and a single link to a resource containing customer reviews (using the link-relation type `o:customer-reviews`):

```json
{
  "_links": {
    "curies": [
      {
        "name": "o",
        "href": "https://api.otto.de/link-relations/{rel}",
        "templated": true
      }
    ],
    "self": { "href": "https://api.otto.de/products/42" },
    "profile": { "href": "https://api.otto.de/profiles/product+v1" },
    "o:customer-reviews": { "href": "https://api.otto.de/customer-reviews/42" },
    "o:product-images": [
      { "href": "https://i.otto.de/42.jpg" },
      { "href": "https://i.otto.de/43.jpg" }
    ]
  },
  "etc": "..."
}
```

As links may either contain a single link, or an array of links, the specification of the 'product' representation
[MUST be explicit](./3050_must-document-link-cardinality.md), whether `o:customer-reviews` will contain a single link,
or an array of links.

::: references

- [The 'profile' Link Relation Type (RFC 9606)](https://tools.ietf.org/html/rfc6906)
- [SHOULD use Accept header with profile parameter](../060_versioning/1040_should-use-accept-header-with-profile-parameter.md)
- [MUST provide conventional hyperlinks](./2020_must-provide-conventional-hyperlinks.md)
- [paged collection](../040_resources/4060_must-provide-page-metadata.md)
  :::
