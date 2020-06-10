---
---

# Access Tokens

## JSON Web Token (JWT)

As per OAuth Spec Version 2 the access tokens used for our API are JSON Web Tokens (JWT) as defined in [RFC-7797](https://tools.ietf.org/html/rfc7519).

In short they are encoded JSON documents that encode a cryptographic algorithm & token type, a payload and a signature to allow decentralized verification of said payload.

You can find examples, a validator and a collection of libraries for different languages and runtime environments over at [jwt.io](https://jwt.io/).

## JSON Web Key Set (JWKS)

The JSON Web Key Set is a set of keys which contains the public keys used to verify any JWT issued by the authorization server. The OTTO API exposes this keys at [https://api.develop.otto.de/.well-known/jwks.json](https://api.develop.otto.de/.well-known/jwks.json).
