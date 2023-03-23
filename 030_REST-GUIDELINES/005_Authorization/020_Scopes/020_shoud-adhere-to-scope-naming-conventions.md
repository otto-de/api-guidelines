---
type: SHOULD
id: R000048
reviewType: automatic
---

# adhere to scope naming conventions

OAuth 2.0 scopes represent permissions for different resources.
Scopes might consist of two parts:

- **Required**: `resource`. The resource for the permission, for example `brands`.
- **Optional**: `permission`. The action that can be performed on those resources, for example `read` or `write`.

To keep a consistent naming pattern, scopes should be constructed according to the following scheme.

```text
{resource}.{permission}
```

::: info Info
A scope without explicit permissions grants access to the whole resource.
:::

:::: accordions
::: accordion Rules

The following additional rules apply for scope names:

- Must only include alphanumeric characters, lowercase letters or the special characters `_` or `-`.
- Must be delimited with dots.
- Must be attributable to a resource. <!-- not automatic -->
- Must not include internal product team names as `resource`. <!-- not automatic -->
- `resource` should be pluralized when referring to collections and singular for singleton resources. <!-- not automatic -->

:::

::: accordion Examples

DO

```plaintext
products
products.read
products.write
orders
orders.read
orders.cancel
```

DON'T

```text
Products
opal.products
opal.products.read
product.availability
```

:::
::::
