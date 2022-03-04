---
type: SHOULD
id: R100078
---

# use ec-uuid (or uuid) to identify customers

The ec-uuid (sometimes just called UUID) is the recommended way to identify logged in customers.
It is not easily enumerated (as the account number) and is stable between sessions and devices.

Also, for endpoints that work with user-based scopes (i.e. retrieving a customers shipment overview) it is included in the JWTs sub (or subject) claim and thus signed by the authentication server.

An example can be found in the [OAuth2 section](../../020_Authorization/010_OAuth-2.0/index.md).
For the subject claim to be filled the client needs to implement the [authorization code grant flow](R000052) (in which the user gives their permission).
