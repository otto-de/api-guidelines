# Versioning

OTTO API supports two versioning approaches: via [profiles](./guidelines/020_guidelines/040_hypermedia/4000_profiles.md) and via [URL path](R000031). Versioning via profiles is preferred.

::::: accordions
:::: accordion Why profile versioning

We cannot go with a single global version number for the entire OTTO API, as this would mean too much coordination overhead for our feature teams. Also, we want to use industry standards wherever possible and exclude solutions that violate existing standards or are based on draft standards where incompatible changes might occur.

URL-based versioning links only a specific version of a resource and creates a fixed dependency on a specific version. This conflicts with the use of hypermedia/HAL. Therefore, versioning must be done via profiles.
In addition, profiles also allow resource/sub-resource independent versioning.

In cases where profile-based versioning is not possible or sufficient, URL-based versioning can be applied.

:::info
During the initial discussion of versioning, several options have been [identified and evaluated](https://github.com/otto-ec/ottoapi_guidelines/blob/master/references/versioning.md).
:::

::: references

- [Profiles in HAL+JSON](https://datatracker.ietf.org/doc/html/draft-kelly-json-hal-08#page-8)
- [The 'profile' Link Relation Type (RFC 9606)](https://tools.ietf.org/html/rfc6906)
- [SHOULD use Accept header with profile parameter](R000030)
- [MUST provide conventional hyperlinks](R100033)
  :::
  ::::
  :::::
