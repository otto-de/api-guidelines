---
---

## Refresh Tokens

Once an access token expires or is about to expire, clients may still need to access an OAuth2 protected resources. Usually this means
that the user will be forced to grant permission by re-authenticating. Typical use cases for using a refresh token are mobile and web applications that want to keep the user authenticated for a period larger than the default access token age without having to regularly re-authenticate the user.

To solve this problem, OAuth 2.0 introduced [refresh tokens](https://tools.ietf.org/html/rfc6749#section-1.5) as part of the access token response. A refresh token allows an application to obtain a new access token in the background without prompting the user for login credentials and thus not interrupting the user journey.

`Note`{ label } A refresh token can only be used once and must be replaced after usage.

In order to refresh an access token, a client needs to extract the `refresh_token` attribute that comes as part of the JSON response when requesting an access token and store it for later use. When the access token is about to expire the client will use the grant type `refresh_token` (instead of `authorization_code` or `client_credentials`) to fetch a new token. For example

```
POST /oauth2/token HTTP/1.1
Host: api.otto.de

grant_type=refresh_token
&refresh_token=xxxxxxxxxxx
&client_id=xxxxxxxxxx
&client_secret=xxxxxxxxxx
```

The response to the refresh token grant is the same as when issuing an access token. You can optionally issue a new refresh token in the response, or if you don’t include a new refresh token, the client assumes the current refresh token will continue to be valid.
