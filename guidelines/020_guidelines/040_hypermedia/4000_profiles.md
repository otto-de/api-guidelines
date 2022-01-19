---
sideNav: true
---

# Profiles

The OTTO APIs must either support `application/json` or `application/hal+json` as a media type.
As these formats are not specific enough for our purposes, all APIs [must be documented](./guidelines/010_general-guidelines/1040_must-provide-api-specification-using-openapi.md)
using [OpenAPI Spec 3.0](http://spec.openapis.org/oas/v3.0.3).

A `product` representation, for example, might use `application/hal+json` as a media type.
Using OpenAPI Spec, the structure of the representation must be specified, so that developers of an API client know about the different properties of the `product`.

Depending on the context, the same domain object may have several representations. For example, `product` as a search result might contain information such as availability or delivery options. `product` as part of the processed customer order shares some essential details with the search result, but would likely contain some other attributes instead. Therefore, different perspectives on the same business object may result in different representations.

The specification must be identifiable by a URL such as `https://api.otto.de/portal/profiles/products/product+v1`.
If later a second version of the `product` representation is added, the new version of the spec (`https://api.otto.de/portal/profiles/products/product+v2`) can be distinguished from the earlier version.

Using the [Accept header with profile parameter](./guidelines/020_guidelines/080_versioning/1040_should-use-accept-header-with-profile-parameter.md), clients can now specify the requested version of the specification like this:

```http request
GET https://api.otto.de/products/42 HTTP/1.1
Accept: application/hal+json; profile="https://api.otto.de/portal/profiles/products/product+v1"
```

The returned `product` representation (an `application/hal+json` document) [must contain a link](./guidelines/020_guidelines/040_hypermedia/2040_must-provide-conventional-hyperlinks.md) to the profile:

```json
{
  "_links": {
    "self": { "href": "https://api.otto.de/products/42" },
    "profile": {
      "href": "https://api.otto.de/portal/profiles/products/product+v1"
    }
  },
  "etc": "..."
}
```

[Following the `profile` link](./guidelines/020_guidelines/040_hypermedia/4010_must-use-resolvable-profile-urls.md), an API client developer can now find the human-readable specification of the returned document.

In many cases, the representation of a HAL resource contains hyperlinks to other resources.
In our case, the representation might contain N links to product images (using a link relation type such as `o:product-image`) and a single link to a resource containing customer reviews (using the link relation type `o:customer-reviews`):

```json
{
  "_links": {
    "curies": [
      {
        "name": "o",
        "href": "https://api.otto.de/portal/link-relations/products/{rel}",
        "templated": true
      }
    ],
    "self": { "href": "https://api.otto.de/products/42" },
    "profile": {
      "href": "https://api.otto.de/portal/profiles/products/product+v1"
    },
    "o:customer-reviews": { "href": "https://api.otto.de/customer-reviews/42" },
    "o:product-images": [
      { "href": "https://i.otto.de/42.jpg" },
      { "href": "https://i.otto.de/43.jpg" }
    ]
  },
  "etc": "..."
}
```

As links may either contain a single link or an array of links, the specification of the `product` representation
[must be explicit](./guidelines/020_guidelines/040_hypermedia/3050_must-document-link-cardinality.md), whether `o:customer-reviews` contains a single link or an array of links.

Profiles may also apply to request bodies: all public endpoints which accept requests with a body must support request versioning. Currently, this implicates POST, PUT, and PATCH, but other HTTP methods may follow. According to the RFCs, `application/json` and `application/json-patch+json` media types do not allow parameters, so for requests with a body, `application/hal+json` must be used instead.

::: references

- [The 'profile' Link Relation Type (RFC 9606)](https://tools.ietf.org/html/rfc6906)
- [SHOULD use Accept header with profile parameter](./guidelines/020_guidelines/080_versioning/1040_should-use-accept-header-with-profile-parameter.md)
- [MUST provide conventional hyperlinks](./guidelines/020_guidelines/040_hypermedia/2040_must-provide-conventional-hyperlinks.md)
- [Paged collection](./guidelines/020_guidelines/060_resources/2060_must-provide-page-metadata.md)
- [MUST use profiles for Public APIs](./guidelines/020_guidelines/080_versioning/0005_must_version_with_profiles.md)
- Parameters in `application/json` [RFC 7159, Section 11](https://datatracker.ietf.org/doc/html/rfc7159#section-11)
- Parameters in `application/json-patch+json` [RFC 6902, Section 6](https://datatracker.ietf.org/doc/html/rfc6902#section-6)
  :::
