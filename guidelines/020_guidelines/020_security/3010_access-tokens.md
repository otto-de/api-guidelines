# Access Tokens

## JSON Web Token (JWT)

As [proposed by the OAuth working group](https://tools.ietf.org/html/draft-ietf-oauth-access-token-jwt-07) the access tokens used for our API are JSON Web Tokens (JWT) as defined in [RFC-7797](https://tools.ietf.org/html/rfc7519).

In short: they are Base64 encoded JSON documents that encode

- a cryptographic algorithm & token type
- a payload and
- a signature to allow decentralized verification of said payload

You can find examples, a validator and a collection of libraries for different languages and runtime environments over at [jwt.io](https://jwt.io/).

TODO @Dennis: Haben wir vielleicht spezifische Doku von eurem Api-Endpoint-Produkt wie da der Token aufgebaut ist? Sonst würde ich auf https://tools.ietf.org/html/rfc6749#section-4.1.4 für ein Beispiel verweisen

## JSON Web Key Set (JWKS)

The JSON Web Key Set is a set of keys which contains the public keys used to verify any JWT issued by the authorization server. The OTTO API exposes this keys at [https://api.develop.otto.de/.well-known/jwks.json](https://api.develop.otto.de/.well-known/jwks.json).
