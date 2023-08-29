---
id: R000052
---

<!--
The automatic check only ensures the schema is used in the spec
The implementation can only be checks by CDCs
-->

# MUST use Authorization Grant

Authorization Grant is a credential representing the resource owner's authorization (to access its protected resources) used by the client to obtain an access token.

The OTTO API supports two grant types:

- [Authorization Code](https://oauth.net/2/grant-types/authorization-code/)
- [Client Credentials](https://oauth.net/2/grant-types/client-credentials/)


::: info Info
The [Resource Owner Password Credentials](https://oauth.net/2/grant-types/password/) grant type is not supported.
:::

The grant type to be used depends on the use cases outlined in the following rules:

- [Use Authorization Code Grant for confidential clients](should-use-authorization-code-grant-for-confidential-clients.md)
- [Use Client Credentials Grant for machine to machine authorization](should-use-client-credentials-grant-for-machine-to-machine-authorization.md)
