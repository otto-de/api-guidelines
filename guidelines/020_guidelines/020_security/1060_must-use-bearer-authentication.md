---
type: MUST
id: R000021
---

# use Bearer Authentication

Clients submitting HTTP requests again the OTTO API must use the `Authorization` header to submit their JWT token to the server using the [Bearer Token](https://tools.ietf.org/html/rfc6750#section-2.1) scheme. For example:

```plaintext
GET /api/orders HTTP/1.1

Host: api.otto.de
Authorization: Bearer {JWT Token}
```
