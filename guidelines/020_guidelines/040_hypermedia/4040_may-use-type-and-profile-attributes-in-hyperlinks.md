---
type: MAY
id: R100068
---

# use type and profile attributes in hyperlinks

The HAL `_links` object's property names are link relation types and values are either a link object or an array of link objects.

Beside others, HAL links may contain the optional attributes ['type'](https://tools.ietf.org/html/draft-kelly-json-hal-08#section-5.3) or ['profile'](https://tools.ietf.org/html/draft-kelly-json-hal-08#section-5.6)

As [versioning](./guidelines/020_guidelines/080_versioning/0000_index.md) of APIs [should be implemented using `Accept` header and `profile` parameter](./guidelines/020_guidelines/080_versioning/1040_should-use-accept-header-with-profile-parameter.md), HAL representations of a resource may use `type` and `profile` to specify the mediatype and profile of a linked resource.

```json
{
  "_links": {
    "author": [
      {
        "href": "https://api.otto.de/authors/4711",
        "type": "application/hal+json",
        "profile": "https://api.otto.de/portal/profiles/authors/person+v1"
      }
    ]
  }
}
```

While using the profile parameter improves the discoverability of the API (because the [link of the profile points to a human-readable documentation](./guidelines/020_guidelines/040_hypermedia/4010_must-use-resolvable-profile-urls.md)), adding a new profile requires the API to add links for every profile:

```json
{
  "_links": {
    "author": [
      {
        "href": "https://api.otto.de/authors/4711",
        "type": "application/hal+json",
        "profile": "https://api.otto.de/portal/profiles/authors/person+v1"
      },
      {
        "href": "https://api.otto.de/authors/4711",
        "type": "application/hal+json",
        "profile": "https://api.otto.de/portal/profiles/authors/person+v2"
      }
    ]
  }
}
```

Sometimes resources may link to other resources that are available in multiple mediatypes such as JSON and HTML, or JSON and XML.
In this case, the API should use the type attribute in hyperlinks:

```json
{
  "_links": {
    "o:product": [
      {
        "href": "https://api.otto.de/products/4711",
        "type": "application/hal+json"
      },
      {
        "href": "https://www.otto.de/p/4711",
        "type": "text/html"
      }
    ]
  }
}
```
