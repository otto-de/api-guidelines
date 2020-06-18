---
type: SHOULD
id: R000048
---

# Scope Naming

OAuth 2.0 scopes represent permissions for different resources. Scopes are up to two parts:

- **REQUIRED** `resource` is the resource for the permission, for example `brands`
- **OPTIONAL** `permission` is the action that can be performed on those resources, for example `read` or `write`

To keep a consistent naming pattern, scopes should be constructed according to the following scheme.

```text
({resource}).{permission}
```

::: info
A scope without explicit permissions grants access to the whole resource.
:::

## Rules

The following additional rules apply for scope names:

- Must only include alphanumeric characters, lowercase letters or the following special characters `_-`
- Must be delimited with dots
- Must be attributable to a resource
- Must not include internal product team names as `resource`
- `resource` should be pluralized when referring to collections and singular for singleton resources

## Examples

Do:

```plaintext
products
products.read
products.write
orders
orders.read
orders.cancel
```

Don't

```text
Products
opal.products
opal.products.read
product.availability
```
