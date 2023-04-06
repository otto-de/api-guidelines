---
type: MUST
id: R000058
---

# validate JWT based on keys in JWKS at all endpoints

Each endpoint must validate the JWT used by clients for their requests based on the keys provided by the API's JWKS mechanism.
This ensures the keys can be rotated easily and minimizes manual efforts for key exchange.

Many libraries already support fetching keys from the API host transparently, if configured to do so.
