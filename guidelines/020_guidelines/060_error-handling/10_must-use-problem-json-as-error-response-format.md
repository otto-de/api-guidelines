---
type: MUST
id: R000034
---

# use `problem+json` as error response format

```http
HTTP/1.1 401 Unauthorized
Content-Type: application/problem+json

{
  "type": "https://example.com/errors/ERR-42",
  "title": "Not authorized to view account details.",
  "status": 401,
  "detail": "Due to privacy concerns you are not allowed to view account details of others.",
  "instance": "https://example.com/account/12345/",
  "code": "ERR-42"
}
```
