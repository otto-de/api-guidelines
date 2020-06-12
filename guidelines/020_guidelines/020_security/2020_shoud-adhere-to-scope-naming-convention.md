---
type: SHOULD
id: R000048
---

# Scope Naming

OAuth 2.0 scopes represent permissions for different endpoints. We use namespaced scopes to keep consistency and clear separation of ownership. Scopes are made up three parts:

- **REQUIRED** `endpoint` is the name of the owning service
- **OPTIONAL** `resource` is the resource for the permission, for example `brands`
- **REQUIRED** `permission` is the action that can be performed on those resources, for example `read` or `write`

To keep a consistent naming pattern, scopes should be constructed according to the following scheme

```text
{endpoint}.({resource}).{permission}
```

## Rules

The following additional rules apply for scope names:

- Must only include alphanumeric characters, lowercase letters or the following special characters `_-`
- Must be delimited with dots
- Must be attributable to an endpoint
- Must not include internal product team names as `endpoint`
- `resource` should be pluralized when referring to collections and singular for singleton resources

## Examples

Do:

```plaintext
opal.products.write
opal.brands.read
reco.recos
order.orders.cancel
```

Don't

```text
reco
Reco
product.availability
```
