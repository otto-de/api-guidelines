---
id: R000065
---

# MUST use profiles for versioning

::: info Info
This rule applies to [public APIs](../../../../global/core-principles/api-scope.md). For private APIs it should be followed.
:::

APIs must be versioned using profiles (see [RFC 6906](https://www.rfc-editor.org/rfc/rfc6906)).

## About profiles

A profile adds additional semantics to a media type such as constraints and conventions.
API providers must use JSON schema to define and document the added semantics in the [OpenAPI spec](../../../contract/openapi/rules/must-provide-api-specification-using-openapi-for-rest-apis.md).
A profile is identified by a URI such as `https://api.otto.de/products/profiles/product+v1` (see [MUST use absolute URIs for profiles](./must-use-absolute-profile-uris.md)).

## Media type

A product representation, for example, might use `application/hal+json` as a media type.
The media type `application/hal+json` does not provide any information to the API consumer about the properties available for a product.
By adding the media type parameter profile (i.e., `application/hal+json;profile="https://api.otto.de/products/profiles/product+v1"`), we specify the needed additional semantics relevant for the product representation, so that API consumers know about the different properties of the `product`.
If a second version of the `product` representation is added, the new version of the spec (`https://api.otto.de/products/profiles/product+v2`) can be distinguished from the first version.

## Content negotiation

The media type profile parameter enables the use of HTTP's [proactive content negotiation](https://www.rfc-editor.org/rfc/rfc9110.html#section-12.1) mechanism to perform versioning.
A client can specify the version of the resource representation by providing the `Accept` and `Content-Type` headers with a media type having a profile parameter.

Although the `profile` parameter is formally only defined for the media type `application/hal+json`, we also use it deliberately for content type based versioning of other media types such as `application/json` and `application/json-patch+json`.
This ensures a consistent usage of the `profile` parameter across all used media types and is in accordance with the intention of [RFC 6906](https://www.rfc-editor.org/rfc/rfc6906#section-3.1).

Example:

Usage of the profile parameter to define the version of the content that is being sent to the API and the version that is being accepted as a response.

```http request
POST https://api.otto.de/products/ HTTP/1.1
Accept: application/hal+json; profile="https://api.otto.de/products/profiles/product+v1"
Content-Type: application/json; profile="https://api.otto.de/products/profiles/product+v1"

{
... //request body conforming to profile https://api.otto.de/products/profiles/product+v1
}
```

### Advantages of profile versioning

When implementing versioning for REST APIs, we want to use industry standards wherever possible.
Therefore, we exclude solutions that violate existing standards or are based on draft standards that might change in an incompatible way.

URL-based versioning includes the version in the URL of a resource.
When providing hypermedia APIs, this causes issues with the API not being able to link to a URL-versioned resource in a version-independent way.

Versioning based on profiles leverages the build-in mechanisms of the HTTP protocol and introduces a way to provide easily accessible documentation of the profile through resolvable profile URIs.

In cases where profile-based versioning is not possible or sufficient, [URL-based versioning](./should-not-use-uri-versioning.md) can be applied.

See our [versioning reference (internal link)](../../../../../dev-context/rest/versioning.md) for more information leading to this decision.

::: references

- [The 'profile' Link Relation Type (RFC 9606)](https://tools.ietf.org/html/rfc6906)
- [Profiles in HAL+JSON](https://datatracker.ietf.org/doc/html/draft-kelly-json-hal-08#page-8)
:::
