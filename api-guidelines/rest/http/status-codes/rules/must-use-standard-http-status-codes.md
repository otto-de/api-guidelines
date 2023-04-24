---
id: R000012
---

# MUST use standard HTTP status codes

You must only use standardized HTTP status codes consistently with their intended semantics.
You must not invent new HTTP status codes.

RFC standards define ~60 different HTTP status codes with specific semantics (mainly [RFC7231](https://tools.ietf.org/html/rfc7231#section-6) and [RFC 6585](https://tools.ietf.org/html/rfc6585)) — and there are upcoming new ones, for example, [draft legally-restricted-status](https://tools.ietf.org/html/draft-tbray-http-legally-restricted-status-05).
Refer to the overview of all error codes at [Wikipedia](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) or via <https://httpstatuses.com/)> also including 'unofficial codes', for example, used by popular web servers like Nginx.

Below we list the most commonly used and best understood HTTP status codes, consistent with their semantic in the RFCs.
APIs should only use these to prevent misconceptions that arise from less commonly used HTTP status codes.

::: warning Important
As long as your HTTP status code usage is well covered by the semantic defined here, you should not describe it to avoid an overload with common sense information and the risk of inconsistent definitions. Only if the HTTP status code is not in the list below or its usage requires additional information aside the well defined semantic, the API specification must provide a clear description of the HTTP status code in the response.
:::

:::: accordions
::: accordion Success codes

| Status Code      | Meaning                                                                                                                                                                                                                                                                                                             | Methods                          |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------- |
| `200 OK`         | This is the standard success response.                                                                                                                                                                                                                                                                              |                                  |
| `201 Created`    | Returned on successful entity creation. You are free to return either an empty response or the created resource in conjunction with the `Location` header (readers can find more details in Common headers. _Always_ set the `Location` header when the client needs to know the URI of the newly created resource. | `POST`, `PUT`                    |
| `202 Accepted`   | The request was successful and will be processed asynchronously.                                                                                                                                                                                                                                                    | `POST`, `PUT`, `PATCH`, `DELETE` |
| `204 No Content` | No response body.                                                                                                                                                                                                                                                                                                   | `PUT`, `PATCH`, `DELETE`         |

:::

::: accordion Redirection codes

| Code                     | Meaning                                                                                                                                                                                                                                                                                                                                                                                              | Methods                          |
| :----------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------- |
| `301 Moved Permanently`  | This request and all future requests should be directed to the given URI.                                                                                                                                                                                                                                                                                                                            | `<all>`                          |
| `303 See Other`          | The response to the request can be found under another URI using a `GET` method.                                                                                                                                                                                                                                                                                                                     | `POST`, `PUT`, `PATCH`, `DELETE` |
| `304 Not Modified`       | Indicates that a conditional `GET` or `HEAD` request would have resulted in `200` response if it were not for the fact that the condition evaluated to false, i.e. resource has not been modified since the date or version passed via request headers [`If-Modified-Since`](https://tools.ietf.org/html/rfc7232#section-3.3) or [`If-None-Match`](https://tools.ietf.org/html/rfc7232#section-3.2). | `GET`, `HEAD`                    |
| `307 Temporary Redirect` | The response to the request can be temporarily found under another URI using the same method of the initial request.                                                                                                                                                                                                                                                                                 | `<all>`                          |
| `308 Permanent Redirect` | The response to the request can be permanently found under another URI using the same method of the initial request.                                                                                                                                                                                                                                                                                 | `<all>`                          |

:::

::: accordion Client side error codes

| Code                         | Meaning                                                                                                                                                                                                                                                       | Methods                       |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------- |
| `400 Bad Request`            | Indicates a syntactically malformed request.                                                                                                                                                                                                                  | `<all>`                       |
| `401 Unauthorized`           | The users must log in (this often means "Unauthenticated").                                                                                                                                                                                                   | `<all>`                       |
| `403 Forbidden`              | The user is not authorized to use this resource.                                                                                                                                                                                                              | `<all>`                       |
| `404 Not Found`              | The requested resource could not be found.                                                                                                                                                                                                                    | `<all>`                       |
| `405 Method Not Allowed`     | The method is not supported, refer to [OPTIONS](../../methods/rules/must-use-http-methods-correctly.md).                                                                                                                                                                                         | `<all>`                       |
| `406 Not Acceptable`         | Resource can only generate content not acceptable according to the Accept headers sent in the request.                                                                                                                                                        | `<all>`                       |
| `409 Conflict`               | Request cannot be completed due to conflict, e.g. when two clients try to create the same resource or if there are concurrent, conflicting updates.                                                                                                           | `POST`,`PUT`,`PATCH`,`DELETE` |
| `410 Gone`                   | Resource does not exist any longer, e.g. when accessing a resource that has intentionally been deleted.                                                                                                                                                       | ``                            |
| `412 Precondition Failed`    | Returned for conditional requests, e.g. [`If-Match`](https://tools.ietf.org/html/rfc7232#section-3.1) if the condition failed. Used for optimistic locking.                                                                                                   | `PUT`,`PATCH`,`DELETE`        |
| `413 Payload Too Large`      | Request headers or body exceed a defined limit. This might happen for large JWT containing many scopes or large HTTP bodies.                                                                                                                                  | `<all>`                       |
| `415 Unsupported Media Type` | E.g. client sends request body without content type.                                                                                                                                                                                                          | `POST`,`PUT`,`PATCH`,`DELETE` |
| `422 Unprocessable Entity`   | Indicates a logically invalid request body. The server understands the content type of the request entity and the syntax is correct. However, the server was unable to process the contained instructions, for example, due to an inappropriate server state. | `POST`,`PUT`,`PATCH`,`DELETE` |
| `428 Precondition Required`  | Server requires the request to be conditional, e.g. to make sure that the "lost update problem" is avoided (refer to [SHOULD consider to support `ETAG` together with If-Match/If-None-Match header](../../headers/rules/should-use-etag-together-with-if-match-if-none-match-header-for-concurrrency-control.md)).                                   | `<all>`                       |
| `429 Too Many Requests`      | The client does not consider rate limiting and sent too many requests (refer to [MUST use code 429 with headers for rate limits](./must-use-code-429-with-headers-for-rate-limits.md)).                                                                                                       | `<all>`                       |

:::

::: accordion Server side error codes

| Code                        | Meaning                                                                                                                                                                                                                                                                                                         | Methods |
| :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| `500 Internal Server Error` | A generic error indication for an unexpected server execution problem (here, client retry may be sensible)                                                                                                                                                                                                      | `<all>` |
| `501 Not Implemented`       | Server cannot fulfill the request (usually implies future availability, e.g. new feature).                                                                                                                                                                                                                      | `<all>` |
| `503 Service Unavailable`   | Service is (temporarily) not available (e.g. if a required component or downstream service is not available) — client retry may be sensible. If possible, the service should indicate how long the client should wait by setting the [`Retry-After`](https://tools.ietf.org/html/rfc7231#section-7.1.3) header. | `<all>` |
|                             |                                                                                                                                                                                                                                                                                                                 |

:::
::::
