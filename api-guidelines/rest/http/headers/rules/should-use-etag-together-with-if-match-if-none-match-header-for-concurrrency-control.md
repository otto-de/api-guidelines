---
id: R000060
---

# SHOULD use `ETag` together with `If-Match`/`If-None-Match` header for concurrency control

When creating or updating resources it may be necessary to expose conflicts and to prevent the 'lost update' or 'initially created' problem.
Following [RFC 7232 "HTTP: Conditional Requests"](https://tools.ietf.org/html/rfc7232), this can be best accomplished by supporting the [`ETag`](https://tools.ietf.org/html/rfc7232#section-2.3) header together with the [`If-Match`](https://tools.ietf.org/html/rfc7232#section-3.1) or [`If-None-Match`](https://tools.ietf.org/html/rfc7232#section-3.2) conditional header.

:::: accordions
::: accordion Updating resources without 'lost update' problem
To expose conflicts between concurrent update operations via `PUT`, `POST`, or `PATCH`, the `If-Match: <entity tag>` header can be used to enable the server to check whether the version of the updated entity is conforming to the requested [`<entity tag>`](https://tools.ietf.org/html/rfc7232#section-2.3).
If no matching entity is found, the operation is supposed to respond with status code `412 - Precondition Failed`.

Example:

```http
GET /orders HTTP/1.1

HTTP/1.1 200 OK
{
  "items": [
    { "id": "O0000042" },
    { "id": "O0000043" }
  ]
}
```

```http
GET /orders/O0000042 HTTP/1.1

HTTP/1.1 200 OK
ETag: "osjnfkjbnkq3jlnksjnvkjlsbf"
{ "id": "BO0000042", ... }
```

```http
PUT /orders/O0000042 HTTP/1.1
If-Match: "osjnfkjbnkq3jlnksjnvkjlsbf"
{ "id": "O0000042", ... }

HTTP/1.1 204 No Content
```

Or, if there was an update since the `GET` and the entity’s `ETag` has changed:

```http
PUT /orders/O0000042 HTTP/1.1
If-Match: "osjnfkjbnkq3jlnksjnvkjlsbf"
{ "id": "O0000042", ... }

HTTP/1.1 412 Precondition failed
```

:::

::: accordion Creating resources without 'initially created' problem
Besides other use cases, `If-None-Match: *` can be used in a similar way to expose conflicts in resource creation.
If any matching entity is found, the operation is supposed to respond with status code `412 Precondition Failed`.

Example:

```http
GET /orders HTTP/1.1

HTTP/1.1 200 OK
{
  "items": [
    { "id": "O0000042" }
  ]
}
```

```http
PUT /orders/O0000042 HTTP/1.1
If-None-Match: *
{ "id": "O0000042", ... }

HTTP/1.1 412 Precondition Failed
```

:::

::: accordion Enforce conditional requests
In order to enforce the usage of conditional requests, the server is supposed to answer with status code `428 Precondition Required` in case of clients omitting the `If-Match`/`If-None-Match` request header.

Example:

```http
PUT /orders/O0000042 HTTP/1.1
{ "id": "O0000042", ... }

HTTP/1.1 428 Precondition Required
```

:::
::::

::: info Info
Using `HEAD` instead of `GET` in order to just fetch the most current `ETag` value is always an option to save bandwidth!
:::

::: references

- [MAY use `ETag` header for caching resources](./may-use-etag-header-for-caching-resources.md)
  :::
