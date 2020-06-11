# JSON Web Key Set

With [JSON Web Key Set (JWKS)](https://tools.ietf.org/html/rfc7517) an API can specify the keys with which it is signing it's JSON Web Tokens.

For all keys in use it specifies, among other things:

- the key type (e.g. RSA, EC)
- the intended use of the key (e.g. encryption or signing)
- the key id
- the specific cryptographic algorithm used
- the key itself

For a full list of parameters see [RFC7517#section-4](https://tools.ietf.org/html/rfc7517#section-4).

An API publishes the keys it is using at `.well-known/jwks.json`. It allows clients as well as endpoints to validate the keys used for signing tokens easily. Also the API provider can use it to easily rotate keys without manual overhead for API clients or endpoint providers.

The key set for this API can be found at [https://api.otto.de/.well-known/jwks.json](https://api.otto.de/.well-known/jwks.json).
