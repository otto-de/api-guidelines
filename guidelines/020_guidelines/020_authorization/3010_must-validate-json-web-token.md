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
- (if requesting a user-specific resource and working with user-based scopes) that the ec-user-id in the subject-claim matches the user the resource belongs to

If either of these are not valid the request is to be denied with an appropriate [status code](./guidelines/020_guidelines/030_http/3000_http-status.codes.md) and [error message](./guidelines/020_guidelines/070_error-handling/0000_index.md).
