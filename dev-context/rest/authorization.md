# Authorization

The API uses [OAuth 2.0](https://oauth.net/2/) for authorization.

In our implementation we strive to be as standard compatible as possible.

## supported flows

- client credentials flow ([RFC-6749#4.4](https://tools.ietf.org/html/rfc6749#section-4.4))
  - example at <https://auth0.com/docs/flows/concepts/client-credentials>
  - use for server-to-server communication
- authorization code flow ([RFC-6749#4.1](https://tools.ietf.org/html/rfc6749#section-4.1))
  - example at <https://auth0.com/docs/flows/concepts/auth-code>
  - use for server-on-behalf-of-user-to-server communication
- for the authorization code flow, the PKCE extension ([RFC-7636](https://tools.ietf.org/html/rfc7636))
  - example at <https://auth0.com/docs/api-auth/tutorials/authorization-code-grant-pkce>
  - use for single page web-apps or mobile apps

The [implicit grant](https://tools.ietf.org/html/rfc6749#section-1.3.2) is not supported for [security reasons](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics#name-implicit-grant).

## authorization for user data

Right now our OAuth flow only authorizes access to resources for logged-in users.

There is no notion of a visitor.

## scopes

Access to specific endpoints is managed by scopes. It is the responsibility of the teams to check, weather or not a token grants permission to resources of a given scope.

## responsibilities of the endpoints

The resource server (aka API endpoint provider) is responsible for verifying the validity of the token.

This includes

- validity of the signature
- expiration date of the token
- that the scopes in the token are sufficient to access the resources / perform the actions in question
