---
id: R100066
---

# MUST use absolute URIs for profiles

Profiles must be identified by absolute URIs (as defined in [RFC 6906](https://www.rfc-editor.org/rfc/rfc6906#section-3)) and documented in the OpenAPI specification.

The URI that identifies a profile must be treated as an identifier. [The URI should not change](./should-treat-profile-uris-as-immutable.md) over time. While encouraged, it does not need to be resolvable. [If it is resolvable, it should provide human-readable documentation](./should-provide-documentation-for-resolvable-profiles.md) of the profile.

Best practice:

[The URI should be in the same URL namespace as the API endpoints](./should-use-same-namespace-for-profile-uris.md).
For example, if all API endpoints are located at `https://api.otto.de/payment/`, the profile URIs should als be located at the same context path (e.g., `https://api.otto.de/payment/profiles/payment-method+v1`).

The last part of the profile URI path must be in the format "{name}+v{version}".
If the profile describes a collection, the name must be plural or uses _list_ to indicate a collection (e.g., `https://api.otto.de/search/profiles/products+v1`).

Examples:

- Payment method version 1 for the payment API: <https://api.otto.de/payment/profiles/payment-method+v1>
- Variation version 2 for the product API: <https://api.otto.de/product/profiles/variation+v2>

::: references

- [MUST use kebab-case for URIs](../../../resources/naming-conventions/rules/must-use-kebabcase-for-uris.md)
- [SHOULD treat profile URIs as immutable](./should-treat-profile-uris-as-immutable.md)
- [SHOULD provide documentation for resolvable profiles](./should-provide-documentation-for-resolvable-profiles.md)
- [SHOULD use same namespace for profile URIs](./should-use-same-namespace-for-profile-uris.md)
  :::
