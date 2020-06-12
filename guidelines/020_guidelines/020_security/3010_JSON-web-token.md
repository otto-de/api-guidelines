# JSON Web Token

As [proposed by the OAuth working group](https://tools.ietf.org/html/draft-ietf-oauth-access-token-jwt-07) the access tokens used for our API are JSON Web Tokens (JWT) as defined in [RFC-7797](https://tools.ietf.org/html/rfc7519).

In short: they are [url safe Base64](https://tools.ietf.org/html/rfc4648#section-5) encoded JSON documents that encode

- a cryptographic algorithm & token type
- a payload (containing, amon other things, the expiration date and scope(s) of the token) and
- a signature to allow decentralized verification of said payload

`Note`{ label } You can find examples, a validator and a collection of libraries for different languages and runtime environments over at [jwt.io](https://jwt.io/).

## example token

The JSON content parts of the decoded token look like this.

Header

```json
{
  "alg": "RS256", // algorithm used for signature
  "kid": "public:0235e46d-c7d0-42a4-8f69-c1cb127608e8", // the signing key id
  "typ": "JWT"
}
```

Payload

```json
{
  "aud": ["https://api.otto.de"],
  "client_id": "f3b9910a-08ea-4b6b-895a-261674e573b9", // OAuth client id that requested the token
  "exp": 1591892081, // epoch time at which the token expires
  "ext": {},
  "iat": 1591888481, // epoch time the token was issued at
  "iss": "https://api.otto.de/", // issuer of the token
  "jti": "6f76d949-fad5-4634-ba4f-b7ebf9d32ade", // (unique) id of the token itself
  "nbf": 1591888481, // epoch time the token must not to be accepted before
  "scp": ["otto.public.read"], // the scope the token is granting access to
  "sub": "8d0c8242d4654d41858e150f5ef5b3deccd749d3" // (if applicable) the subject of the token, in this case a customer
}
```
