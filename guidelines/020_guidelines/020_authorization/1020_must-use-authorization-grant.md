---
type: MUST
id: R000052
---

# use Authorization Grant

Authorization Grant is a credential representing the resource owner's authorization (to access its protected resources) used by the client to obtain an access token.

The OTTO API supports two grant types:

- [Authorization Code](https://oauth.net/2/grant-types/authorization-code/)
- [Client Credentials](https://oauth.net/2/grant-types/client-credentials/)

`Note`{ label } The [Resource Owner Password Credentials](https://oauth.net/2/grant-types/password/) grant type is not supported.

The grant type to be used depends on the use cases outlined in the following rules.
