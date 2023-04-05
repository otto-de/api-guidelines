---
id: R100078
---

# SHOULD use customerId to identify customers

The `customerId` is the recommended way to identify logged in customers. It replaces the `ec-uuid`.

In HTTP headers, the `customerId` should be named consistently `X-Customer-Id`.

::: warning Important
For the time being, the `sub`-claim of the JWT still contains the `ec-uuid` for tokens granted through the [authorization code grant flow](R000052).

An example is provided in the [OAuth2 section](../../../030_REST-GUIDELINES/005_Authorization/010_OAuth-2.0/index.md).
:::
