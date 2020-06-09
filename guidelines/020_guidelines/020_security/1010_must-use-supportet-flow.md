---
type: MUST
---

# use Authorization Grant

An authorization grant is a credential representing the resource owner's authorization (to access its protected resources) used by the client to obtain an access token.

The OTTO API supports three grant types.

* Authorization Code
* Client Credentials
* Implicit Grant

Unsupported is the password credentials grant type.

The grant type which should be used depends on use case.

## Authorization Code Grant 

The Authorization Code grant type is used by confidential and public clients to exchange an authorization code for an access token.

After the user returns to the client via the redirect URL, the application will get the authorization code from the URL and use it to request an access token.

[https://oauth.net/2/grant-types/authorization-code/](https://oauth.net/2/grant-types/authorization-code/)

## Authorization Code Grant using Proof Key for Code Exchange (PKCE)

PKCE ([RFC 7636](https://tools.ietf.org/html/rfc7636)) is an extension to the Authorization Code flow to prevent certain attacks and to be able to securely perform the OAuth exchange from public clients.

It is primarily used by mobile and JavaScript apps, but the technique can be applied to any client as well.

[https://oauth.net/2/pkce/](https://oauth.net/2/pkce/)

## Client Credentials Grant

The Client Credentials grant type is used by clients to obtain an access token outside of the context of a user.

This is typically used by clients to access resources about themselves rather than to access a user's resources.

[https://oauth.net/2/grant-types/client-credentials/](https://oauth.net/2/grant-types/client-credentials/)
