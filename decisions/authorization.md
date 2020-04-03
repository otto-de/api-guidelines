# Authorization

The API uses [OAuth 2.0](https://oauth.net/2/) for autorization.

In our implementation we strive to be as standard compatible as possible.

## supported flows

The API supports the [authorization code flow](https://tools.ietf.org/html/rfc6749#section-1.3.1) as well as the [PKCE code flow](https://tools.ietf.org/html/rfc7636). The former is to be used for server to server communication.

The [implicit grant](https://tools.ietf.org/html/rfc6749#section-1.3.2) is deprecated and only in use by legacy clients.

## authorization for user data

Right now our OAuth flow only authorizes access to resources for a logged in users, identified by their unique user id.

There is no notion of a visitor.

## scopes

Access to specific endpoints is managed by scopes. It is the responsibility of the teams to check, wether or not a token grants permission to resources of a given scope.
