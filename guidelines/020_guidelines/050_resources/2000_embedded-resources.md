---
sideNav: true
navTitle: Embedded resources
---

# Embedded resources

The "hypertext cache pattern" allows servers to use embedded
resources to dynamically reduce the number of requests a client
makes, improving the efficiency and performance of the application.

Clients SHOULD be automated for this purpose so that, for any given link
relation, they will read from an embedded resource (if present) in
preference to traversing a link.

To activate this client behaviour for a given link, servers SHOULD
add an embedded resource into the representation with the same
relation.

Servers SHOULD NOT entirely "swap out" a link for an embedded
resource (or vice versa) because client support for this technique is
OPTIONAL.

The format used for embedded resources SHOULD be application/hal+json for private APIs. For public APIs, using
the HAL format is mandatory.

The following examples shows the hypertext cache pattern applied to
an "author" link:

_Before:_

```json
{
  "_links": {
    "self": { "href": "/books/the-way-of-zen" },
    "author": { "href": "/people/alan-watts" }
  }
}
```

_After:_

```json
{
  "_links": {
    "self": { "href": "/blog-post" },
    "author": { "href": "/people/alan-watts" }
  },
  "_embedded": {
    "author": {
      "_links": { "self": { "href": "/people/alan-watts" } },
      "name": "Alan Watts",
      "born": "January 6, 1915",
      "died": "November 16, 1973"
    }
  }
}
```
