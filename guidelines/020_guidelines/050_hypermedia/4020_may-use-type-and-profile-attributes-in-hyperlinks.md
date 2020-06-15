---
type: MAY
id: R100063
---

# use type and profile attributes in hyperlinks

The HAL `_links` object is an object whose property names are link relation types and values are either a link object 
or an array of link objects.

Beside others, HAL links may contain the optional attributes ['type'](https://tools.ietf.org/html/draft-kelly-json-hal-08#section-5.3) or ['profile'](https://tools.ietf.org/html/draft-kelly-json-hal-08#section-5.6) 

As [versioning](../060_versioning/0000_index.md) of APIs [SHOULD](../060_versioning/1040_should-use-accept-header-with-profile-parameter.md) 
be implemented using `Accept` header + `profile` parameter, HAL representations of a resource MAY use `type` and `profile`
to specify the mediatype and profile of a linked resource.

```json
{
  "_links": {
    "author": [
      { 
         "href": "https://api.otto.de/authors/4711",
         "type": "application/hal+json",
         "profile": "https://api.otto.de/profiles/person+v1" 
      }
    ]
  }
}
```  

While using the profile parameter is improving the discoverability of the API (because the [link of the profile is 
pointing to a human-readable documentation](./4010_must-use-resolvable-profile-urls.md)), 
doing so has the downside that adding a new profile will require the API to add links for every profile:

```json
{
  "_links": {
    "author": [
      { 
         "href": "https://api.otto.de/authors/4711",
         "type": "application/hal+json",
         "profile": "https://api.otto.de/profiles/person+v1" 
      },
      { 
         "href": "https://api.otto.de/authors/4711",
         "type": "application/hal+json",
         "profile": "https://api.otto.de/profiles/person+v2" 
      }
    ]
  }
}
```  

Sometimes, resources may link to other resources that are available in multiple mediatypes like, for example, JSON 
and HTML or JSON and XML. In this case, the API SHOULD use the type attribute in hyperlinks:

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