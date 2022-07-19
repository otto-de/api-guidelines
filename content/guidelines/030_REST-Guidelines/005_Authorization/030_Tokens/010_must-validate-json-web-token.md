---
type: MUST
id: R000050
---

# validate JSON Web Token

Each endpoint must validate the JWT that the API client has passed along as the access token for its request.

This includes:

- the cryptographic signature of the token
- the expiration date of the token
- the scopes encoded in the token (if they match the endpoint)
- (when requesting a user-specific resource and working with user-based scopes) that the EC user ID (ec-uuid) in the subject claim matches the user who owns the resource

If either of these are not valid the request is to be denied with an appropriate [status code](../../../030_REST-Guidelines/010_HTTP/030_Status-codes/index.md) and [error message](../../../030_REST-Guidelines/040_Errors/010_Error-handling/index.md).
