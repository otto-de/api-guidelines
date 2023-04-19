# OAuth 2.0

The API uses [OAuth 2.0](https://oauth.net/2/) for authorization.
For the implementation we try to comply with the standards as much as possible.
Here's some general information.

::::: accordions
:::: accordion Discovery

The OTTO API provides an [endpoint](https://api.otto.de/.well-known/openid-configuration) that can be used for [OAuth 2.0 endpoint discovery](https://tools.ietf.org/html/draft-ietf-oauth-discovery-06).
Clients can use the returned information to obtain details about the OAuth 2.0 authorization server such as the token and userinfo endpoints as well as the supported OAuth 2.0 flows.
::::

:::: accordion Client Management

OAuth clients and scopes are managed through [Herakles](https://olymp.live.shozu.cloud.otto.de/#/herakles/) (internal link).
::::

:::: accordion JSON Web Token

As [proposed by the OAuth working group](https://tools.ietf.org/html/draft-ietf-oauth-access-token-jwt-07) the access tokens used for the OTTO API are JSON Web Tokens (JWT) as defined in [RFC 7797](https://tools.ietf.org/html/rfc7797).

In short: JWTs are [URL safe base64](https://tools.ietf.org/html/rfc4648#section-5) encrypted JSON documents that encode a

- cryptographic algorithm & token type
- payload (containing, among other things, the expiration date and scope(s) of the token) and
- signature to allow decentralized verification of said payload

You can find examples, a validator and a collection of libraries for different languages as well as runtime environments at [jwt.io](https://jwt.io/).

### Example Token

The JSON content parts of the decoded token look like this:

**Header**

```json
{
  "alg": "RS256", // algorithm used for signature
  "kid": "public:0235e46d-c7d0-42a4-8f69-c1cb127608e8", // the signing key id
  "typ": "JWT"
}
```

**Payload**

```json
{
  "aud": ["https://api.otto.de"],
  "client_id": "f3b9910a-08ea-4b6b-895a-261674e573b9", // OAuth client ID that requested the token
  "exp": 1591892081, // epoch time at which the token expires
  "ext": {},
  "iat": 1591888481, // epoch time the token was issued at
  "iss": "https://api.otto.de/", // issuer of the token
  "jti": "6f76d949-fad5-4634-ba4f-b7ebf9d32ade", // (unique) ID of the token itself
  "nbf": 1591888481, // epoch time the token must not be accepted before
  "scp": ["otto.read"], // the scope the token is granting access to
  "sub": "8d0c8242d4654d41858e150f5ef5b3deccd749d3" // (if applicable) the subject of the token, in this case a customer
}
```

::: warning Important
Requesting a large number of scopes will result in large Bearer Tokens. Servers might reject requests containing an `Authorization` header that is larger than 4kB with `413 Payload Too Large` status code.
:::
::::

:::: accordion JSON Web Key Set

With [JSON Web Key Set (JWKS)](https://tools.ietf.org/html/rfc7517), an API can specify the keys it uses to sign its JSON Web Tokens.
For all keys in use it specifies, among other things:

- the key type (e.g. RSA, EC)
- the intended use of the key (e.g. encryption or signing)
- the key ID
- the specific cryptographic algorithm used
- the key itself

For a full list of parameters see [RFC7517, Section 4](https://tools.ietf.org/html/rfc7517#section-4).

An API publishes the keys it uses at `.well-known/jwks.json`.
This allows both clients and endpoints to easily validate the keys used to sign tokens.
Even the API provider can use it to easily rotate keys without manual overhead for API clients or endpoint providers.

You can find the key set for the OTTO API at [https://api.otto.de/.well-known/jwks.json](https://api.otto.de/.well-known/jwks.json).
::::

:::: accordion Refresh Tokens

Once an access token expires or is about to expire, clients might still need access to OAuth 2.0 protected resources.
Usually this means that the user will be forced to grant permission by re-authenticating.

To solve this, OAuth 2.0 introduced [refresh tokens](https://tools.ietf.org/html/rfc6749#section-1.5) as part of the access token response.
A refresh token allows an application to obtain a new access token in the background without prompting the user for login credentials and thus not interrupting the user journey.
Typical clients that need a refresh token are mobile and web applications that want to keep the user authenticated for longer than the lifetime of the default access token without having to regularly re-authenticate the user.

::: info Info
A refresh token can only be used once and must be replaced after usage.
:::

In order to refresh an access token, a client needs to extract the `refresh_token` attribute that comes as part of the JSON response when requesting an access token, and store it for later usage.
When the access token is about to expire the client will use the grant type `refresh_token` (instead of `authorization_code` or `client_credentials`) to fetch a new token.

Example:

```http request
POST /oauth2/token HTTP/1.1
Host: api.otto.de

grant_type=refresh_token
&refresh_token=xxxxxxxxxxx
&client_id=xxxxxxxxxx
&client_secret=xxxxxxxxxx
```

The response to the refresh token grant is the same as when issuing an access token. You can optionally issue a new refresh token in the response, or if you don’t include a new refresh token, the client assumes the current refresh token will continue to be valid.
::::
:::::

[<!--RULES-->Rules](./rules/)
