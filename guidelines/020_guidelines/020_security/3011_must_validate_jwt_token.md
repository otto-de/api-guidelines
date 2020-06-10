---
type: MUST
id: R000050
---

# validate JSON web token

It is the responsibility of each endpoint to validate the JWT the API client has passed along as the access token for its request.

This includes:

- the cryptographic signature of the token
- the expiration date of the token
- the scopes encoded in the token (and if they match the endpoint)