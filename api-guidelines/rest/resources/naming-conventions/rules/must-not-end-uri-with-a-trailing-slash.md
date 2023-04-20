---
id: R000020
---

# MUST NOT end URIs with a trailing slash (/)

As the last character in a URI's path does not add semantic value and may cause confusion, a URI must not end with a trailing slash (/).

DO

`/customers/{userId}/addresses/{addressId}`

DON'T

`/customers/{userId}/addresses/{addressId}/`
