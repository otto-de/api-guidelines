---
id: R100078
---

# SHOULD use customerId to identify customers

The `customerId` is the recommended way to identify customers.
It replaces the `ec-uuid`.

In HTTP headers, the `customerId` should be named consistently `Customer-Id`.

::: warning Important
Tokens granted through the [authorization code grant flow](../../../../rest/authorization/oauth/rules/must-use-authorization-grant.md) contain the customerId in the `sub`-claim, thus making the introduction of an additional `Customer-Id` HTTP header obsolete.

An example is provided in the [OAuth2 section](../../../../rest/authorization/README.md#oauth-2-0).
:::
