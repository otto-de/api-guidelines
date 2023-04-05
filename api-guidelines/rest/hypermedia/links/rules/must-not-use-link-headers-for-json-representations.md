---
id: R100034
---

# MUST NOT use link headers for JSON representations

For flexibility and precision, we prefer links to be directly embedded in the JSON payload instead of being attached using the uncommon link header syntax.
As a result, the use of the `Link` header defined by [RFC 8288](https://tools.ietf.org/html/rfc8288#section-3) in conjunction with JSON media types is not allowed.
