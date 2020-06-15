---
type: MUST
id: R100038
---

# use curied link-relation types

::: warning Public APIs only
This rule only applies to public APIs. For private APIs, this rule SHOULD be followed.

See also:

- [MUST implement REST maturity level 2 for private APIs](../050_hypermedia/1010_must-implement-rest-maturity-level-2-for-private-apis.md)
- [MUST implement REST maturity level 3 for public APIs](../050_hypermedia/1020_must-implement-rest-maturity-level-3-for-public-apis.md)
  :::

Custom link-relation types can be introduced, if no [IANA-registered rel](./3020_must-prefer-registered-rels.md) or
[existing custom rel](./3010_must-prefer-existing-custom-rels.md) is matching the semantics of a link.

If you do so, the rules specified in [MUST use absolute URLs for custom link-relation types](./3030_must-use-absolute-urls-for-custom-rels.md)
must be met.

A resource that is linking to other resources using a custom link-relation type MUST add `curies` with `"name": "o"`
and `"href": "https://api.otto.de/link-relations/{rel}"` to it's
`_links` section:

```json
{
  "_links": {
    "self": { "href": "https://api.otto.de/orders?page=2&pageSize=10" },
    "curies": [
      {
        "name": "o",
        "href": "https://api.otto.de/link-relations/{rel}",
        "templated": true
      }
    ]
  }
}
```

Links to a resource having a custom link-relation type MUST be curied using this CURI:

```json
{
    "_links": {
      "self": { "href": "https://api.otto.de/orders?page=2&pageSize=10" },
      "curies": [{ 
          "name": "o", 
          "href": "https://api.otto.de/link-relations/{rel}", 
          "templated": true }
      ],
      "o:order": [
          {"href": "https://api.otto.de/orders/4711"},
          {"href": "https://api.otto.de/orders/0815"}
      ]
    }
}
```

If the linked resources [can be embedded](../040_resources/3010_should-embed-sub-resources.md) into the response, the 
service should do so, using the same link-relation type that is used to link the sub-resources:

```json
{
    "_links": {
      "self": { "href": "https://api.otto.de/orders?page=2&pageSize=10" },
      "curies": [{ 
          "name": "o", 
          "href": "https://api.otto.de/link-relations/{rel}", 
          "templated": true }
      ],
      "o:order": [
          {"href": "https://api.otto.de/orders/4711"},
          {"href": "https://api.otto.de/orders/0815"}
      ]
    },
    "_embedded": {
      "o:order": [
          {
             "_links": {
                 "self": { "href": "https://api.otto.de/orders/4711" },
                 "collection": { "href": "https://api.otto.de/orders" }
             },
             "id": "4711",
             "total": 4200
          },
          {
              "_links": {
                 "self": { "href": "https://api.otto.de/orders/0815" },
                 "collection": { "href": "https://api.otto.de/orders" }
              },
              "id": "0815",
             "total": 12900
          }
      ]
    } 
}
```
  
See also:

- [MUST prefer IANA-registered link-relation types](./3020_must-prefer-registered-rels.md)
- [MUST prefer existing custom link-relation types](./3010_must-prefer-existing-custom-rels.md)
- [MUST use absolute URLs for custom link-relation types](./3030_must-use-absolute-urls-for-custom-rels.md)
