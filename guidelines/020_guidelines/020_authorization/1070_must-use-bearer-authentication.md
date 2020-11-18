---
type: MUST
id: R000021
appliesTo: client
---

# use Bearer Authentication

Clients resending HTTP requests to the OTTO API must use the `Authorization` header to submit their JWT token to the server using the [Bearer Token](https://tools.ietf.org/html/rfc6750#section-2.1) scheme.

Example:

```plaintext
GET /api/orders HTTP/1.1

Host: api.otto.de
Authorization: Bearer {JWT Token}
```
