---
sideNav: true
---

# Versioning of incompatible changes

OTTO API supports two versioning approaches for HTTP APIs: via [profiles](@guidelines/R000065) and via [URL path](@guidelines/R000031). Versioning via profiles is preferred.

::::: accordions
:::: accordion Why profile versioning

We cannot go with a single global version number for the entire OTTO REST API, as this would mean too much coordination overhead for our feature teams.
To implement versioning for REST APIs, we want to use industry standards wherever possible. Thus, we exclude solutions that violate existing standards or are based on draft standards that might change in an incompatible way.

URL-based versioning links only to a specific version of a resource and creates a fixed dependency on a specific version. This conflicts with the use of hypermedia/HAL. Therefore, versioning must be done via profiles.
In addition, profiles also allow resource/sub-resource independent versioning.

In cases where profile-based versioning is not possible or sufficient, URL-based versioning can be applied.

:::info
During the initial discussion of versioning, several options have been [identified and evaluated (internal link)](https://github.com/otto-ec/ottoapi_guidelines/blob/main/content/references/REST/versioning.md).
:::

::: references

- [Profiles in HAL+JSON](https://datatracker.ietf.org/doc/html/draft-kelly-json-hal-08#page-8)
- [The 'profile' Link Relation Type (RFC 9606)](https://tools.ietf.org/html/rfc6906)
- [SHOULD use `Accept` and `Content-Type` headers with profile parameter](@guidelines/R000030)
- [MUST provide conventional hyperlinks](@guidelines/R100033)
  :::
  ::::
  :::::
