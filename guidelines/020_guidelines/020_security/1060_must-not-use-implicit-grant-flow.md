---
type: MUST NOT
id: R000055
---

# use Implicit Grant Flow

The [Implicit Grant](https://oauth.net/2/grant-types/implicit) flow was a simplified OAuth flow previously recommended for native apps and JavaScript apps where the access token was returned immediately without an extra authorization code exchange step.

It is not recommended to use the implicit flow (and some servers prohibit this flow entirely) due to the inherent risks of access tokens being returned in an HTTP redirect without confirmation that they were received by the client.