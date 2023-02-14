---
type: MUST
id: R000053
appliesTo: client
---

# use Proof Key for Code Exchange (PKCE) for mobile and JavaScript apps

[PKCE](https://oauth.net/2/pkce) ([RFC 7636](https://tools.ietf.org/html/rfc7636)) is an extension to the Authorization Code flow to prevent certain attacks and to be able to securely perform the OAuth 2.0 exchange especially for public clients.
Clients must use SHA256 to encrypt the code challenge and set the `code_challenge_method` parameter to `S256`.

::: info Info
PKCE can be applied to any OAuth 2.0 client and is not restricted to public clients.
:::
