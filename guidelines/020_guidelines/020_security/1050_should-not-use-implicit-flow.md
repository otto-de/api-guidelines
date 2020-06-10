---
type: SHOULD NOT
id: R000055
---

# use Implicit Grant Flow

The Implicit flow was a simplified OAuth flow previously recommended for native apps and JavaScript apps where the access token was returned immediately without an extra authorization code exchange step.

It is not recommended to use the implicit flow (and some servers prohibit this flow entirely) due to the inherent risks of returning access tokens in an HTTP redirect without any confirmation that it has been received by the client.

[https://oauth.net/2/grant-types/implicit/](https://oauth.net/2/grant-types/implicit/)
