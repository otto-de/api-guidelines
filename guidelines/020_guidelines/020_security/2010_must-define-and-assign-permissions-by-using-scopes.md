---
type: MUST
id: R000047
---

# Define and Assign Permissions by Using Scopes

Endpoints must define permissions to protect access to their resources. Each endpoint must define at least one OAuth2 scope using the defined [naming conventions](guidelines/020_guidelines/020_security/2020_shoud-adhere-to-scope-naming-convention.md)

## Granting Permission to Public Resources

Some resources are classified as _public_, i.e. they can be accessed from clients without any authentication because they represent data that is available through the OTTO website for unauthenticated users and do not have any relation to a user.

Some examples include:

- Product data
- Deal of the day

However, access to endpoints owning those resources must be secured with OAuth 2.0 as defined in [secure endpoints with OAuth 2.0](guidelines/020_guidelines/020_security/1010_must-secure-endpoints-with-oauth.md). To solve this problem, we define a special scope `otto.public.read` which grants access to public resources.

Endpoints providing public resources **must** authorize access to resources by validating presence of the special scope.
