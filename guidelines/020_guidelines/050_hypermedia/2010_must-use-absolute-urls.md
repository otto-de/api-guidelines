---
type: MUST
id: R100032
---

# use absolute URLs

::: warning Public APIs only
This rule only applies to public APIs. For private APIs, this rule SHOULD be followed.

See also:
* [MUST implement REST maturity level 2 for private APIs](../050_hypermedia/1010_must-implement-rest-maturity-level-2-for-private-apis.md) 
* [MUST implement REST maturity level 3 for public APIs](../050_hypermedia/1020_must-implement-rest-maturity-level-3-for-public-apis.md)
:::

Links to other resource must always use full, absolute hrefs.

Motivation: Exposing any form of relative URI (no matter if the relative URI uses an absolute or relative path) introduces avoidable client side complexity. It also requires clarity on the base URI, which might not be given when using features like embedding subresources. The primary advantage of non-absolute URI is reduction of the payload size, which is better achievable by following the recommendation to use gzip compression

