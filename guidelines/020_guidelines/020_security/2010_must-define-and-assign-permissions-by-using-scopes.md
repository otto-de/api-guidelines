---
type: MUST
id: R000047
---

# Define and Assign Permissions by Using Scopes

Endpoints must define permissions to protect access to their resources. Each endpoint must define at least one OAuth 2.0 scope using the defined [naming conventions](guidelines/020_guidelines/020_security/2020_shoud-adhere-to-scope-naming-convention.md).

## Granting Permission to Public Resources

A resource owner can classify its resources as _public_, the responsibility for that lies by the resource owner itself. The Otto website can serve as a reference for public resources. Data that can be accessed there, without any further login, may be defined as public.

For example:

- Product data
- Deal of the day

However, even endpoints providing public resources must be secured with OAuth 2.0 as defined [here. (Must secure endpoints with OAuth 2.0)](guidelines/020_guidelines/020_security/1010_must-secure-endpoints-with-oauth.md). To harmonize the access to public resources we defined the special scope `otto.read`, which can be used to secure those resources.

::: danger
Every resource that **can't be clearly** clarified as public has to be considered as private and is not allowed to use the `otto.read` scope.
:::
