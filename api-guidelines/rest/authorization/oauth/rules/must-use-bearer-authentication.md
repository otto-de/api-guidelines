---
id: R000021
---

# MUST use Bearer Authentication

Clients resending HTTP requests to the API must use the `Authorization` header to submit their JWT token to the server using the [Bearer Token](https://tools.ietf.org/html/rfc6750#section-2.1) scheme.
The API provider needs to validate the token respectively.

Example:

```plaintext
GET /api/orders HTTP/1.1

Host: api.otto.de
Authorization: Bearer {JWT Token}
```
