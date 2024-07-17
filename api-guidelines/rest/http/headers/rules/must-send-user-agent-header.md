---
id: R000074
---

# MUST send `User-Agent` header

API providers must be able to easily identify which client is calling their API.
The `User-Agent` header saves the API provider manual work, e.g. retrieving this information from the token or reading the access log.
API providers must ensure that the user agent can be identified by means of a suitable API design.

::: references

[Request headers](https://api.otto.de/portal/rest/about-the-api/headers#request-headers)

:::
