---
type: MUST
id: R000058
---

# validate JWT based on keys in JWKS at all endpoints

It is the responsibility of any endpoint to validate the JSON web tokens used by clients for their requests based on the keys provided by the APIs JWKS mechanism.

This ensures the keys can be rotated easily and minimizes manual efforts for key exchange.

`Note`{ label } Many libraries already support fetching keys from the API host transparently, if configured to do so.
