---
type: MUST
id: R000052
---

# use Authorization Grant

An authorization grant is a credential representing the resource owner's authorization (to access its protected resources) used by the client to obtain an access token.

The OTTO API supports three grant types.

- Authorization Code
- Client Credentials
- Implicit Grant

Unsupported is the password credentials grant type.

The grant type which should be used depends on use case.

## Authorization Code Grant

The Authorization Code grant type should be used by **confidential clients** to exchange an authorization code for access token and optional refresh token.

[https://oauth.net/2/grant-types/authorization-code/](https://oauth.net/2/grant-types/authorization-code/)

## Client Credentials Grant

The Client Credentials grant should be used for **machine-to-machine authorization** to obtain an access token outside of the context of a user.

[https://oauth.net/2/grant-types/client-credentials/](https://oauth.net/2/grant-types/client-credentials/)
