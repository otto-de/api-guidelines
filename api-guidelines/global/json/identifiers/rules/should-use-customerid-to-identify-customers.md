---
id: R100078
---

# SHOULD use customerId to identify customers

The `customerId` is the recommended way to identify logged in customers. It replaces the `ec-uuid`.

In HTTP headers, the `customerId` should be named consistently `X-Customer-Id`.

::: warning Important
Tokens granted through the [authorization code grant flow](../../../../rest/authorization/oauth/rules/must-use-authorization-grant.md) contain the customerId in the `sub`-claim.

An example is provided in the [OAuth2 section](../../../../rest/authorization/README.md#oauth-2-0).
:::
