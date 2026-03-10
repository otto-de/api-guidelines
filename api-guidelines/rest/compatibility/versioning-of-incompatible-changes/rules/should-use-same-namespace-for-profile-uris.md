---
id: R100076
---

# SHOULD use same namespace for profile URIs

Profile URIs should be in the same URL namespace as the API endpoints.

For example, if all API endpoints are located at `https://api.otto.de/payment/`, the profile URIs should also be located at the same context path (e.g., `https://api.otto.de/payment/profiles/payment-method+v1`).

This convention helps maintain consistency and makes it easier for API consumers to locate and understand the relationship between APIs and their profiles.

::: references

- [MUST use absolute URIs for profiles](./must-use-absolute-profile-uris.md)
  :::