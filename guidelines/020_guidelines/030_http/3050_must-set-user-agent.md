---
type: MUST
id: R000025
---

# set user agent request header

Clients must set the `User-Agent` header when performing requests against the OTTO API in the format `{client-identifier}/{client-version}`. This allows requests to be correlated with the specific client and release version, which can be used to troubleshoot failed requests for a new version of the client application. 

Examples:

- `acme-product-indexer/v1.0.0`
- `otto-alexa-skill/v2.3.0`
