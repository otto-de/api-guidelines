---
type: MUST
id: R000052
---

# use Authorization Grant

Authorization Grant is a credential representing the resource owner's authorization (to access its protected resources) used by the client to obtain an access token.

The OTTO API supports three grant types:

- Authorization Code
- Client Credentials
- Implicit Grant (only for legacy reasons, [must not be used](guidelines/020_guidelines/020_security/1060_must-not-use-implicit-grant-flow.md) for new clients)

`Note`{ label } The password credentials grant type is not supported.

The grant type to be used depends on the use cases outlined in the following rules.
