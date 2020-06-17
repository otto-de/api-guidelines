---
type: SHOULD
id: R000064
---

SHOULD accept X-visitorId and X-BrowserId as HTTP headers

Many endpoints use the BrowserId or the visitorId to grant access to user specific information.

Historically some have required the client to provide these identifiers by query parameter, HTTP header or in the form of a HTTP cookie.

In the scope of this API an endpoint should accept X-visitorId and X-BrowserId as HTTP headers in lieu of forcing the client to pass them as Cookies or query parameters.

Do:

```http
GET /special-offers HTTP/1.1
X-visitorId: 43891052-0dfc-4195-8fed-b69ef3d7b732.v1
```

Don't:

```http
GET /special-offers?visitorId=43891052-0dfc-4195-8fed-b69ef3d7b732.v1 HTTP/1.1
```

```http
GET /special-offers HTTP/1.1
Cookie: visitorId: 43891052-0dfc-4195-8fed-b69ef3d7b732.v1
```
