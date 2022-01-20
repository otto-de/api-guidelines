---
type: SHOULD
id: R100064
---

# contain link title attribute

All hyperlinks should have a ['title'](https://tools.ietf.org/html/draft-kelly-json-hal-08#section-5.7) attribute.
The value of the attribute should not contain generic descriptions ('The author'), but should be a specific human-readable name or title of the target resource.

```json
{
  "_links": {
    "author": [
      {
         "href": "https://api.otto.de/authors/4711",
         "title": "John"
      }
    ]
  }
}
```  
